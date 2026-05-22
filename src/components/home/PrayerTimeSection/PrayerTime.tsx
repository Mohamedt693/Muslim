// contexts
import { useTranslation } from 'react-i18next';
import { usePrayer } from '../../../contexts/PrayerContext';
// ui components
import CityDropdownBtn from '../../buttons/CityDropdownBtn';
import TimeCard from './TimeCard';
import Timer from './Timer';
import DateAndTime from './DateAndTime';
import Skeleton from '../../ui/Skeleton';

export default function PrayerTime() {
  const { t } = useTranslation();
  const { prayerTime, loading } = usePrayer();

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto py-6 animate-pulse">
        <div className="flex justify-between mb-12 h-12">
          <Skeleton className="w-40" />
          <Skeleton className="w-32" />
        </div>

        <div className="w-full bg-white rounded-[4rem] shadow-lg p-16 flex flex-col items-center gap-12">
          <Skeleton className="w-64 h-20" /> 
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 w-full">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="timer-wrapper" className="max-w-[1200px] mx-auto py-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <CityDropdownBtn />
        <DateAndTime TimeZone="Asia/Riyadh" loading={loading} />
      </div>

      <div className="relative w-full bg-white rounded-[4rem] shadow-lg overflow-hidden">
        <div className="relative z-10 p-8 md:p-16 flex flex-col items-center">
          <div className="w-full max-w-3xl aspect-[4/1] flex flex-col items-center justify-center relative">
          
            <div className="relative text-center">
              <span className="font-label-md text-label-md text-(--secondary) tracking-[0.2em] uppercase mb-4 block">
                {t('prayers.next_prayer')}
              </span>

              <Timer />

              <p className="mt-8 max-w-sm mx-auto">
                {t('prayers.hadith')}
              </p>
            </div>
          </div>

          <div className="w-full mt-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6">
              <TimeCard 
                title={t('prayers.Fajr')} 
                time={prayerTime?.Fajr || "--:--"} 
                prayerKey="fajr" 
              />
              <TimeCard 
                title={t('prayers.Sunrise')} 
                time={prayerTime?.Sunrise || "--:--"} 
                prayerKey="sunrise" 
              />
              <TimeCard 
                title={t('prayers.Dhuhr')} 
                time={prayerTime?.Dhuhr || "--:--"} 
                prayerKey="dhuhr" 
              />
              <TimeCard 
                title={t('prayers.Asr')} 
                time={prayerTime?.Asr || "--:--"} 
                prayerKey="asr" 
              />
              <TimeCard 
                title={t('prayers.Maghrib')} 
                time={prayerTime?.Maghrib || "--:--"} 
                prayerKey="maghrib" 
              />
              <TimeCard 
                title={t('prayers.Isha')} 
                time={prayerTime?.Isha || "--:--"} 
                prayerKey="isha" 
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}