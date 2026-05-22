import { useOutlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    LuSun, 
    LuMoonStar, 
    LuBed, 
    LuSunrise, 
    LuSparkles, 
    LuArrowRight, 
    LuBookmark,
    LuHeart
} from 'react-icons/lu';

export default function Azkar() {
    const { t, i18n } = useTranslation();
    const hasSubRoute = useOutlet();
    const isRtl = i18n.dir() === 'rtl';

    const categories = [
    { id: 'morning', icon: <LuSun className="w-6 h-6 text-amber-500" />, count: '25', bg: 'hover:bg-amber-50/50' },
    { id: 'night', icon: <LuMoonStar className="w-6 h-6 text-indigo-500" />, count: '25', bg: 'hover:bg-indigo-50/50' },
    { id: 'wakeup', icon: <LuSunrise className="w-6 h-6 text-orange-500" />, count: '3', bg: 'hover:bg-orange-50/50' },
    { id: 'sleeping', icon: <LuBed className="w-6 h-6 text-sky-500" />, count: '10', bg: 'hover:bg-sky-50/50' },
    { id: 'prayer', icon: <LuBookmark className="w-6 h-6 text-emerald-500" />, count: '9', bg: 'hover:bg-emerald-50/50' },
    { id: 'tasbeeh', icon: <LuSparkles className="w-6 h-6 text-rose-500" />, count: '16', bg: 'hover:bg-rose-50/50' },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-6 text-start select-none">
            {!hasSubRoute ? (
                <div className="space-y-12 animate-fade-in">
                    <div className="relative w-full p-8 md:p-12 bg-white rounded-3xl border border-[#FAF6E5] overflow-hidden shadow-sm">
                        <div className="absolute inset-0 arabesque-pattern opacity-[0.02]"></div>
            
                        <div className="relative z-10 max-w-3xl space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold tracking-wide">
                                <LuHeart className="w-3.5 h-3.5 fill-primary/10" />
                                {t('azkarPage.badge')}
                            </span>
                            <h1 className="font-serif text-2xl md:text-4xl text-primary font-bold leading-tight">
                                {t('azkarPage.verse')}
                            </h1>
                            <p className="font-sans text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl pt-2">
                                {t('azkarPage.intro')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-serif font-bold text-primary">
                                {t('azkarPage.sectionTitle')}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {categories.map((item) => (
                                <Link
                                key={item.id}
                                to={item.id}
                                className={`group p-6 bg-white rounded-2xl border border-neutral-200/50 transition-all duration-300 hover:border-primary hover:shadow-md flex flex-col justify-between h-44 ${item.bg}`}
                                >
                                    <div className="flex justify-between items-start w-full">
                                        <div className="p-3 bg-neutral-50 rounded-xl group-hover:bg-white transition-colors duration-300 border border-neutral-100">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs font-mono font-bold bg-neutral-50 text-secondary px-2.5 py-1 rounded-full border border-neutral-100">
                                            {item.count} {t('azkarPage.dhikrUnit')}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center w-full mt-4">
                                        <div>
                                            <h3 className="font-serif font-bold text-lg text-primary group-hover:text-primary transition-colors">
                                                {t(`azkarPage.categories.${item.id}`)}
                                            </h3>
                                            <p className="text-xs text-neutral-400 mt-0.5">
                                                {t('azkarPage.viewMore')}
                                            </p>
                                        </div>
                                        <LuArrowRight className={`w-5 h-5 text-neutral-300 transition-all duration-300 group-hover:text-primary ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full space-y-6 animate-fade-in">
                    <Link 
                    to="/azkar" 
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-secondary hover:text-primary transition-colors group mb-2"
                    >
                        <LuArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
                        {t('azkarPage.backBtn')}
                    </Link>
                    <div className="w-full">
                        {hasSubRoute}
                    </div>
                </div>
            )}
        </div>
    );
}