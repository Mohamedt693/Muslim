import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface DateAndTimeProps {
  TimeZone: string;
  loading: boolean;
}

function DateAndTime({ TimeZone, loading }: DateAndTimeProps) {
  const { i18n } = useTranslation();
  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    const updateTime = () => {
      const currentLang = i18n.language || 'ar';
      const localeWithExtension = currentLang.startsWith('ar') ? 'ar-EG-u-nu-latn' : currentLang;

      const dateFormatter = new Intl.DateTimeFormat(localeWithExtension, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: TimeZone,
      });

      const timeFormatter = new Intl.DateTimeFormat(localeWithExtension, {
        timeStyle: 'short',
        timeZone: TimeZone,
      });

      const now = new Date();
      setDateTime({
        date: dateFormatter.format(now),
        time: timeFormatter.format(now),
      });
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [TimeZone, i18n.language]);

  if (loading) {
    return (
      <div className="animate-pulse flex items-center gap-3 text-start">
        <div className="h-6 w-16 bg-primary/10 rounded"></div>
        <div className="h-5 w-4 bg-primary/10 rounded"></div>
        <div className="h-6 w-48 bg-primary/10 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-3 text-start select-none 
    font-headline-md text-xl md:text-2xl font-semibold text-(--primary) tracking-tight">
      {/* current time */}
      <span className="text-(--secondary)">
        {dateTime.time}
      </span>
      
      {/* divider */}
      <span className="font-light">|</span>
      
      {/* full date */}
      <span>
        {dateTime.date}
      </span>
    </div>
  );
}

export default DateAndTime;