import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-12 text-slate-700">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-slate-900">SciBridge</h3>
          <p className="mt-3 text-sm text-slate-600">{t(
            'footer.description',
            'Bridging science learning and English support for high school students around the world.'
          )}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t('footer.explore', 'Explore')}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/subjects" className="text-slate-700 hover:text-brand-dark">
                {t('footer.subjects', 'Subjects')}
              </Link>
            </li>
            <li>
              <Link to="/quizzes" className="text-slate-700 hover:text-brand-dark">
                {t('footer.quizzes', 'Quizzes')}
              </Link>
            </li>
            <li>
              <Link to="/resources" className="text-slate-700 hover:text-brand-dark">
                {t('footer.resources', 'Resources')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t('footer.contact', 'Contact')}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Email: hello@scibridge.edu</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 42 Learning Lane, Global City</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t('footer.stayCurious', 'Stay Curious')}
          </h4>
          <p className="mt-3 text-sm text-slate-600">
            {t('footer.subscribe', 'Subscribe for updates about new lessons, live events, and teacher tips.')}
          </p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder={t('footer.emailPlaceholder', 'Email address')}
              aria-label={t('footer.emailPlaceholder', 'Email address')}
            />
            <button
              type="button"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark"
            >
              {t('footer.join', 'Join')}
            </button>
          </form>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-500">
        {t('footer.rights', `© ${new Date().getFullYear()} SciBridge. All rights reserved.`, {
          year: new Date().getFullYear()
        })}
      </p>
    </footer>
  );
};

export default Footer;
