import { useTranslation } from 'react-i18next';
import { useTimer } from '../../../contexts/TimerContext';

export default function Timer() {
  const { loading, nextPrayerKey, diffTime } = useTimer();
  const { t } = useTranslation();

  return (
    <div className="flex items-baseline text-[#1E3A8A] gap-2 mx-auto md:mx-0 select-none">
      <h3 className="text-xl md:text-3xl  font-bold tracking-wide">
        {loading ? t('prayers.loading') : `${t('prayers.remaining')} ${t(`prayers.${nextPrayerKey}`)} :`}
      </h3>
      <h2 className="text-2xl md:text-3xl font-black text-primary font-mono tracking-tight min-w-[120px]">
        {loading ? '00:00:00' : diffTime}
      </h2>
    </div>
  );
}