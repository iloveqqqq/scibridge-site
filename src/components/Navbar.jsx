import { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';

const baseNavItems = [
  { path: '/', labelKey: 'navbar.home', defaultLabel: 'Home' },
  { path: '/subjects', labelKey: 'navbar.subjects', defaultLabel: 'Subjects' },
  { path: '/quizzes', labelKey: 'navbar.quizzes', defaultLabel: 'Interactive Quizzes' },
  { path: '/forum', labelKey: 'navbar.forum', defaultLabel: 'Forum' },
  { path: '/resources', labelKey: 'navbar.resources', defaultLabel: 'Resources' },
  { path: '/about', labelKey: 'navbar.about', defaultLabel: 'About' },
  { path: '/contact', labelKey: 'navbar.contact', defaultLabel: 'Contact' }
];

const Navbar = ({ onSearch, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t, language, toggleLanguage } = useLanguage();

  const navItems = useMemo(() => {
    const items = [...baseNavItems];
    if (user?.role === 'admin' || user?.role === 'teacher') {
      items.splice(3, 0, { path: '/admin', labelKey: 'navbar.admin', defaultLabel: 'Admin Panel' });
    }
    return items;
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    navigate('/subjects', { state: { query } });
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white/95 via-white/90 to-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-3xl border border-white/60 bg-white/95 px-4 py-3 shadow-lg shadow-brand/10 lg:flex-nowrap">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 text-lg font-display font-semibold text-brand-dark transition hover:opacity-90"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-base font-bold text-brand-dark shadow-inner">
              SB
            </span>
            <span className="hidden sm:inline">SciBridge</span>
          </Link>
          <div className="hidden w-full flex-wrap items-center justify-center gap-1 md:flex md:w-full lg:w-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand text-white shadow-sm shadow-brand/30'
                      : 'text-slate-600 hover:bg-brand-light/50 hover:text-brand-dark'
                  }`
                }
              >
                {t(item.labelKey, item.defaultLabel)}
              </NavLink>
            ))}
          </div>
          <div className="hidden w-full items-center justify-center gap-3 md:flex md:w-full md:flex-wrap lg:w-auto lg:flex-nowrap lg:justify-end">
            <form onSubmit={handleSubmit} className="relative w-full md:max-w-xs lg:w-auto">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm font-medium text-slate-600 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 md:w-full lg:w-48"
                placeholder={t('navbar.searchPlaceholder', 'Search lessons')}
                aria-label={t('navbar.searchAria', 'Search lessons')}
              />
            </form>
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-brand hover:bg-brand-light/40 hover:text-brand-dark"
              aria-label={t('navbar.languageToggle', 'Switch language')}
            >
              <FiGlobe aria-hidden />
              {language === 'en' ? 'EN' : 'VI'}
            </button>
            {user ? (
              <div className="flex items-center gap-3 rounded-full border border-brand/20 bg-brand-light/40 px-3 py-1.5 text-sm font-semibold text-brand-dark">
                <span className="hidden xl:inline">{t('navbar.greeting', `Hi, {name}`, { name: user.name })}</span>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand-dark">
                  {t('navbar.role', 'Role')}: {user.role}
                </span>
                <button
                  type="button"
                  className="rounded-full bg-brand-dark px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-brand"
                  onClick={() => {
                    onLogout?.();
                    setIsOpen(false);
                  }}
                >
                  {t('navbar.signOut', 'Sign out')}
                </button>
              </div>
            ) : (
              <NavLink
                to="/forum"
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
              >
                {t('navbar.joinForum', 'Join Forum')}
              </NavLink>
            )}
          </div>
          <button
            className="ml-auto inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-brand hover:text-brand-dark md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </nav>
      </div>
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-5 md:hidden">
          <form onSubmit={handleSubmit} className="relative mb-5">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder={t('navbar.searchPlaceholder', 'Search lessons')}
              aria-label={t('navbar.searchAria', 'Search lessons')}
            />
          </form>
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold hover:bg-brand-light/40 ${
                    isActive ? 'bg-brand-light/50 text-brand-dark' : 'text-slate-600'
                  }`
                }
              >
                {t(item.labelKey, item.defaultLabel)}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:border-brand hover:bg-brand-light/40 hover:text-brand-dark"
            >
              <span className="inline-flex items-center gap-2">
                <FiGlobe aria-hidden />
                {t('navbar.languageToggle', 'Switch language')}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-wide text-slate-400">{language === 'en' ? 'English' : 'Tiếng Việt'}</span>
            </button>
            {user ? (
              <button
                type="button"
                onClick={() => {
                  onLogout?.();
                  setIsOpen(false);
                }}
                className="rounded-lg bg-brand-dark px-3 py-2 text-left text-sm font-semibold text-white shadow-sm hover:bg-brand"
              >
                {t('navbar.signOutWithName', 'Sign out {name}', { name: user.name })}
              </button>
            ) : (
              <NavLink
                to="/forum"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
              >
                {t('navbar.joinForumMobile', 'Join the Forum')}
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
