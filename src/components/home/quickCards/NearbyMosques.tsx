import { useTranslation } from 'react-i18next';
import { LuMapPin } from 'react-icons/lu';
import MosqueMap from './MosqueMap';

export default function NearbyMosques() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith('ar');

  return (
    <div className="w-full p-6 md:p-8 bg-white rounded-2xl border border-[#FAF6E5] flex flex-col gap-6 relative overflow-hidden shadow-sm select-none">
      <div className="absolute inset-0 arabesque-pattern opacity-[0.02]"></div>
      
      <div className="relative z-10 flex flex-col gap-3 text-start">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold tracking-wide w-fit">
          <LuMapPin className="w-3.5 h-3.5" />
          {t('quickCards.mosque')}
        </span>
        
        <div className="space-y-1.5 mt-1">
          <h2 className="font-serif text-lg md:text-xl text-primary font-bold leading-relaxed">
            {isArabic 
              ? "«إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْإِخِرِ»" 
              : "“The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day.”"
            }
          </h2>
          <p className="font-sans text-xs md:text-sm text-secondary font-medium leading-relaxed max-w-2xl">
            {isArabic 
              ? "صَلاتك في المسجد صلةٌ لا تنقطع، ونورٌ يسعى بين يديك. إليك المساجد القريبة من موقعك الحالي لتلبّي النداء أينما كنت." 
              : "Your prayer in the mosque is an unbroken connection and a light guiding your path. Here are the nearest mosques to your current location."
            }
          </p>
        </div>
      </div>

        <MosqueMap />

    </div>
  );
}