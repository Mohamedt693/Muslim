import { useOutlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    LuBook, 
    LuLibrary, 
    LuArrowRight, 
    LuCompass,
    LuScroll
} from 'react-icons/lu';

export default function Hadith() {
    const { i18n } = useTranslation();
    const hasSubRoute = useOutlet(); 
    const isRtl = i18n.dir() === 'rtl';

    const collections = [
        { 
            id: 'nawawi', 
            icon: <LuBook className="w-6 h-6 text-rose-500" />, 
            bg: 'hover:bg-rose-50/50',
            descAr: 'متن الأربعين في أحاديث سيد المرسلين والجامعة لقواعد الدين.',
            descEn: 'Forty essential traditions encompassing the core principles of Islamic faith.'
        },
        { 
            id: 'qudsi', 
            icon: <LuScroll className="w-6 h-6 text-amber-500" />, 
            bg: 'hover:bg-amber-50/50',
            descAr: 'الأحاديث التي رواها النبي ﷺ عن ربه تبارك وتعالى بلفظه.',
            descEn: 'Sacred traditions revealed to the Prophet ﷺ from Allah the Almighty.'
        },
        { 
            id: 'shahwali', 
            icon: <LuLibrary className="w-6 h-6 text-indigo-500" />, 
            bg: 'hover:bg-indigo-50/50',
            descAr: 'الأربعين المسندة من جوامع الكلم لخير الأنام للإمام الدهلوي.',
            descEn: 'The forty narrated comprehensive traditions by Imam Dehlawi.'
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-6 text-start select-none">
            
            {!hasSubRoute ? (
                <div className="space-y-12 animate-fade-in">
                    
                    <div className="relative w-full p-8 md:p-12 bg-white rounded-3xl border border-[#FAF6E5] overflow-hidden shadow-sm">
                        <div className="absolute inset-0 arabesque-pattern opacity-[0.02]"></div>
            
                        <div className="relative z-10 max-w-3xl space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold tracking-wide">
                                <LuCompass className="w-3.5 h-3.5" />
                                {isRtl ? 'السُّنَّة النَّبَوِيَّة' : 'Prophetic Sunnah'}
                            </span>
                            <h1 className="font-serif text-2xl md:text-4xl text-primary font-bold leading-tight">
                                {isRtl ? '«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ»' : '“Actions are but by intentions.”'}
                            </h1>
                            <p className="font-sans text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl pt-2">
                                {isRtl 
                                    ? 'نبحر في كلام خير الأنام صلوات ربي وسلامه عليه من المجموعات والأربعينيات المأثورة لنستقي منها الحكمة والموعظة الحسنة للتطبيق في حياتنا اليومية.'
                                    : 'Explore the compiled collections of Prophet Muhammad’s (PBUH) traditions, guiding us toward wisdom, understanding, and daily righteous actions.'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-serif font-bold text-primary">
                                {isRtl ? 'المجموعات المتوفرة' : 'Available Collections'}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {collections.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.id} 
                                    className={`group p-6 bg-white rounded-2xl border border-neutral-200/50 transition-all duration-300 hover:border-primary hover:shadow-md flex flex-col justify-between h-48 ${item.bg}`}
                                >
                                    <div className="flex justify-between items-start w-full">
                                        <div className="p-3 bg-neutral-50 rounded-xl group-hover:bg-white transition-colors duration-300 border border-neutral-100">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-1 mt-4">
                                        <h3 className="font-serif font-bold text-base md:text-lg text-primary transition-colors">
                                            {item.id === 'nawawi' && (isRtl ? 'الأربعون النووية' : "Al-Nawawi's Forty")}
                                            {item.id === 'qudsi' && (isRtl ? 'الأحاديث القدسية' : 'Hadith Qudsi')}
                                            {item.id === 'shahwali' && (isRtl ? 'الأربعون الدهلوية' : 'Shah Waliullah Forty')}
                                        </h3>
                                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                                            {isRtl ? item.descAr : item.descEn}
                                        </p>
                                    </div>

                                    <div className="flex justify-end items-center w-full mt-2 pt-1">
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
                        to="/hadith" 
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-secondary hover:text-primary transition-colors group mb-2"
                    >
                        <LuArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
                        {isRtl ? 'العودة إلى المجموعات' : 'Back to Collections'}
                    </Link>
                    <div className="w-full">
                        {hasSubRoute}
                    </div>
                </div>
            )}
        </div>
    );
}