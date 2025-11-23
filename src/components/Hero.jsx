import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-blue-50 px-6 py-16 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.35)]">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.3),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.5)_0%,rgba(241,245,249,0.8)_60%,rgba(226,232,240,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'160\' height=\'160\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'g\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop stop-color=\'%23E0F2FE\' stop-opacity=\'0.55\' offset=\'0%25\'/%3E%3Cstop stop-color=\'%23E0F2FE\' stop-opacity=\'0\' offset=\'100%25\'/%3E%3C/linearGradient%3E%3Cpattern id=\'p\' width=\'32\' height=\'32\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M32 0H0v32\' fill=\'none\' stroke=\'%23cbd5e1\' stroke-opacity=\'0.45\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'url(%23p)\' width=\'160\' height=\'160\'/%3E%3Crect fill=\'url(%23g)\' width=\'160\' height=\'160\'/%3E%3C/svg%3E')]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand/70">
          {t('hero.eyebrow', 'English-first learning')}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-slate-900 md:text-5xl">
          {t('hero.heading', 'Master English to unlock every science story')}
        </h1>
        <p className="mt-4 text-base text-slate-700 md:text-lg">
          {t(
            'hero.description',
            'Start with Academic English for Science, then extend your skills to Physics, Chemistry, Biology, and Earth Science. Learn with visuals, short videos, interactive quizzes, and vocabulary adapted from Oxford and Cambridge resources.'
          )}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/subjects"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(56,189,248,0.35)] transition hover:bg-brand-dark"
          >
            {t('hero.primaryCta', 'Explore subjects')}
          </Link>
          <Link
            to="/quizzes"
            className="rounded-full border border-brand/30 bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition hover:border-brand hover:bg-brand/5"
          >
            {t('hero.secondaryCta', 'Try a quiz')}
          </Link>
        </div>
        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-[0_15px_45px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('hero.metricLessonsEyebrow', 'Guided modules')}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{t('hero.metricLessons', '40+ lessons')}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-[0_15px_45px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('hero.metricPracticeEyebrow', 'Practice questions')}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{t('hero.metricPractice', '180+ prompts')}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-[0_15px_45px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('hero.metricCommunityEyebrow', 'Learner community')}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{t('hero.metricCommunity', 'Forum + chatbot')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
