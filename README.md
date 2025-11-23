# SciBridge: Natural Sciences in English

SciBridge is a modern, responsive learning site that places Academic English at the center while extending into Natural Sciences. The site is built with React and Tailwind CSS and includes lesson libraries, multimedia content, interactive quizzes, a vocabulary focus, a collaborative forum, and lightweight progress tracking.

## Getting started

```bash
npm install

# in one terminal: start the API (requires SMTP credentials for email verification)
npm run server

# in another terminal: start the React client
npm run dev
```

The frontend runs at [http://localhost:5173](http://localhost:5173) and expects the API on [http://localhost:4000](http://localhost:4000) by default.

Copy `server/.env.example` to `server/.env` and set your SMTP host, port, username, and password so verification emails can be delivered. When SMTP details are omitted the API falls back to logging verification messages to the console, which is helpful for local testing.

Set `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) in `server/.env` to enable the AI-powered Science Chatbot. Without these values the chatbot will fall back to canned responses.

Set `VITE_API_BASE_URL` in a `.env` file at the project root if you expose the API at a different URL.

To create an optimized production build:

```bash
npm run build
```

## Project structure

```
scibridge-site/
├── index.html            # Application entry for Vite
├── package.json          # Dependencies and scripts
├── server/               # Express API for account registration and email verification
├── tailwind.config.js    # Tailwind theme and scanning rules
├── postcss.config.js     # PostCSS pipeline
├── src/
│   ├── App.jsx           # Router and global layout
│   ├── main.jsx          # React entry point
│   ├── index.css         # Tailwind directives and base styles
│   ├── components/       # Reusable UI blocks (navbar, quizzes, chatbot, etc.)
│   ├── data/             # Sample lesson, quiz, vocabulary, and forum-friendly data
│   ├── hooks/            # Custom React hooks (e.g., local progress tracking)
│   └── pages/            # Page-level views for each route, including the classroom forum
└── README.md
```

## Roles and permissions

- **Student**: Default role for every verified registration. Students can browse English core lessons, explore science extensions, complete quizzes, and participate in the forum.
- **Teacher**: Assigned by an admin with an organization label. Teachers access the leadership hub to post announcements, contests, and practice sets for their organization.
- **Admin**: Full permissions including managing users (role changes, bans) and publishing content for any audience.

### Admin and teacher panel

The `/admin` route surfaces a dashboard for administrators and teachers. Actions map to the Express API:

| Purpose | Endpoint | Method | Notes |
| --- | --- | --- | --- |
| Fetch dashboard data | `/api/admin/dashboard` | `GET` | Requires `x-user-email` header from an admin or teacher account. |
| Post announcement | `/api/admin/announcements` | `POST` | Admins can specify `audience`; teachers automatically target their organization. |
| Create contest | `/api/admin/contests` | `POST` | Include optional `deadline` (ISO date string). |
| Share practice set | `/api/admin/practice-sets` | `POST` | Use `focusArea`, `description`, and optional `resourceUrl`. |
| Update user status | `/api/admin/users/:id/status` | `PATCH` | Admin-only; toggle between `active` and `banned`. |
| Update user role | `/api/admin/users/:id/role` | `PATCH` | Admin-only; assign `student`, `teacher`, or `admin` and optional `organization`. |

For development the API reads/writes JSON files in `server/data`. Update these files or seed an admin account manually before promoting other users.

## Extend the platform

- Add more lessons, vocabulary, and quizzes by editing the JSON-like objects in `src/data`. Vocabulary definitions are adapted from Oxford Learner's Dictionaries and the Cambridge Dictionary for ESL clarity.
- Connect the progress tracker to a backend service to store student accounts.
- Extend the classroom forum by persisting posts/comments with your preferred database or LMS APIs.
- Swap the JSON user store for a persistent database and enhance authentication (e.g., add JWT sessions or password reset flows).
- Replace the sample chatbot with an API-powered tutor for deeper question answering.
- Localize the interface by adding translated strings and a language toggle.

Happy teaching and learning!
