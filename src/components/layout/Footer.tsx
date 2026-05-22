import { useTranslation } from 'react-i18next';
import { LuHeart } from 'react-icons/lu';
import { Link } from 'react-router-dom';



interface NavLinkItem {
    path: string;
    labelKey: string;
}

const navLinks: NavLinkItem[] = [
    { path: '/about', labelKey: 'footer.about' },
    { path: '/privacy', labelKey: 'footer.privacy' },
    { path: '/terms', labelKey: 'footer.terms' },
    { path: '/contact', labelKey: 'footer.contact' },
];

export default function Footer() {
    const { t, i18n } = useTranslation();
    const currentYear = new Date().getFullYear();
    const isArabic = i18n.language?.startsWith('ar');

    return (
        <footer className="w-full mt-auto py-8 border-t border-neutral-200/40 bg-(--background) select-none">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-secondary font-medium">
        
                <div className={`flex items-center gap-1 ${isArabic ? 'dir-rtl' : 'dir-ltr'}`}>
                    <span>{t('footer.built_with')}</span>
                    <LuHeart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                    <span>{t('footer.for_muslims')}</span>
                </div>

                <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 justify-center ${isArabic ? 'dir-rtl' : 'dir-ltr'}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="hover:text-primary transition-colors duration-200"
                        >
                            {t(link.labelKey)}
                        </Link>
                    ))}
                </div>

                <div className={isArabic ? 'dir-rtl' : 'dir-ltr'}>
                    <span>
                        &copy; {currentYear} {t('footer.rights')}
                    </span>
                </div>

            </div>
        </footer>
   );
}