import React from 'react'
import { useState, useEffect } from 'react';

function DateAndTime({TimeZone, loading}) {
  const [currentTime, setCurrentTime] = useState('');
  // تحديث الوقت كل ثانية
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('ar-EG', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: TimeZone,
      });
      setCurrentTime(formatter.format(new Date()));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [TimeZone]);

  return (
    <div>
      <h3 className='text-xl font-semibold hidden md:block'>{`${loading === true ? "جارى التحميل" : currentTime}`}</h3>
    </div>
  )
}

export default DateAndTime;

