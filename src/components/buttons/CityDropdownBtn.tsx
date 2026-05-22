import { useState, useRef, useEffect } from 'react';
import { usePrayer } from '../../contexts/PrayerContext';
import { useTranslation } from 'react-i18next';
import cityData from '../../assets/data/Cities.json';


interface CityItem {
    displayName: string;
    cityName: string;
    countery: string;
    code: string;
}

export default function CityDropdownBtn() {
    const {t} = useTranslation();
    const { city, setCity } = usePrayer();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const citiesList: CityItem[] = cityData.Cities;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-start" ref={dropdownRef}>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
                <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                {t(`cities.${city.cityName}`)}

                <svg className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-100 mt-2 w-48 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
                    {citiesList.map((item) => (
                        <button
                            key={item.cityName}
                            onClick={() => {
                                setCity(item);
                                setIsOpen(false);
                            }}
                            className={`w-full rounded-lg px-4 py-2 text-start text-sm transition-colors ${
                                city.cityName === item.cityName
                                    ? 'bg-neutral-100 font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50'
                                    : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
                                }`}
                        >
                            {t(`cities.${item.cityName}`)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}