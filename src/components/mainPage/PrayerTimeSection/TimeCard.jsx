import * as React from 'react';

export default function TimeCard({title, time}){
    return(
        <div className='w-[140px] h-[200px] lg:w-[180px] lg:h-[280px] shadow-md rounded-2xl text-white border border-black
        bg-[url(/background.jpg)]  bg-cover bg-no-repeat flex flex-col items-center justify-center gap-2'>
            <h5 className='text-3xl'>{title}</h5>
            <h3 className='text-2xl'>{time}</h3>
        </div>
    )
}