import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment-timezone';

function Timer({ loading, prayerTime, TimeZone }) {
  const [diffTime, setDiffTime] = useState('');
  const [nextPrayerName, setNextPrayerName] = useState('');

  const updateTimer = useCallback(() => {
    const { Fajr, Dhuhr, Asr, Maghrib, Isha } = prayerTime || {};
    if (!Fajr || !Dhuhr || !Asr || !Maghrib || !Isha) return;

    const now = moment().tz(TimeZone);
    const todayDate = now.format('YYYY-MM-DD');

    const prayersArray = [
      { key: 'Fajr', displayName: 'الفجر', time: Fajr },
      { key: 'Dhuhr', displayName: 'الظهر', time: Dhuhr },
      { key: 'Asr', displayName: 'العصر', time: Asr },
      { key: 'Maghrib', displayName: 'المغرب', time: Maghrib },
      { key: 'Isha', displayName: 'العشاء', time: Isha },
    ].map(prayer => ({
      ...prayer,
      moment: moment.tz(
        `${todayDate} ${prayer.time}`,
        'YYYY-MM-DD HH:mm',
        TimeZone
      ),
    }));

    let nextPrayer = prayersArray.find(prayer => now.isBefore(prayer.moment));

    if (!nextPrayer) {
      const tomorrow = now.clone().add(1, 'day');
      const fajrMoment = moment.tz(
        `${tomorrow.format('YYYY-MM-DD')} ${Fajr}`,
        'YYYY-MM-DD HH:mm',
        TimeZone
      );
      nextPrayer = {
        key: 'Fajr',
        displayName: 'الفجر',
        moment: fajrMoment,
      };
    }

    const diff = moment.duration(nextPrayer.moment.diff(now));
    const formatted = [
      String(diff.hours()).padStart(2, '0'),
      String(diff.minutes()).padStart(2, '0'),
      String(diff.seconds()).padStart(2, '0'),
    ].join(':');

    setDiffTime(formatted);
    setNextPrayerName(nextPrayer.displayName);
  }, [prayerTime, TimeZone]);

  useEffect(() => {
    if (!prayerTime || !TimeZone) return;

    updateTimer(); // تنفيذ مباشر أول مرة
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer, prayerTime, TimeZone]);

  return (
    <div className='flex items-center justify-between gap-4 mx-auto md:mx-0'>
      <h3 className='text-lg font-semibold'>{`متبقي حتى صلاة ${loading ? 'جارى التحميل' : nextPrayerName}`}</h3>
      <h2 className='text-lg font-semibold'>{loading ?  'جارى التحميل' : diffTime}</h2>
    </div>
  );
}

export default Timer;
