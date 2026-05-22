import React, { forwardRef } from 'react';

interface PageProps {
  pageNumber: number;
  children: React.ReactNode;
}

export const QuranPage = forwardRef<HTMLDivElement, PageProps>(({ pageNumber, children }, ref) => {
    return (
        <div 
        className="bg-[#fcfbf7] dark:bg-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col justify-between" 
        ref={ref} 
        data-density="hard" 
        >
            <div className="w-full h-full p-4 flex items-center justify-center">
                {children}
            </div>

            <div className="text-center pb-4 text-xs font-serif text-amber-800 dark:text-amber-500/70 select-none">
                {pageNumber}
            </div>
        </div>
    );
});

QuranPage.displayName = 'QuranPage';