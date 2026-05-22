import { 
  WiHorizonAlt,   
  WiSunrise,      
  WiDaySunny,     
  WiDayCloudy,    
  WiSunset,       
  WiNightClear    
} from 'react-icons/wi';
import { useTimer } from '../../../contexts/TimerContext';

interface TimeCardProps {
  title: string;
  time: string;
  prayerKey: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
}

const PRAYER_CONFIG = {
  fajr: { Icon: WiHorizonAlt },
  sunrise: { Icon: WiSunrise }, 
  dhuhr: { Icon: WiDaySunny },
  asr: { Icon: WiDayCloudy },
  maghrib: { Icon: WiSunset },
  isha: { Icon: WiNightClear },
} as const;

export default function TimeCard({ title, time, prayerKey }: TimeCardProps) {
  const { nextPrayerKey } = useTimer();
  const config = PRAYER_CONFIG[prayerKey];
  const IconComponent = config ? config.Icon : WiNightClear;

  const isCurrentActive = nextPrayerKey?.toLowerCase() === prayerKey;

  if (isCurrentActive) {
    return (
      <div className="w-40 md:w-auto p-8 bg-[#1E3A8A] rounded-b-2xl flex flex-col items-center gap-4 border-2
      text-[#FFFBEB] shadow-xl -translate-y-0 md:-translate-y-4 relative overflow-hidden group select-none">
        <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
        
        <IconComponent className="scale-125 text-5xl w-10 h-10" />
        
        <div className="text-center relative z-10">
          <h3 className="font-label-md text-label-md uppercase tracking-widest mb-1">
            {title}
          </h3>
          <p className="font-headline-sm text-headline-sm font-bold text-2xl">
            {time}
          </p>
        </div>

        <div className="absolute top-3 right-3">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-fixed"></span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-40 md:w-auto p-6 bg-(--background) rounded-2xl flex flex-col items-center gap-4 
    border border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
    group cursor-pointer select-none">
      <IconComponent className="text-(--secondary) group-hover:text-primary transition-colors text-4xl w-9 h-9" />
      
      <div className="text-center">
        <h3 className="font-label-md text-label-md mb-1">
          {title}
        </h3>
        <p className="font-headline-sm text-headline-sm text-(--primary) font-medium text-xl">
          {time}
        </p>
      </div>
    </div>
  );
}