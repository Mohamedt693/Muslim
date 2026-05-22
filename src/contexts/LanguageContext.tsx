import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
    language: Language;
    direction: Direction;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState<Language>((i18n.language as Language) || 'ar');
    const [direction, setDirection] = useState<Direction>(language === 'ar' ? 'rtl' : 'ltr');

    useEffect(() => {
        const currentLanguage = i18n.language as Language;
        const curentDirection = currentLanguage === 'ar' ? 'rtl' : 'ltr';

        setLanguage(currentLanguage);
        setDirection(curentDirection);

        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = curentDirection;
    }, [i18n.language]);

    const toggleLanguage = () => {
        const newLanguage: Language = language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLanguage);
    }

    return (
        <LanguageContext.Provider value={{ language, direction, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};


export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};