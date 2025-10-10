import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { readUsers, writeUsers } from './utils/userStore.js';
import { readAdminData, writeAdminData } from './utils/adminStore.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) ?? ['http://localhost:5173'];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const emailConfigured =
  Boolean(process.env.SMTP_HOST) &&
  Boolean(process.env.SMTP_PORT) &&
  Boolean(process.env.SMTP_USER) &&
  Boolean(process.env.SMTP_PASSWORD);

const transporter = emailConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  : nodemailer.createTransport({ jsonTransport: true });

function ensureUserDefaults(user) {
  if (!user.role) {
    user.role = 'student';
  }
  if (!user.status) {
    user.status = 'active';
  }
  if (!Object.prototype.hasOwnProperty.call(user, 'organization')) {
    user.organization = null;
  }
}

function sanitizeUser(user) {
  ensureUserDefaults(user);
  const { passwordHash, verificationCode, ...safe } = user;
  return safe;
}

function sanitizeCreator(user) {
  const { id, name, email, role, organization } = sanitizeUser(user);
  return { id, name, email, role, organization };
}

async function authenticateRequest(req, res, next) {
  const requesterEmail = req.header('x-user-email');

  if (!requesterEmail) {
    return res.status(401).json({ message: 'Missing user email header.' });
  }

  const users = await readUsers();
  const user = users.find((entry) => entry.email === requesterEmail.toLowerCase());

  if (!user) {
    return res.status(401).json({ message: 'Account not found.' });
  }

  ensureUserDefaults(user);

  if (!user.verified) {
    return res.status(403).json({ message: 'Email address must be verified.' });
  }

  if (user.status === 'banned') {
    return res.status(403).json({ message: 'Account has been banned.' });
  }

  req.requestUser = user;
  req.allUsers = users;
  req.persistUsers = async () => writeUsers(users);
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    const { requestUser } = req;
    if (!requestUser || !roles.includes(requestUser.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();
  };
}

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const normalizedEmail = email.toLowerCase();
  const users = await readUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const verificationCode = uuidv4().replace(/-/g, '').slice(0, 6).toUpperCase();
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    verified: false,
    verificationCode,
    createdAt: new Date().toISOString(),
    verifiedAt: null,
    role: 'student',
    status: 'active',
    organization: null
  };

  users.push(newUser);
  await writeUsers(users);

  const messageBody = `Hello ${newUser.name},\n\nWelcome to SciBridge Forum! Your verification code is ${verificationCode}.\n\nEnter this code in the "Verify email" form to activate your account.\n\nIf you did not create an account, please ignore this email.`;

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@scibridge.local',
      to: normalizedEmail,
      subject: 'Verify your SciBridge Forum account',
      text: messageBody
    });

    if (!emailConfigured) {
      console.info('Email transport not configured. Verification email logged instead:', info.message);
    }

    res.status(201).json({ message: 'Account created. Please check your email for the verification code.' });
  } catch (error) {
    console.error('Error sending verification email', error);
    res.status(500).json({ message: 'Could not send verification email. Try again later.' });
  }
});

app.post('/api/auth/verify', async (req, res) => {
  const { email, code } = req.body ?? {};

  if (!email?.trim() || !code?.trim()) {
    return res.status(400).json({ message: 'Email and verification code are required.' });
  }

  const normalizedEmail = email.toLowerCase();
  const users = await readUsers();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    return res.status(404).json({ message: 'Account not found.' });
  }

  if (user.verified) {
    return res.status(200).json({ message: 'Account already verified. You can sign in.' });
  }

  if (user.verificationCode !== code.trim().toUpperCase()) {
    return res.status(400).json({ message: 'Invalid verification code. Try again.' });
  }

  user.verified = true;
  user.verificationCode = null;
  user.verifiedAt = new Date().toISOString();
  await writeUsers(users);

  res.json({ message: 'Email verified. You can now sign in.' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email?.trim() || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = email.toLowerCase();
  const users = await readUsers();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    return res.status(404).json({ message: 'Account not found. Please register first.' });
  }

  if (!user.verified) {
    return res.status(403).json({ message: 'Please verify your email before signing in.' });
  }

  if (user.status === 'banned') {
    return res.status(403).json({ message: 'This account has been banned by an administrator.' });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Incorrect email or password.' });
  }

  res.json({
    message: 'Signed in successfully.',
    user: sanitizeUser(user)
  });
});

function filterContentForUser(user, data) {
  if (user.role === 'admin') {
    return data;
  }

  const organization = user.organization;
  if (!organization) {
    return data.filter((entry) => entry.audience === 'global');
  }

  return data.filter((entry) => entry.audience === 'global' || entry.audience === organization);
}

