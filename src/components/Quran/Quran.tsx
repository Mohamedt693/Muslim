import { useState, useRef, useEffect } from 'react';
import HTMLPageFlip from 'react-pageflip';
import { QuranPage } from './QuranPage';
import surahs from '../../assets/data/surahs.json';
import { useTranslation } from 'react-i18next';

export default function Quran() {
  const { t } = useTranslation();
  const bookRef = useRef<any>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const saved = localStorage.getItem('quran_bookmark');
    return saved ? parseInt(saved, 10) : 1;
  });

  const totalPages = Array.from({ length: 604 }, (_, i) => 604 - i);

  useEffect(() => {
    localStorage.setItem('quran_bookmark', currentPage.toString());
  }, [currentPage]);

  const onPageFlip = (e: { data: number }) => {
    setCurrentPage(604 - e.data);
  };

  const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageNumber = parseInt(e.target.value, 10);
    if (bookRef.current && pageNumber) {
      bookRef.current.pageFlip().turnToPage(604 - pageNumber);
    }
  };

  const nextPage = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  };

  const prevPage = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start 
    p-6 font-sans antialiased transition-colors duration-300">
      
      <div className="w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-sm
      border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl p-4 
      flex flex-wrap gap-4 items-center justify-between mb-8">
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-400">{t('quranPage.surah')}</span>
          <select 
            onChange={handleSurahChange}
            className="bg-neutral-100 dark:bg-neutral-800 border-none text-sm 
            font-medium rounded-xl px-3 py-2 text-neutral-800 dark:text-neutral-200 
            focus:ring-2 focus:ring-amber-500/20 cursor-pointer outline-none transition-all"
            value={surahs.find(s => s.page === currentPage)?.page || ""}
          >
            <option value="" disabled hidden>{t('quranPage.chooseSurah')}</option>
            {surahs.map((surah) => (
              <option key={surah.id} value={surah.page}>
                {surah.id}. {surah.name} ({surah.type})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500/5 border border-amber-500/10 rounded-full text-xs font-medium text-amber-700 dark:text-amber-400 select-none">
          <span>{t('quranPage.page')}</span>
          <span className="font-bold text-sm">{currentPage}</span>
          <span className="text-neutral-400">/</span>
          <span>٦٠٤</span>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-sm font-medium"
            title="الصفحة التالية"
          >
            {t('quranPage.next')} ←
          </button>
          <button 
            onClick={nextPage}
            disabled={currentPage === 604}
            className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-sm font-medium"
            title="الصفحة السابقة"
          >
            → {t('quranPage.prev')}
          </button>
        </div>

      </div>

      <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
        <div className="w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-neutral-200/40 dark:border-neutral-900 bg-[#fcfbf7]">
          
          <HTMLPageFlip
            width={450}
            height={650}
            size="stretch"
            minWidth={300}
            maxWidth={800}
            minHeight={450}
            maxHeight={1100}
            maxShadowOpacity={0.3}
            showCover={false}
            usePortrait={true}
            onFlip={onPageFlip}
            ref={bookRef}
            className="mx-auto"
            style={{ margin: '0 auto' }}
            startPage={604 - currentPage} 
            drawShadow={true}
            flippingTime={700}
            swipeDistance={30}
            
            showPageCorners={false} 
            disableFlipByClick={true} 
            useMouseEvents={true}    
            
            startZIndex={0}
            autoSize={true}
            mobileScrollSupport={true}
            clickEventForward={false}
          >
            {totalPages.map((pageNumber) => (
              <QuranPage key={pageNumber} pageNumber={pageNumber}>
                <img
                  src={`https://maknoon.com/quran/hafs/${pageNumber}.svgz`}
                  alt={`مصحف صفحة ${pageNumber}`}
                  className="w-full h-full object-contain pointer-events-none select-none"
                  loading="lazy"
                />
              </QuranPage>
            ))}
          </HTMLPageFlip>

        </div>
      </div>

      <div className="mt-6 pb-2 text-[10px] uppercase tracking-widest text-neutral-400 font-semibold select-none">
        {t('quranPage.footer')}
      </div>

    </div>
  );
}