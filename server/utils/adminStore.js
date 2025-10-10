import { promises as fs } from 'fs';
import path from 'path';

const adminDataPath = path.resolve(process.cwd(), 'server/data/adminData.json');

const defaultData = {
  announcements: [],
  contests: [],
  practiceSets: []
};

async function ensureAdminFile() {
  try {
    await fs.access(adminDataPath);
  } catch (error) {
    await fs.mkdir(path.dirname(adminDataPath), { recursive: true });
    await fs.writeFile(adminDataPath, JSON.stringify(defaultData, null, 2), 'utf8');
  }
}

export async function readAdminData() {
  await ensureAdminFile();
  const content = await fs.readFile(adminDataPath, 'utf8');
  try {
    const parsed = JSON.parse(content);
    return {
      announcements: Array.isArray(parsed.announcements) ? parsed.announcements : [],
      contests: Array.isArray(parsed.contests) ? parsed.contests : [],
      practiceSets: Array.isArray(parsed.practiceSets) ? parsed.practiceSets : []
    };
  } catch (error) {
    return { ...defaultData };
  }
}

export async function writeAdminData(data) {
  await ensureAdminFile();
  const merged = {
    announcements: Array.isArray(data.announcements) ? data.announcements : [],
    contests: Array.isArray(data.contests) ? data.contests : [],
    practiceSets: Array.isArray(data.practiceSets) ? data.practiceSets : []
  };
  await fs.writeFile(adminDataPath, JSON.stringify(merged, null, 2), 'utf8');
}

