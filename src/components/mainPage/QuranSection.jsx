import React from 'react'
// import Koran from '../Azkar/Icons/Koran.png'
import { Link } from 'react-router-dom'

function QuranSection() {
    return (
        <>
        <div className="w-full h-auto p-8 rounded-md bg-gray-200 shadow-md overflow-hidden flex flex-col items-center">
            <div
                className="w-[200px] h-[200px] bg-cover bg-center"
                style={{ backgroundImage: `url(${'/koran.png'})` }}
            ></div>
            <div className="p-2 w-full text-center">
                <p className='max-w-[700px] mx-auto mt-6'>القرآن الكريم هو كتاب الله الذي أنزل هداية ورحمة للعالمين. في هذا القسم يمكنك قراءة القرآن كاملًا، والاستماع إلى تلاوات خاشعة، والبحث في السور والآيات بسهولة تامة.</p>
                <Link to={'/Quran'} style={{ textDecoration: 'none' }}>
                    <h2 className='text-2xl cursor-pointer mt-12'>اضغط هنا</h2>
                </Link>
            </div>
        </div>
        </>
    )
}

export default QuranSection
