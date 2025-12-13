import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const HomePage = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('homePage.quickLinks.primary', 'Primary'), to: '/subjects' },
    { label: t('homePage.quickLinks.forum', 'Forum'), to: '/forum' },
    { label: t('homePage.quickLinks.flashcards', 'Flashcards'), to: '/flashcards' },
    { label: t('homePage.quickLinks.dictionary', 'Dictionary'), to: '/dictionary' },
    { label: t('homePage.quickLinks.practice', 'Practice'), to: '/quizzes' },
    { label: t('homePage.quickLinks.progress', 'Progress'), to: '/subjects' }
  ];

  const learningPaths = [
    {
      title: t('homePage.learningPaths.primary.title', 'Primary'),
      grades: t('homePage.learningPaths.primary.grades', 'Grades 1-5'),
      summary: t(
        'homePage.learningPaths.primary.summary',
        'Grow a science and English foundation with colorful stories and simple experiments.'
      ),
      accent: 'from-sky-100 to-sky-50',
      chips: t('homePage.learningPaths.primary.chips', ['Math starters', 'Science in English', 'Everyday vocabulary'])
    },
    {
      title: t('homePage.learningPaths.lowerSecondary.title', 'Lower Secondary'),
      grades: t('homePage.learningPaths.lowerSecondary.grades', 'Grades 6-9'),
      summary: t(
        'homePage.learningPaths.lowerSecondary.summary',
        'Confidently explore physics, chemistry, and biology while practicing subject-specific English.'
      ),
      accent: 'from-indigo-100 to-indigo-50',
      chips: t('homePage.learningPaths.lowerSecondary.chips', ['Lab language', 'Topic quizzes', 'Flashcards'])
    },
    {
      title: t('homePage.learningPaths.upperSecondary.title', 'Upper Secondary'),
      grades: t('homePage.learningPaths.upperSecondary.grades', 'Grades 10-12'),
      summary: t(
        'homePage.learningPaths.upperSecondary.summary',
        'Prepare for advanced science with bilingual lessons, study tips, and mock tests.'
      ),
      accent: 'from-emerald-100 to-emerald-50',
      chips: t('homePage.learningPaths.upperSecondary.chips', ['Exam prep', 'Project ideas', 'Tutor notes'])
    }
  ];

  const subjectHighlights = [
    {
      title: t('homePage.subjectHighlights.math.title', 'Mathematics'),
      grades: t('homePage.subjectHighlights.math.grades', 'Grade 10 · Grade 11 · Grade 12'),
      bullet: t('homePage.subjectHighlights.math.bullet', 'Algebra | Geometry | Functions | Trigonometry'),
      color: 'border-sky-100 bg-sky-50 text-sky-900'
    },
    {
      title: t('homePage.subjectHighlights.physics.title', 'Physics'),
      grades: t('homePage.subjectHighlights.physics.grades', 'Grade 10 · Grade 11 · Grade 12'),
      bullet: t('homePage.subjectHighlights.physics.bullet', 'Mechanics | Waves | Electricity | Optics'),
      color: 'border-indigo-100 bg-indigo-50 text-indigo-900'
    },
    {
      title: t('homePage.subjectHighlights.chemistry.title', 'Chemistry'),
      grades: t('homePage.subjectHighlights.chemistry.grades', 'Grade 10 · Grade 11 · Grade 12'),
      bullet: t(
        'homePage.subjectHighlights.chemistry.bullet',
        'Atomic structure | Equations | Reaction rates | Organic'
      ),
      color: 'border-emerald-100 bg-emerald-50 text-emerald-900'
    },
    {
      title: t('homePage.subjectHighlights.biology.title', 'Biology'),
      grades: t('homePage.subjectHighlights.biology.grades', 'Grade 10 · Grade 11 · Grade 12'),
      bullet: t('homePage.subjectHighlights.biology.bullet', 'Cells | Genetics | Plants | Ecology'),
      color: 'border-amber-100 bg-amber-50 text-amber-900'
    },
    {
      title: t('homePage.subjectHighlights.english.title', 'English'),
      grades: t('homePage.subjectHighlights.english.grades', 'Phonetics · English for Science · Academic Writing'),
      bullet: t(
        'homePage.subjectHighlights.english.bullet',
        'Speech sounds | Grammar in use | Lab instructions | IELTS tips'
      ),
      color: 'border-fuchsia-100 bg-fuchsia-50 text-fuchsia-900'
    },
    {
      title: t('homePage.subjectHighlights.vietnamese.title', 'Vietnamese'),
      grades: t('homePage.subjectHighlights.vietnamese.grades', 'Phonetics · Reading · Grammar'),
      bullet: t('homePage.subjectHighlights.vietnamese.bullet', 'Balanced literacy | Storytelling | Writing practice'),
      color: 'border-slate-100 bg-slate-50 text-slate-900'
    }
  ];

  const resources = [
    {
      title: t('homePage.resources.flashcards.title', 'Flashcards'),
      description: t(
        'homePage.resources.flashcards.description',
        'Study core STEM vocabulary with clean, easy-to-review decks.'
      ),
      to: '/flashcards',
      tone: 'bg-white text-slate-900'
    },
    {
      title: t('homePage.resources.dictionary.title', 'Dictionary'),
      description: t(
        'homePage.resources.dictionary.description',
        'Look up terms and hear how they connect to real experiments.'
      ),
      to: '/dictionary',
      tone: 'bg-slate-900 text-white'
    },
    {
      title: t('homePage.resources.practice.title', 'Practice'),
      description: t(
        'homePage.resources.practice.description',
        'Try quizzes and quick checks for every lesson.'
      ),
      to: '/quizzes',
      tone: 'bg-white text-slate-900'
    },
    {
      title: t('homePage.resources.progress.title', 'Progress'),
      description: t(
        'homePage.resources.progress.description',
        'Track completed modules and celebrate milestones.'
      ),
      to: '/subjects',
      tone: 'bg-slate-900 text-white'
    }
  ];

  const communityCards = [
    {
      title: t('homePage.community.languageLab.title', 'Language Lab'),
      description: t(
        'homePage.community.languageLab.description',
        'Warm up with greetings, classroom phrases, and pronunciation.'
      ),
      items: t('homePage.community.languageLab.items', ['Greetings', 'Classroom language', 'English spelling']),
      to: '/dictionary'
    },
    {
      title: t('homePage.community.forum.title', 'Forum & Tutor Room'),
      description: t(
        'homePage.community.forum.description',
        'Ask questions, share tips, and get feedback from the SciBridge team.'
      ),
      items: t('homePage.community.forum.items', ['Weekly challenges', 'Study tips', 'Peer feedback']),
      to: '/forum'
    }
  ];

  return (
    <div className="bg-[#0b4f7f] text-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.06),transparent_35%)]"
          aria-hidden
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-16 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-black/10 transition hover:bg-white/25"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-100">
                {t('homePage.hero.eyebrow', 'Connecting Science & English')}
              </p>
              <h1 className="text-4xl font-black leading-tight md:text-5xl">
                {t('homePage.hero.title', 'SciBridge')}
              </h1>
              <p className="text-lg text-sky-100 md:text-xl">
                {t(
                  'homePage.hero.description',
                  'Learn physics, chemistry, biology, math, and English side-by-side. Friendly lessons, practice labs, and community support to help every learner grow.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0b4f7f] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t('homePage.hero.primaryCta', 'Start learning')}
              </Link>
              <Link
                to="/forum"
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                {t('homePage.hero.secondaryCta', 'See the forum')}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-sky-50 md:max-w-lg">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-inner">
                <p className="text-xs uppercase tracking-wide text-sky-100">
                  {t('homePage.hero.stem.title', 'STEM Courses')}
                </p>
                <p className="mt-2 font-semibold">
                  {t('homePage.hero.stem.list', 'Math · Physics · Chemistry · Biology · IT')}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-inner">
                <p className="text-xs uppercase tracking-wide text-sky-100">
                  {t('homePage.hero.language.title', 'Language Skills')}
                </p>
                <p className="mt-2 font-semibold">
                  {t('homePage.hero.language.list', 'Phonetics · Academic English · Writing')}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-6 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl md:block" aria-hidden />
            <div className="absolute -right-14 -bottom-10 hidden h-36 w-36 rounded-full bg-sky-200/20 blur-3xl md:block" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c6ba6] to-[#0a3f6d] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/15 text-2xl">📘</div>
                <div className="text-left">
                  <p className="text-sm uppercase tracking-wide text-sky-100">
                    {t('homePage.hero.card.liveClass', 'Live Class')}
                  </p>
                  <p className="text-xl font-bold">{t('homePage.hero.card.topic', 'Electric Circuits')}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 rounded-2xl bg-white p-4 text-slate-900 shadow-lg shadow-black/10">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-xl">👩‍🏫</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      {t('homePage.hero.card.teacherLabel', 'Teacher')}
                    </p>
                    <p className="font-semibold">
                      {t('homePage.hero.card.teacherDetail', 'Ms. Le - Explain the diagram')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-xl">👩‍💻</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      {t('homePage.hero.card.studentLabel', 'Student')}
                    </p>
                    <p className="font-semibold">
                      {t('homePage.hero.card.studentDetail', 'Mai - Homework question (English)')}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4 text-white">
                  <p className="text-xs uppercase tracking-wide text-sky-200">
                    {t('homePage.hero.card.realtimeHelp.title', 'Realtime help')}
                  </p>
                  <p className="mt-2 text-sm">
                    {t(
                      'homePage.hero.card.realtimeHelp.description',
                      'Upload your exercise, get hints, and practice speaking confidently.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-t-3xl bg-white text-slate-900 shadow-[0_-20px_60px_rgba(0,0,0,0.12)]">
        <div className="mx-auto max-w-6xl space-y-14 px-4 py-16">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
              {t('homePage.learningPathsEyebrow', 'Choose your pathway')}
            </p>
            <h2 className="text-3xl font-black md:text-4xl">
              {t('homePage.learningPathsTitle', 'Support for every grade level')}
            </h2>
            <p className="text-lg text-slate-600 md:text-xl">
              {t(
                'homePage.learningPathsDescription',
                'Dedicated tracks for primary, lower secondary, and upper secondary learners.'
              )}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {learningPaths.map((path) => (
              <article
                key={path.title}
                className={`rounded-3xl border border-slate-100 bg-gradient-to-br ${path.accent} p-6 shadow-[0_15px_50px_rgba(15,23,42,0.06)]`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{path.title}</h3>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {path.grades}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-700">{path.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {path.chips.map((chip) => (
                    <span key={chip} className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-800">
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                  {t('homePage.subjectsEyebrow', 'Subjects')}
                </p>
                <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
                  {t('homePage.subjectsTitle', 'STEM & Language focus')}
                </h2>
                <p className="text-lg text-slate-600">
                  {t('homePage.subjectsDescription', 'Follow the map and unlock every unit with bilingual notes.')}
                </p>
              </div>
              <Link
                to="/subjects"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-400/20 transition hover:-translate-y-0.5"
              >
                {t('homePage.subjectsCta', 'Browse all subjects')}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {subjectHighlights.map((subject) => (
                <article
                  key={subject.title}
                  className={`rounded-2xl border p-5 shadow-[0_10px_40px_rgba(15,23,42,0.05)] ${subject.color}`}
                >
                  <h3 className="text-lg font-bold">{subject.title}</h3>
                  <p className="mt-2 text-sm font-semibold">{subject.grades}</p>
                  <p className="mt-1 text-sm">{subject.bullet}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6 rounded-3xl bg-slate-50 p-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                {t('homePage.communityEyebrow', 'Community')}
              </p>
              <h3 className="text-2xl font-black text-slate-900">
                {t('homePage.communityTitle', 'Practice English in real situations')}
              </h3>
              <p className="text-slate-700">
                {t(
                  'homePage.communityDescription',
                  'Get gentle pronunciation practice, classroom-ready expressions, and mentor feedback. Upload homework, ask questions, and learn together.'
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/forum"
                  className="rounded-full bg-[#0b4f7f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300/30transition hover:-translate-y-0.5"
                >
                  {t('homePage.communityPrimaryCta', 'Open the forum')}
                </Link>
                <Link
                  to="/login"
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5"
                >
                  {t('homePage.communitySecondaryCta', 'Log in to join')}
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {communityCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-slate-900">{card.title}</h4>
                    <Link to={card.to} className="text-sm font-semibold text-[#0b4f7f] underline">
                      {t('homePage.communityExplore', 'Explore')}
                    </Link>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                  {t('homePage.resourcesEyebrow', 'Resources')}
                </p>
                <h3 className="text-3xl font-black text-slate-900 md:text-4xl">
                  {t('homePage.resourcesTitle', 'Stay organized')}
                </h3>
                <p className="text-lg text-slate-600">
                  {t('homePage.resourcesDescription', 'Flashcards, dictionary, exercises, and progress in one place.')}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                {resources.map((resource) => (
                  <Link
                    key={resource.title}
                    to={resource.to}
                    className={`group rounded-2xl border border-slate-100 p-5 text-left shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] ${resource.tone}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">{resource.title}</p>
                    <p className="mt-2 text-sm font-medium opacity-80 group-hover:opacity-100">{resource.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b4f7f] to-slate-800 p-[1px] shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
              <div className="grid gap-8 rounded-[22px] bg-white px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10">
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
                    {t('homePage.aboutEyebrow', 'About')}
                  </p>
                  <h3 className="text-3xl font-black text-slate-900 md:text-4xl">
                    {t('homePage.aboutTitle', 'Built for bilingual STEM learners')}
                  </h3>
                  <p className="text-lg text-slate-700">
                    {t(
                      'homePage.aboutDescription',
                      'SciBridge mixes STEM concepts with friendly English practice so you can speak, write, and solve problems with confidence.'
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t('homePage.aboutPillars', ['Bilingual lessons', 'Local mentors', 'Free community events', 'Practical labs']).map(
                      (item) => (
                        <span key={item} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b4f7f] text-lg text-white">SB</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {t('homePage.aboutCardTitle', 'Why students choose us')}
                      </p>
                      <p className="text-xs text-slate-600">
                        {t('homePage.aboutCardSubtitle', 'Stories from learners, tutors, and parents across Vietnam')}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                        {t('homePage.aboutHighlights.guidedTitle', 'Guided learning')}
                      </p>
                      <p className="mt-2">
                        {t(
                          'homePage.aboutHighlights.guidedBody',
                          'Follow a roadmap with checkpoints, mentor notes, and bilingual examples.'
                        )}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                        {t('homePage.aboutHighlights.supportTitle', 'Always supported')}
                      </p>
                      <p className="mt-2">
                        {t(
                          'homePage.aboutHighlights.supportBody',
                          'Chat with tutors, review flashcards, and ask questions in Vietnamese or English.'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/chatbot"
                      className="inline-flex items-center justify-center rounded-full bg-[#0b4f7f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0b4f7f]/30 transition hover:-translate-y-0.5"
                    >
                      {t('homePage.aboutPrimaryCta', 'Try the chatbot')}
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300"
                    >
                      {t('homePage.aboutSecondaryCta', 'Talk to our team')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
