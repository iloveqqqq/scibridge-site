import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMessageCircle, FiSend } from 'react-icons/fi';

const CLASSROOM_CODE = 'scibridge';

const initialPosts = [
  {
    id: 'post-1',
    author: 'Maya (Physics Explorer)',
    subject: 'Physics',
    createdAt: '2024-04-14T10:15:00Z',
    content:
      'I used the velocity simulation from the Physics lessons to practice English direction words. Try describing the movement using north, south, east, west!',
    comments: [
      {
        id: 'comment-1',
        author: 'Leo',
        createdAt: '2024-04-14T12:05:00Z',
        content: 'Thanks Maya! I will add arrows to my science notebook to explain directions.'
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Sara (Future Biologist)',
    subject: 'Biology',
    createdAt: '2024-04-13T08:45:00Z',
    content:
      'Does anyone have tips for remembering the steps of photosynthesis in English? I created a song with “sunlight, water, and carbon dioxide” as the chorus.',
    comments: [
      {
        id: 'comment-2',
        author: 'Aisha',
        createdAt: '2024-04-13T09:10:00Z',
        content: 'I like to make a diagram with labels: sunlight → leaves → glucose. Maybe we can share our songs?'
      },
      {
        id: 'comment-3',
        author: 'Diego',
        createdAt: '2024-04-13T10:02:00Z',
        content: 'My teacher says to remember “plants use light to cook sugar.” Simple but it helps!'
      }
    ]
  }
];

const subjectAccent = {
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-amber-100 text-amber-700',
  Biology: 'bg-emerald-100 text-emerald-700',
  'Earth Science': 'bg-sky-100 text-sky-700'
};

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(isoDate));

const ForumPage = ({ user, onLogin, onLogout }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [subject, setSubject] = useState('Physics');
  const [statusText, setStatusText] = useState('');
  const [commentDrafts, setCommentDrafts] = useState({});
  const [credentials, setCredentials] = useState({ username: '', code: '' });
  const [formMessage, setFormMessage] = useState('');

  const activeSubjects = useMemo(
    () => ['Physics', 'Chemistry', 'Biology', 'Earth Science'],
    []
  );

  const handleStatusSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      setFormMessage('Please sign in with the classroom code before posting.');
      return;
    }
    if (!statusText.trim()) {
      setFormMessage('Write a short idea or question before sharing.');
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      author: user.name,
      subject,
      createdAt: new Date().toISOString(),
      content: statusText.trim(),
      comments: []
    };

    setPosts((previous) => [newPost, ...previous]);
    setStatusText('');
    setFormMessage('Your update has been shared with the class!');
  };

  const handleCommentSubmit = (postId) => {
    if (!user) {
      setFormMessage('Please sign in to join the discussion.');
      return;
    }

    const draft = commentDrafts[postId]?.trim();
    if (!draft) {
      setFormMessage('Add a helpful comment before submitting.');
      return;
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      author: user.name,
      createdAt: new Date().toISOString(),
      content: draft
    };

    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setCommentDrafts((previous) => ({ ...previous, [postId]: '' }));
    setFormMessage('Thank you for adding to the conversation!');
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const trimmedName = credentials.username.trim();
    const code = credentials.code.trim().toLowerCase();

    if (!trimmedName) {
      setFormMessage('Please enter the name you want classmates to see.');
      return;
    }

    if (code !== CLASSROOM_CODE) {
      setFormMessage('Incorrect classroom code. Ask your teacher for the correct code.');
      return;
    }

    onLogin?.({ name: trimmedName });
    setCredentials({ username: '', code: '' });
    setFormMessage(`Welcome to the SciBridge Forum, ${trimmedName}!`);
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4">
        <header className="rounded-3xl bg-brand-light/60 p-8 shadow-sm">
          <h1 className="font-display text-3xl font-bold text-brand-dark">
            SciBridge Forum
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-600">
            Share science ideas in English, ask classmates questions, and practice
            academic vocabulary together. Only students who join with the classroom
            code can post updates or comments to keep the space safe.
          </p>
          {!user ? (
            <form onSubmit={handleLoginSubmit} className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-inner sm:grid-cols-2">
              <div className="sm:col-span-2 flex items-center gap-2 text-sm font-semibold text-brand-dark">
                <FiLogIn aria-hidden />
                Sign in with your class code
              </div>
              <label className="flex flex-col text-sm font-semibold text-slate-600">
                Display name
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(event) => setCredentials((previous) => ({
                    ...previous,
                    username: event.target.value
                  }))}
                  className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  placeholder="e.g., Jamie the Chemist"
                  required
                />
              </label>
              <label className="flex flex-col text-sm font-semibold text-slate-600">
                Classroom code
                <input
                  type="password"
                  value={credentials.code}
                  onChange={(event) => setCredentials((previous) => ({
                    ...previous,
                    code: event.target.value
                  }))}
                  className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  placeholder="Ask your teacher"
                  required
                />
              </label>
              <button
                type="submit"
                className="sm:col-span-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
              >
                Join the forum
              </button>
            </form>
          ) : (
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-6 shadow-inner">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">Welcome back, {user.name}!</p>
                  <p className="text-xs text-slate-500">Ready to share a science success story?</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full border border-brand-dark px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-light/70"
                onClick={() => {
                  onLogout?.();
                  setFormMessage('You have signed out. Come back soon!');
                }}
              >
                Sign out
              </button>
            </div>
          )}
          {formMessage && (
            <p className="mt-4 rounded-lg bg-white/70 px-4 py-3 text-sm font-semibold text-brand-dark shadow-sm">
              {formMessage}
            </p>
          )}
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-8">
            <article className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-dark">
                <FiMessageCircle aria-hidden />
                Class discussion board
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choose a subject, write your idea or question, and post it to the community.
                Be kind, use English science vocabulary, and support your classmates.
              </p>
              <form onSubmit={handleStatusSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600">Subject</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeSubjects.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSubject(item)}
                        className={`rounded-full px-4 py-1 text-sm font-semibold transition ${
                          subject === item
                            ? 'bg-brand text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block text-sm font-semibold text-slate-600">
                  Share your status update
                  <textarea
                    value={statusText}
                    onChange={(event) => setStatusText(event.target.value)}
                    className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Explain a lab result, ask for help, or celebrate a quiz score!"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
                >
                  <FiSend aria-hidden />
                  Post to forum
                </button>
              </form>
            </article>

            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-brand-dark">{post.author}</p>
                      <p className="text-xs text-slate-500">Posted on {formatDate(post.createdAt)}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${subjectAccent[post.subject] ?? 'bg-slate-200 text-slate-700'}`}>
                      {post.subject}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-700">{post.content}</p>
                  <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Comments</p>
                    {post.comments.length === 0 ? (
                      <p className="text-sm text-slate-500">No comments yet. Be the first to support a classmate!</p>
                    ) : (
                      <ul className="space-y-3">
                        {post.comments.map((comment) => (
                          <li key={comment.id} className="rounded-xl bg-white px-4 py-3 shadow-sm">
                            <p className="text-sm font-semibold text-brand-dark">{comment.author}</p>
                            <p className="text-xs text-slate-400">{formatDate(comment.createdAt)}</p>
                            <p className="mt-1 text-sm text-slate-700">{comment.content}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="pt-2">
                      <label className="sr-only" htmlFor={`${post.id}-comment`}>
                        Add a comment for {post.author}
                      </label>
                      <textarea
                        id={`${post.id}-comment`}
                        value={commentDrafts[post.id] ?? ''}
                        onChange={(event) =>
                          setCommentDrafts((previous) => ({
                            ...previous,
                            [post.id]: event.target.value
                          }))
                        }
                        className="min-h-[80px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                        placeholder={user ? 'Write a friendly, helpful comment.' : 'Sign in to add a comment.'}
                        disabled={!user}
                      />
                      <button
                        type="button"
                        onClick={() => handleCommentSubmit(post.id)}
                        className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-300"
                        disabled={!user}
                      >
                        <FiSend aria-hidden />
                        Share comment
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-dark">Forum tips</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Use vocabulary from the lessons to practice English grammar.</li>
                <li>• Give examples, pictures, or links from the Resources page when you help others.</li>
                <li>
                  • Need inspiration? Visit the{' '}
                  <Link to="/subjects" className="font-semibold text-brand-dark underline">
                    Subjects page
                  </Link>{' '}
                  and share what you discover.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl bg-brand-dark p-6 text-white shadow-sm">
              <h2 className="text-lg font-semibold">Forum safety rules</h2>
              <ul className="mt-3 space-y-2 text-sm text-brand-light">
                <li>Be respectful and kind in every comment.</li>
                <li>Do not share personal contact information.</li>
                <li>Report any problems to your teacher immediately.</li>
              </ul>
              <p className="mt-4 text-xs text-brand-light/80">
                The SciBridge Forum is a demo experience. Connect to your own database or
                learning management system to store messages permanently.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ForumPage;
