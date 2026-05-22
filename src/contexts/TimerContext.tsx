import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import moment from 'moment-timezone';
import { usePrayer } from './PrayerContext';

interface TimerContextType {
    nextPrayerKey: string;
    diffTime: string;
    loading: boolean;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
    const { prayerTime, timeZone, loading } = usePrayer();
    const [diffTime, setDiffTime] = useState<string>("");
    const [nextPrayerKey, setNextPrayerKey] = useState<string>("");

    useEffect(() => {
        if (loading || !prayerTime || !timeZone) {
            setDiffTime("");
            setNextPrayerKey("");
            return;
        }

        const updateTimer = () => {
            const { Fajr, Dhuhr, Asr, Maghrib, Isha, Sunrise } = prayerTime;
            const now = moment().tz(timeZone);
            const todayDate = now.format('YYYY-MM-DD');

            const prayersArray = [
                { key: 'Fajr', time: Fajr },
                { key: 'Sunrise', time: Sunrise },
                { key: 'Dhuhr', time: Dhuhr },
                { key: 'Asr', time: Asr },
                { key: 'Maghrib', time: Maghrib },
                { key: 'Isha', time: Isha },
            ].map(prayer => ({
                ...prayer,
                moment: moment.tz(`${todayDate} ${prayer.time}`, 'YYYY-MM-DD HH:mm', timeZone),
            }));

            let nextPrayer = prayersArray.find(prayer => now.isBefore(prayer.moment));

            if (!nextPrayer) {
                const tomorrow = now.clone().add(1, 'day');
                nextPrayer = {
                    key: 'Fajr',
                    time: Fajr,
                    moment: moment.tz(`${tomorrow.format('YYYY-MM-DD')} ${Fajr}`, 'YYYY-MM-DD HH:mm', timeZone),
                };
            }

            const diff = moment.duration(nextPrayer.moment.diff(now));

            if (diff.asSeconds() <= 1 && diff.asSeconds() > 0) {
                new Audio('/audio/azan.mp3').play().catch(e => console.log(e));
            }

            const formatted = [
                String(diff.hours()).padStart(2, '0'),
                String(diff.minutes()).padStart(2, '0'),
                String(diff.seconds()).padStart(2, '0'),
            ].join(':');

            setDiffTime(formatted);
            setNextPrayerKey(nextPrayer.key);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [prayerTime, timeZone, loading]);

    const value = useMemo(() => ({ nextPrayerKey, diffTime, loading }), [nextPrayerKey, diffTime, loading]);

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    const context = useContext(TimerContext);
    if (!context) throw new Error('useTimer must be used within a TimerProvider');
    return context;
}