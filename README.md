# SciBridge: Natural Sciences in English

SciBridge is a modern, responsive learning site that helps high school students strengthen their English skills while studying Natural Sciences. The site is built with React and Tailwind CSS and includes lesson libraries, multimedia content, interactive quizzes, a vocabulary focus, a collaborative forum, and lightweight progress tracking.

## Getting started

```bash
npm install
npm run dev
```

Visit the development server at [http://localhost:5173](http://localhost:5173).

To create an optimized production build:

```bash
npm run build
```

## Project structure

```
scibridge-site/
├── index.html            # Application entry for Vite
├── package.json          # Dependencies and scripts
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

## Extend the platform

- Add more lessons, vocabulary, and quizzes by editing the JSON-like objects in `src/data`. Vocabulary definitions are adapted from Oxford Learner's Dictionaries and the Cambridge Dictionary for ESL clarity.
- Connect the progress tracker to a backend service to store student accounts.
- Extend the classroom forum by persisting posts/comments with your preferred database or LMS APIs.
- Replace the sample chatbot with an API-powered tutor for deeper question answering.
- Localize the interface by adding translated strings and a language toggle.

Happy teaching and learning!