app.get(
  '/api/admin/dashboard',
  authenticateRequest,
  requireRole('admin', 'teacher'),
  async (req, res) => {
    const { requestUser, allUsers } = req;
    const adminData = await readAdminData();

    const sanitizedCurrentUser = sanitizeUser(requestUser);
    const userList =
      requestUser.role === 'admin'
        ? allUsers.map(sanitizeUser)
        : allUsers
            .filter((user) => {
              ensureUserDefaults(user);
              if (user.role === 'admin') {
                return false;
              }
              if (!requestUser.organization) {
                return user.organization === null && user.role === 'student';
              }
              return user.organization === requestUser.organization;
            })
            .map(sanitizeUser);

    res.json({
      viewer: sanitizedCurrentUser,
      users: userList,
      announcements: filterContentForUser(requestUser, adminData.announcements),
      contests: filterContentForUser(requestUser, adminData.contests),
      practiceSets: filterContentForUser(requestUser, adminData.practiceSets)
    });
  }
);

app.post(
  '/api/admin/announcements',
  authenticateRequest,
  requireRole('admin', 'teacher'),
  async (req, res) => {
    const { title, message, audience } = req.body ?? {};

    if (!title?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Title and message are required.' });
    }

    const adminData = await readAdminData();
    const creator = req.requestUser;
    const normalizedAudience =
      creator.role === 'admin' ? (audience?.trim() || 'global') : creator.organization || 'global';

    const announcement = {
      id: uuidv4(),
      title: title.trim(),
      message: message.trim(),
      audience: normalizedAudience,
      createdAt: new Date().toISOString(),
      createdBy: sanitizeCreator(creator)
    };

    adminData.announcements.unshift(announcement);
    await writeAdminData(adminData);

    res.status(201).json({ message: 'Announcement posted.', announcement });
  }
);

app.post(
  '/api/admin/contests',
  authenticateRequest,
  requireRole('admin', 'teacher'),
  async (req, res) => {
    const { name, description, deadline, audience } = req.body ?? {};

    if (!name?.trim() || !description?.trim()) {
      return res.status(400).json({ message: 'Contest name and description are required.' });
    }

    const adminData = await readAdminData();
    const creator = req.requestUser;
    const normalizedAudience =
      creator.role === 'admin' ? (audience?.trim() || 'global') : creator.organization || 'global';

    const contest = {
      id: uuidv4(),
      name: name.trim(),
      description: description.trim(),
      deadline: deadline?.trim() || null,
      audience: normalizedAudience,
      createdAt: new Date().toISOString(),
      createdBy: sanitizeCreator(creator)
    };

    adminData.contests.unshift(contest);
    await writeAdminData(adminData);

    res.status(201).json({ message: 'Contest created.', contest });
  }
);

app.post(
  '/api/admin/practice-sets',
  authenticateRequest,
  requireRole('admin', 'teacher'),
  async (req, res) => {
    const { title, focusArea, description, audience, resourceUrl } = req.body ?? {};

    if (!title?.trim() || !focusArea?.trim()) {
      return res.status(400).json({ message: 'Title and focus area are required.' });
    }

    const adminData = await readAdminData();
    const creator = req.requestUser;
    const normalizedAudience =
      creator.role === 'admin' ? (audience?.trim() || 'global') : creator.organization || 'global';

    const practiceSet = {
      id: uuidv4(),
      title: title.trim(),
      focusArea: focusArea.trim(),
      description: description?.trim() || '',
      resourceUrl: resourceUrl?.trim() || null,
      audience: normalizedAudience,
      createdAt: new Date().toISOString(),
      createdBy: sanitizeCreator(creator)
    };

    adminData.practiceSets.unshift(practiceSet);
    await writeAdminData(adminData);

    res.status(201).json({ message: 'Practice set saved.', practiceSet });
  }
);

app.patch(
  '/api/admin/users/:id/status',
  authenticateRequest,
  requireRole('admin'),
  async (req, res) => {
    const { status } = req.body ?? {};
    const validStatuses = ['active', 'banned'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const { allUsers, persistUsers } = req;
    const user = allUsers.find((entry) => entry.id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    ensureUserDefaults(user);
    user.status = status;

    await persistUsers();

    res.json({ message: 'User status updated.', user: sanitizeUser(user) });
  }
);

app.patch(
  '/api/admin/users/:id/role',
  authenticateRequest,
  requireRole('admin'),
  async (req, res) => {
    const { role, organization } = req.body ?? {};
    const validRoles = ['student', 'teacher', 'admin'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role value.' });
    }

    const { allUsers, persistUsers } = req;
    const user = allUsers.find((entry) => entry.id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    ensureUserDefaults(user);

    user.role = role;
    user.organization = role === 'teacher' ? organization?.trim() || null : null;

    await persistUsers();

    res.json({ message: 'User role updated.', user: sanitizeUser(user) });
  }
);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', emailConfigured });
});

app.listen(port, () => {
  console.log(`SciBridge API server running on http://localhost:${port}`);
});
