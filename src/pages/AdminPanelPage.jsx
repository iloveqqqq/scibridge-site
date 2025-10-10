import { useEffect, useMemo, useState } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiEdit,
  FiLayers,
  FiShield,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi';
import {
  createAnnouncement,
  createContest,
  createPracticeSet,
  fetchDashboard,
  updateUserRole,
  updateUserStatus
} from '../services/adminService';

const defaultAnnouncement = { title: '', message: '', audience: 'global' };
const defaultContest = { name: '', description: '', deadline: '', audience: 'global' };
const defaultPractice = { title: '', focusArea: '', description: '', resourceUrl: '', audience: 'global' };

const AdminPanelPage = ({ user, onProfileUpdate }) => {
  const [dashboard, setDashboard] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [announcementForm, setAnnouncementForm] = useState(defaultAnnouncement);
  const [contestForm, setContestForm] = useState(defaultContest);
  const [practiceForm, setPracticeForm] = useState(defaultPractice);

  const [roleDrafts, setRoleDrafts] = useState({});
  const [orgDrafts, setOrgDrafts] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const role = user?.role;
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher';

  const canAccessPanel = Boolean(user) && (isAdmin || isTeacher);

  useEffect(() => {
    if (!canAccessPanel) {
      return;
    }

    let isMounted = true;
    setStatus('loading');
    fetchDashboard(user)
      .then((data) => {
        if (!isMounted) return;
        setDashboard(data);
        setStatus('ready');
        setErrorMessage('');
      })
      .catch((error) => {
        if (!isMounted) return;
        setStatus('error');
        setErrorMessage(error.message);
      });

    return () => {
      isMounted = false;
    };
  }, [canAccessPanel, user]);

  useEffect(() => {
    if (!dashboard || !user) {
      return;
    }
    if (dashboard.viewer && dashboard.viewer.email === user.email) {
      onProfileUpdate?.(dashboard.viewer);
    }
  }, [dashboard, onProfileUpdate, user]);

  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage('');
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage('');
  };

  const handleAnnouncementSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const { announcement } = await createAnnouncement(user, announcementForm);
      setDashboard((previous) => {
        if (!previous) {
          return previous;
        }
        return {
          ...previous,
          announcements: [announcement, ...previous.announcements]
        };
      });
      setAnnouncementForm(defaultAnnouncement);
      handleSuccess('Announcement published successfully.');
    } catch (error) {
      handleError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContestSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const { contest } = await createContest(user, contestForm);
      setDashboard((previous) => {
        if (!previous) {
          return previous;
        }
        return {
          ...previous,
          contests: [contest, ...previous.contests]
        };
      });
      setContestForm(defaultContest);
      handleSuccess('Contest created for learners.');
    } catch (error) {
      handleError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePracticeSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const { practiceSet } = await createPracticeSet(user, practiceForm);
      setDashboard((previous) => {
        if (!previous) {
          return previous;
        }
        return {
          ...previous,
          practiceSets: [practiceSet, ...previous.practiceSets]
        };
      });
      setPracticeForm(defaultPractice);
      handleSuccess('Practice set shared with your learners.');
    } catch (error) {
      handleError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setRoleDraft = (userId, value) => {
    setRoleDrafts((previous) => ({ ...previous, [userId]: value }));
  };

  const setOrgDraft = (userId, value) => {
    setOrgDrafts((previous) => ({ ...previous, [userId]: value }));
  };

  const handleRoleUpdate = async (target) => {
    const nextRole = roleDrafts[target.id] ?? target.role;
    const nextOrg = orgDrafts[target.id] ?? target.organization ?? '';

    setIsSubmitting(true);
    try {
      const { user: updatedUser } = await updateUserRole(user, {
        userId: target.id,
        role: nextRole,
        organization: nextOrg
      });

      setDashboard((previous) => {
        if (!previous) {
          return previous;
        }
        return {
          ...previous,
          users: previous.users.map((entry) => (entry.id === updatedUser.id ? updatedUser : entry))
        };
      });

      if (updatedUser.email === user.email) {
        onProfileUpdate?.(updatedUser);
      }

      setRoleDrafts((previous) => ({ ...previous, [target.id]: undefined }));
      setOrgDrafts((previous) => ({ ...previous, [target.id]: undefined }));
      handleSuccess('User role updated successfully.');
    } catch (error) {
      handleError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusToggle = async (target) => {
    const nextStatus = target.status === 'active' ? 'banned' : 'active';
    setIsSubmitting(true);
    try {
      const { user: updatedUser } = await updateUserStatus(user, {
        userId: target.id,
        status: nextStatus
      });

      setDashboard((previous) => {
        if (!previous) {
          return previous;
        }
        return {
          ...previous,
          users: previous.users.map((entry) => (entry.id === updatedUser.id ? updatedUser : entry))
        };
      });
      handleSuccess(`User status changed to ${nextStatus}.`);
    } catch (error) {
      handleError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const headline = useMemo(() => {
    if (isAdmin) {
      return 'Admin control center';
    }
    if (isTeacher) {
      return 'Teacher leadership hub';
    }
    return 'Admin panel';
  }, [isAdmin, isTeacher]);

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <FiShield className="mx-auto h-12 w-12 text-brand" aria-hidden />
        <h1 className="mt-6 text-3xl font-display font-semibold text-slate-900">Sign in to access the admin panel</h1>
        <p className="mt-3 text-sm text-slate-600">
          Please register, verify your email, and log in. Administrator or teacher permissions are required to view this page.
        </p>
      </div>
    );
  }

  if (!canAccessPanel) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <FiAlertTriangle className="mx-auto h-12 w-12 text-amber-500" aria-hidden />
        <h1 className="mt-6 text-3xl font-display font-semibold text-slate-900">Limited access</h1>
        <p className="mt-3 text-sm text-slate-600">
          Your account is currently a student account. Please contact an administrator if you need teacher or admin permissions
          to manage community content.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">Community leadership</p>
        <h1 className="text-3xl font-display font-semibold text-slate-900">{headline}</h1>
        <p className="text-sm text-slate-600">
          Manage English-first science learning spaces. Share announcements in clear academic English, build contests and
          quizzes, and guide your learners across Physics, Chemistry, Biology, and Earth Science extensions.
        </p>
        {status === 'loading' && <p className="text-sm text-slate-500">Loading dashboard data…</p>}
        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            <FiAlertTriangle aria-hidden />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            <FiCheckCircle aria-hidden />
            <span>{successMessage}</span>
          </div>
        )}
      </header>

      {dashboard && (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <FiLayers aria-hidden />
                Publish announcement
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Write a short announcement in English. Admins can choose global or organization audiences. Teachers share with
                their organization automatically.
              </p>
              <form onSubmit={handleAnnouncementSubmit} className="mt-4 space-y-4">
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Title
                  <input
                    type="text"
                    value={announcementForm.title}
                    onChange={(event) =>
                      setAnnouncementForm((previous) => ({ ...previous, title: event.target.value }))
                    }
                    className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Weekly English immersion focus"
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Message
                  <textarea
                    value={announcementForm.message}
                    onChange={(event) =>
                      setAnnouncementForm((previous) => ({ ...previous, message: event.target.value }))
                    }
                    rows={4}
                    className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Use friendly academic language to guide students."
                    required
                  />
                </label>
                {isAdmin && (
                  <label className="flex flex-col text-sm font-semibold text-slate-600">
                    Audience
                    <input
                      type="text"
                      value={announcementForm.audience}
                      onChange={(event) =>
                        setAnnouncementForm((previous) => ({ ...previous, audience: event.target.value }))
                      }
                      className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                      placeholder="global or organization name"
                    />
                    <span className="mt-1 text-xs font-normal text-slate-500">
                      Leave “global” to reach every learner. Use an organization name for specific groups.
                    </span>
                  </label>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  <FiEdit aria-hidden />
                  Share announcement
                </button>
              </form>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <FiUsers aria-hidden />
                Launch contest or challenge
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Encourage students to use English while investigating science problems. Provide a due date to keep everyone on
                track.
              </p>
              <form onSubmit={handleContestSubmit} className="mt-4 space-y-4">
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Contest name
                  <input
                    type="text"
                    value={contestForm.name}
                    onChange={(event) =>
                      setContestForm((previous) => ({ ...previous, name: event.target.value }))
                    }
                    className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="English Lab Journal Showcase"
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Description
                  <textarea
                    value={contestForm.description}
                    onChange={(event) =>
                      setContestForm((previous) => ({ ...previous, description: event.target.value }))
                    }
                    rows={3}
                    className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Students submit a one-page explanation of a recent experiment in English."
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Deadline (optional)
                  <input
                    type="date"
                    value={contestForm.deadline}
                    onChange={(event) =>
                      setContestForm((previous) => ({ ...previous, deadline: event.target.value }))
                    }
                    className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </label>
                {isAdmin && (
                  <label className="flex flex-col text-sm font-semibold text-slate-600">
                    Audience
                    <input
                      type="text"
                      value={contestForm.audience}
                      onChange={(event) =>
                        setContestForm((previous) => ({ ...previous, audience: event.target.value }))
                      }
                      className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                      placeholder="global or organization name"
                    />
                  </label>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  <FiUsers aria-hidden />
                  Create contest
                </button>
              </form>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <FiUserCheck aria-hidden />
                Build English practice sets
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Connect vocabulary, grammar, and science concepts. Link to quizzes or videos that keep English as the main
                subject while extending the natural sciences.
              </p>
              <form onSubmit={handlePracticeSubmit} className="mt-4 space-y-4">
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Title
                  <input
                    type="text"
                    value={practiceForm.title}
                    onChange={(event) =>
                      setPracticeForm((previous) => ({ ...previous, title: event.target.value }))
                    }
                    className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Academic English for Lab Reports"
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Focus area
                  <input
                    type="text"
                    value={practiceForm.focusArea}
                    onChange={(event) =>
                      setPracticeForm((previous) => ({ ...previous, focusArea: event.target.value }))
                    }
                    className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Passive voice in experiment steps"
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Description (optional)
                  <textarea
                    value={practiceForm.description}
                    onChange={(event) =>
                      setPracticeForm((previous) => ({ ...previous, description: event.target.value }))
                    }
                    rows={3}
                    className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Students compare strong and weak sentences from recent science labs."
                  />
                </label>
                <label className="flex flex-col text-sm font-semibold text-slate-600">
                  Resource link (optional)
                  <input
                    type="url"
                    value={practiceForm.resourceUrl}
                    onChange={(event) =>
                      setPracticeForm((previous) => ({ ...previous, resourceUrl: event.target.value }))
                    }
                    className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="https://example.com/english-science-video"
                  />
                </label>
                {isAdmin && (
                  <label className="flex flex-col text-sm font-semibold text-slate-600">
                    Audience
                    <input
                      type="text"
                      value={practiceForm.audience}
                      onChange={(event) =>
                        setPracticeForm((previous) => ({ ...previous, audience: event.target.value }))
                      }
                      className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                      placeholder="global or organization name"
                    />
                  </label>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  <FiUserCheck aria-hidden />
                  Save practice set
                </button>
              </form>
            </section>
          </div>

          <aside className="space-y-6">
            {isAdmin && (
              <section className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <FiShield aria-hidden />
                  Manage community members
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Update roles, assign teacher organizations, or ban accounts that break community guidelines.
                </p>
                <div className="mt-4 space-y-4">
                  {dashboard.users?.map((entry) => (
                    <div key={entry.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                      <p className="text-base font-semibold text-brand-dark">{entry.name}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{entry.email}</p>
                      <div className="mt-3 grid gap-3">
                        <label className="flex flex-col font-semibold">
                          Role
                          <select
                            value={roleDrafts[entry.id] ?? entry.role}
                            onChange={(event) => setRoleDraft(entry.id, event.target.value)}
                            className="mt-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        </label>
                        {(roleDrafts[entry.id] ?? entry.role) === 'teacher' && (
                          <label className="flex flex-col font-semibold">
                            Organization
                            <input
                              type="text"
                              value={orgDrafts[entry.id] ?? entry.organization ?? ''}
                              onChange={(event) => setOrgDraft(entry.id, event.target.value)}
                              className="mt-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                              placeholder="e.g., Green Valley High"
                            />
                          </label>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRoleUpdate(entry)}
                            className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isSubmitting}
                          >
                            <FiCheckCircle aria-hidden />
                            Save role
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(entry)}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition ${
                              entry.status === 'active'
                                ? 'bg-rose-500 text-white hover:bg-rose-600'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            }`}
                            disabled={isSubmitting}
                          >
                            <FiShield aria-hidden />
                            {entry.status === 'active' ? 'Ban user' : 'Reinstate'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Latest announcements</h2>
              <div className="mt-3 space-y-4 text-sm text-slate-600">
                {dashboard.announcements.length === 0 && <p>No announcements yet.</p>}
                {dashboard.announcements.map((announcement) => (
                  <article key={announcement.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-brand-dark">{announcement.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                      {new Date(announcement.createdAt).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                      {' · '}
                      Audience: {announcement.audience}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{announcement.message}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Active contests</h2>
              <div className="mt-3 space-y-4 text-sm text-slate-600">
                {dashboard.contests.length === 0 && <p>No contests created yet.</p>}
                {dashboard.contests.map((contest) => (
                  <article key={contest.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-brand-dark">{contest.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                      Audience: {contest.audience}
                      {contest.deadline && ` · Due ${contest.deadline}`}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{contest.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Practice sets</h2>
              <div className="mt-3 space-y-4 text-sm text-slate-600">
                {dashboard.practiceSets.length === 0 && <p>No practice sets created yet.</p>}
                {dashboard.practiceSets.map((practice) => (
                  <article key={practice.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-brand-dark">{practice.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                      Focus: {practice.focusArea} · Audience: {practice.audience}
                    </p>
                    {practice.description && <p className="mt-2 text-sm text-slate-600">{practice.description}</p>}
                    {practice.resourceUrl && (
                      <a
                        href={practice.resourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex text-xs font-semibold text-brand underline"
                      >
                        Open linked resource
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </section>
      )}
    </div>
  );
};

export default AdminPanelPage;

