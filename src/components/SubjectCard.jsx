import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';

const SubjectCard = ({ subject }) => {
  const { t } = useLanguage();
  const title = t(['subjects', subject.id, 'title'], subject.title);
  const description = t(['subjects', subject.id, 'description'], subject.description);
  const keywords = t(['subjects', subject.id, 'keywords'], subject.keywords);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.3)] transition hover:border-brand/40 hover:shadow-[0_35px_90px_-60px_rgba(56,189,248,0.35)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_60%)]" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col gap-5">
        <img
          src={subject.heroImage}
          alt={`${title} illustration`}
          className="h-44 w-full rounded-2xl border border-slate-200 object-cover"
        />
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 flex-1 text-sm text-slate-700">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-brand">
            {keywords.map((keyword) => (
              <span key={keyword} className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <Link
          to={`/subjects/${subject.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-3"
        >
          {t(['subjects', subject.id, 'cta'], 'Explore lessons')}
          <FiArrowRight aria-hidden />
        </Link>
      </div>
    </article>
  );
};

export default SubjectCard;
