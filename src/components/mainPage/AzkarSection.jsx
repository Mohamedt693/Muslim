import React from 'react'
import '../../App.css'
//Icons
import beads from '../Azkar/Icons/beads.png'
import Day from '../Azkar/Icons/day-mode.png'
import night from '../Azkar/Icons/night.png'
import shalat from '../Azkar/Icons/shalat.png'
import sleep from '../Azkar/Icons/sleep.png'
import wakeup from '../Azkar/Icons/wake-up.png'
// components
import AzkarContainer from '../Azkar/AzkarContainer'

function AzkarSection() {
    return (
        <div className="w-full flex justify-center items-center p-12 rounded-md bg-[#785391]">
            <div className='grid grid-cols-2 md:grid-cols-3 gap-20'>
                <AzkarContainer to={'/MorningAzkar'} title={"اذكار الصباح"} icon={Day}/>
                <AzkarContainer to={'/NightAzkar'} title={"اذكار المساء"} icon={night}/>
                <AzkarContainer to={'/PrayerAzkar'} title={"اذكار بعد الصلاة"} icon={shalat}/>
                <AzkarContainer to={'/SleepingAzkar'} title={"اذكار قبل النوم"} icon={sleep}/>
                <AzkarContainer to={'/WakeupAzkar'} title={"اذكار الاستيقاظ"} icon={wakeup}/>
                <AzkarContainer to={'/Tasbeeh'} title={"تسابيح"} icon={beads}/>

            </div>
        </div>
    )
}

export default AzkarSection
