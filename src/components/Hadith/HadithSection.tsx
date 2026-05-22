import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuBookOpen } from 'react-icons/lu';
// data imports
import nawawiData from '../../assets/data/nawawi40.json';
import qudsiData from '../../assets/data/qudsi40.json';
import shahWaliData from '../../assets/data/shahwaliullah40.json';

interface HadithItem {
    id: number;
    idInBook: number;
    arabic: string;
    english: {
        narrator: string;
        text: string;
    };
}

export default function HadithSection() {
    const { id } = useParams<{ id: string }>(); 
    const { i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    const booksMap: Record<string, { titleAr: string; titleEn: string; data: any }> = {
        nawawi: {
            titleAr: "الأربعون النووية",
            titleEn: "Al-Nawawi's Forty Hadith",
            data: nawawiData
        },
        qudsi: {
            titleAr: "الأحاديث القدسية",
            titleEn: "Forty Hadith Qudsi",
            data: qudsiData
        },
        shahwali: {
            titleAr: "الأربعون الدهلوية (شاه ولي الله)",
            titleEn: "Shah Waliullah's Forty Hadith",
            data: shahWaliData
        }
    };

    const currentBook = id ? booksMap[id] : null;

    if (!currentBook) {
        return (
            <div className="w-full text-center py-12 text-neutral-400 font-medium">
                الكتاب غير موجود أو جاري إضافته قريباً...
            </div>
        );
    }

    const hadithsList: HadithItem[] = currentBook.data.hadiths || [];

    return (
        <div className="w-full space-y-6 animate-fade-in">
            <div className="border-b border-neutral-100 pb-2 mb-4">
                <h2 className="text-lg font-serif font-bold text-secondary">
                    {isRtl ? currentBook.titleAr : currentBook.titleEn}
                </h2>
            </div>

            <div className="space-y-4">
                {hadithsList.map((hadith) => {
                    const hadithId = hadith.idInBook || hadith.id;
                    const textAr = hadith.arabic;
                    const textEn = hadith.english?.text || '';
                    const narratorEn = hadith.english?.narrator || '';

                    return (
                        <div 
                            key={hadith.id} 
                            className="w-full p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm space-y-4 text-start hover:border-neutral-200/80 transition-colors"
                        >
                            <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-neutral-50">
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                                    <LuBookOpen className="w-3.5 h-3.5" />
                                    {isRtl ? 'حديث' : 'Hadith'} #{hadithId}
                                </span>
                                
                                {!isRtl && narratorEn && (
                                    <span className="text-xs font-medium text-neutral-400 bg-neutral-50 px-2.5 py-1 rounded-full">
                                        {narratorEn}
                                    </span>
                                )}
                            </div>

                            {isRtl || !textEn ? (
                                <p className="font-serif text-lg md:text-xl text-primary leading-loose tracking-wide font-medium whitespace-pre-line">
                                    {textAr}
                                </p>
                            ) : (
                                <p className="font-sans text-sm md:text-base text-primary leading-relaxed whitespace-pre-line">
                                    {textEn}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}