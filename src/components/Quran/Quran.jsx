import React from 'react';
import { Link } from 'react-router-dom';
// React Hooks 
import { useState } from 'react';
// Material ui
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Components
import SurahSelect from './SurahSelect';
// React Router
import { Link } from 'react-router-dom';
// Rect Sweipeable
import { useSwipeable } from "react-swipeable";

function Quran() {
    const [pageNum, setPageNum] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const Next = () => {
        if (pageNum < 603) {
            setPageNum((prev) => prev + 1);
        }
    };

    const Prev = () => {
        if (pageNum > 1) {
            setPageNum((prev) => prev - 1);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: Prev,
        onSwipedRight: Next,
        preventScrollOnSwipe: true,
        trackTouch: true,
    });

    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-2 relative'>


            {isSidebarOpen ? (
                <button
                    className='absolute top-2 left-2 z-50 text-black'
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <CloseIcon fontSize='large' />
                </button> 
            ) : (
            <>
            <div className='absolute top-2 left-2 z-50 text-black'>
                <Link to={"/"}>
                    <IconButton size="large" aria-label="back-arrow">
                        <ArrowBackIcon fontSize="inherit" color="secondary" />
                    </IconButton>
                </Link>
            </div>
            <button
                className='sm:hidden absolute top-2 right-2 z-50'
                onClick={() => setIsSidebarOpen(true)}
            >
                <MenuIcon fontSize='large' />
            </button>
            </>
            )
            }


            {/* صورة واحدة في الموبايل */}
            <div {...handlers} className='w-full h-full '>
                <img
                    src={`https://maknoon.com/quran/hafs/${pageNum}.svgz`}
                    alt={`صفحة رقم ${pageNum}`}
                    className="w-full mt-30 mx-auto"
                />
            </div>


            {/* صفحتين في الشاشات الكبيرة */}
            <div className='hidden sm:flex border-2 border-black py-1 px-12 rounded-lg'>
                {/* يمين (الصفحة الفردية) */}
                <img
                    className='h-[640px] max-w-[350px] mr-0'
                    src={`https://maknoon.com/quran/hafs/${pageNum}.svgz`}
                    alt={`صفحة رقم ${pageNum}`}
                />
                {/* يسار (الصفحة الزوجية) */}
                {pageNum < 604 && (
                    <img
                        className='h-[640px] max-w-[350px] mr-[50px]'
                        src={`https://maknoon.com/quran/hafs/${pageNum + 1}.svgz`}
                        alt={`صفحة رقم ${pageNum + 1}`}
                    />
                )}
            </div>

            {/* الـ Sidebar في الشاشات الكبيرة */}
            <div className='hidden sm:flex w-[290px] h-[650px] p-2.5 border-2 border-black rounded-lg flex-col justify-between'>
                <div>
                    <div className='flex items-center justify-between mb-4'>
                        <span>العودة للرئيسية</span>
                        <Link to='/'>
                            <IconButton size='large' aria-label='back-arrow'>
                                <ArrowBackIcon fontSize='inherit' color='secondary' />
                            </IconButton>
                        </Link>
                    </div>
                    <SurahSelect />
                </div>
                <div className='w-full p-2.5 flex items-center justify-between'>
                    <IconButton onClick={Prev} className='flex flex-row-reverse gap-1'>
                        <span>السابق</span>
                        <NavigateNextIcon />
                    </IconButton>
                    <IconButton onClick={Next} className='flex flex-row gap-1'>
                        <span>التالى</span>
                        <NavigateBeforeIcon />
                    </IconButton>
                </div>
            </div>

            {/* الـ Sidebar للموبايل */}
            <div className={`sm:hidden fixed top-0 left-0 w-9/12 h-full bg-white bg-opacity-60 z-40
            flex justify-center items-center transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className='w-full h-10/12 max-w-xs p-4 rounded-lg relative'>
                    <SurahSelect /> 
                </div>
            </div>
        </div>
    );
}

export default Quran;
