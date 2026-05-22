import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LuBookOpen } from 'react-icons/lu';

interface VerseData {
  text: string;
  enText: string;
  surahName: string;
  surahEnName: string;
  numberInSurah: number;
}

export default function DailyVerse() {
  const { t, i18n } = useTranslation();
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        setLoading(true);
        
        const now = new Date();
        const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
        const verseId = (dateSeed % 6236) + 1;

        const response = await fetch(`https://api.alquran.cloud/v1/ayah/${verseId}/editions/quran-uthmani,en.ahmedali`);
        const data = await response.json();

        if (data.code === 200 && data.data.length >= 2) {
          const arEdition = data.data[0];
          const enEdition = data.data[1];

          setVerse({
            text: arEdition.text,
            enText: enEdition.text,
            surahName: arEdition.surah.name,
            surahEnName: arEdition.surah.englishName,
            numberInSurah: arEdition.numberInSurah
          });
        }
      } catch (error) {
        console.error("Error fetching daily_verse:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

  const isArabic = i18n.language?.startsWith('ar');

  if (loading) {
    return (
      <div className="w-full h-full min-h-[220px] p-8 bg-white rounded-2xl border border-[#FAF6E5] animate-pulse text-start flex flex-col justify-between space-y-4">
        <div>
          <div className="h-5 w-24 bg-primary/10 rounded-full mb-5"></div>
          <div className="h-6 w-full bg-primary/10 rounded mb-2"></div>
          <div className="h-6 w-3/4 bg-primary/10 rounded"></div>
        </div>
        <div className="h-4 w-32 bg-primary/10 rounded self-end"></div>
      </div>
    );
  }

  if (!verse) return null;

  return (
    <div className="w-full h-full min-h-[220px] p-8 bg-white rounded-2xl border border-[#FAF6E5] flex flex-col justify-between relative overflow-hidden group select-none shadow-sm">
      <div className="absolute inset-0 arabesque-pattern opacity-5"></div>
      
      <div className="relative z-10 flex flex-col justify-between h-full w-full text-start">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold tracking-wide mb-5">
            <LuBookOpen className="w-3.5 h-3.5" />
            {t('quickCards.verse')}
          </span>
          
          {isArabic ? (
            <p className="font-serif text-xl md:text-2xl text-primary leading-relaxed mb-6 text-justify dir-rtl">
              {verse.text}
            </p>
          ) : (
            <p className="font-sans text-base md:text-lg text-primary/90 leading-relaxed mb-6 text-justify italic dir-ltr">
              "{verse.enText}"
            </p>
          )}
        </div>

        <div className="flex justify-end items-center text-xs font-bold text-secondary mt-auto pt-2">
          <span>
            {isArabic 
              ? `[ ${verse.surahName} : ${verse.numberInSurah} ]` 
              : `[ ${verse.surahEnName} : ${verse.numberInSurah} ]`
            }
          </span>
        </div>
      </div>
    </div>
  );
}