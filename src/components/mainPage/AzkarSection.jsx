import React from 'react'
import '../../App.css'
//Icons
// import beads from '/beads.png'
// import Day from 'day-mode.png'
// import night from '/night.png'
// import shalat from '/shalat.png'
// import sleep from '/sleep.png'
// import wakeup from '/wake-up.png'
// components
import AzkarContainer from '../Azkar/AzkarContainer'

function AzkarSection() {
    return (
        <div className="w-full flex justify-center items-center p-12 rounded-md bg-[#785391]">
            <div className='grid grid-cols-2 md:grid-cols-3 gap-20'>
                <AzkarContainer to={'/MorningAzkar'} title={"اذكار الصباح"} icon={'/day-mode.png'}/>
                <AzkarContainer to={'/NightAzkar'} title={"اذكار المساء"} icon={'/night.png'}/>
                <AzkarContainer to={'/PrayerAzkar'} title={"اذكار بعد الصلاة"} icon={'/shalat.png'}/>
                <AzkarContainer to={'/SleepingAzkar'} title={"اذكار قبل النوم"} icon={'/sleep.png'}/>
                <AzkarContainer to={'/WakeupAzkar'} title={"اذكار الاستيقاظ"} icon={'/wake-up.png'}/>
                <AzkarContainer to={'/Tasbeeh'} title={"تسابيح"} icon={'/beads.png'}/>

            </div>
        </div>
    )
}

export default AzkarSection
