import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface QuranDropdownBtnProps {
    language: 'ar' | 'en';
    t: (key: string) => string;
    currentPath: string;
}

export default function QuranDropdownBtn({ language, t, currentPath }: QuranDropdownBtnProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isQuranActive = currentPath === '/quran-read' || currentPath === '/quran-listen';

    // once the user clicks outside the dropdown, it will close automatically
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // close the dropdown when the user navigates to a different page
    useEffect(() => {
        setIsDropdownOpen(false);
    }, [currentPath]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                isQuranActive
                    ? 'text-neutral-950 dark:text-neutral-50 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50'
                }`}
            >
                {t('nav.quran')}
                <svg
                className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isDropdownOpen && (
                <div className={`absolute top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 z-50 
                    ${language === 'ar' ? 'right-0' : 'left-0'}`}
                >
                    <Link
                    to="/quran-read"
                    className={`block rounded px-4 py-2 text-sm transition-colors ${
                        currentPath === '/quran-read'
                            ? 'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50 font-medium'
                            : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
                        }`}
                    >
                        {t('nav.quranRead')}
                    </Link>
                    <Link
                    to="/quran-listen"
                    className={`block rounded px-4 py-2 text-sm transition-colors ${
                        currentPath === '/quran-listen'
                            ? 'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50 font-medium'
                            : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
                        }`}
                    >
                        {t('nav.quranListen')}
                    </Link>
                </div>
            )}
        </div>
    );
}