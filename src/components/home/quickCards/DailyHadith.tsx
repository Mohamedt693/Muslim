import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LuQuote } from 'react-icons/lu';

interface HadithData {
  arabic: string;
  english: string;
  number: number;
}

export default function DailyHadith() {
  const { t, i18n } = useTranslation();
  const [hadith, setHadith] = useState<HadithData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyHadith = async () => {
      try {
        setLoading(true);
        
        const now = new Date();
        const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
        const electiveHadithNumber = (dateSeed % 42) + 1;

        // fetch both Arabic and English hadiths in parallel
        const [arabicResponse, englishResponse] = await Promise.all([
          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-nawawi/${electiveHadithNumber}.json`),
          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-nawawi/${electiveHadithNumber}.json`)
        ]);

        const arabicData = await arabicResponse.json();
        const englishData = await englishResponse.json();

        if (arabicData?.hadiths?.[0] && englishData?.hadiths?.[0]) {
          const cleanArabic = arabicData.hadiths[0].text.replace(/<br\s*\/?>/gi, ' ').trim();
          const cleanEnglish = englishData.hadiths[0].text.replace(/<br\s*\/?>/gi, ' ').trim();

          setHadith({
            arabic: cleanArabic,
            english: cleanEnglish,
            number: electiveHadithNumber
          });
        }
      } catch (error) {
        console.error("Error fetching daily hadith from API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyHadith();
  }, []);

  const isArabic = i18n.language?.startsWith('ar');

  if (loading) {
    return (
      <div className="w-full h-full min-h-[220px] p-8 bg-white rounded-2xl border border-[#FAF6E5] animate-pulse text-start flex flex-col justify-between space-y-4">
        <div>
          <div className="h-5 w-24 bg-primary/10 rounded-full mb-5"></div>
          <div className="h-6 w-full bg-primary/10 rounded mb-2"></div>
          <div className="h-6 w-5/6 bg-primary/10 rounded"></div>
        </div>
        <div className="h-4 w-32 bg-primary/10 rounded self-end"></div>
      </div>
    );
  }

  if (!hadith) return null;

  return (
    <div className="w-full h-full min-h-[220px] p-8 bg-white rounded-2xl border border-[#FAF6E5] flex flex-col justify-between relative overflow-hidden group select-none shadow-sm">
      <div className="absolute inset-0 arabesque-pattern opacity-5"></div>
      
      <div className="relative z-10 flex flex-col justify-between h-full w-full text-start">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold tracking-wide mb-5">
            <LuQuote className="w-3.5 h-3.5" />
            {t('quickCards.hadith')}
          </span>
          
          {isArabic ? (
            <p className="font-serif text-lg md:text-xl text-primary leading-relaxed mb-6 text-justify dir-rtl">
              {hadith.arabic}
            </p>
          ) : (
            <p className="font-sans text-base md:text-lg text-primary/90 leading-relaxed mb-6 text-justify italic dir-ltr">
              "{hadith.english}"
            </p>
          )}
        </div>

        <div className="flex justify-end items-center text-xs font-bold text-secondary mt-auto pt-2">
          <span>
            {isArabic 
              ? `[ الأربعين النووية : حديث ${hadith.number} ]` 
              : `[ Al-Arba'in an-Nawawiyyah : Hadith ${hadith.number} ]`
            }
          </span>
        </div>
      </div>
    </div>
  );
}