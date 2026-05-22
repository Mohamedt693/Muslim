import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import QuranDropdownBtn from '../buttons/QuranDropdownBtn';

interface NavLinkItem {
    path: string;
    labelKey: string;
}

const navLinks: NavLinkItem[] = [
    { path: '/hadith', labelKey: 'nav.hadith' },
    { path: '/azkar', labelKey: 'nav.azkar' },
    { path: '/doaa', labelKey: 'nav.doaa' },
    { path: '/radio', labelKey: 'nav.radio' },
];

export default function Navbar() {
    const { t } = useTranslation();
    const location = useLocation();
    const { language, toggleLanguage } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);


    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-200/40 bg-(--background) backdrop-blur-md dark:border-neutral-800/40 dark:bg-neutral-950/70">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                        {t('appName')}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                        to="/"
                        className={`text-sm font-medium transition-colors duration-200 ${
                            location.pathname === '/'
                                ? 'text-neutral-950 dark:text-neutral-50 font-semibold'
                                : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50'
                            }`}
                        >
                            {t('nav.home')}
                        </Link>

                        <QuranDropdownBtn 
                            language={language} 
                            t={t} 
                            currentPath={location.pathname} 
                        />

                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'text-neutral-950 dark:text-neutral-50 font-semibold'
                                        : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50'
                                    }`}
                                >
                                    {t(link.labelKey)}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button
                    onClick={toggleLanguage}
                    className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-semibold 
                    uppercase tracking-wider text-neutral-700 transition-colors hover:bg-neutral-50 
                    dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                        {language === 'ar' ? 'English' : 'عربي'}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950 md:hidden dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            {isMobileMenuOpen && (
                <div className="border-b border-neutral-200 bg-white px-4 py-3 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex flex-col gap-3">
                        <Link
                        to="/"
                        className={`text-sm font-medium ${location.pathname === '/' ? 'text-neutral-950 dark:text-neutral-50' : 'text-neutral-500'}`}
                        >
                            {t('nav.home')}
                        </Link>

                        <div className="h-px bg-neutral-100 dark:bg-neutral-900" />

                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">{t('nav.quran')}</span>
                        <Link
                        to="/quran-read"
                        className={`ps-4 text-sm font-medium ${location.pathname === '/quran-read' ? 'text-neutral-950 dark:text-neutral-50' : 'text-neutral-500'}`}
                        >
                            {t('nav.quranRead')}
                        </Link>
                        <Link
                        to="/quran-listen"
                        className={`ps-4 text-sm font-medium ${location.pathname === '/quran-listen' ? 'text-neutral-950 dark:text-neutral-50' : 'text-neutral-500'}`}
                        >
                            {t('nav.quranListen')}
                        </Link>

                        <div className="h-px bg-neutral-100 dark:bg-neutral-900" />

                        {navLinks.map((link) => (
                            <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium ${location.pathname === link.path ? 'text-neutral-950 dark:text-neutral-50' : 'text-neutral-500'}`}
                            >
                                {t(link.labelKey)}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}