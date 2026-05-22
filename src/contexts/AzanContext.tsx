import { createContext, useContext, useRef, ReactNode, useEffect, useMemo } from 'react';
import moment from 'moment-timezone';
import toast, { Toaster } from 'react-hot-toast';
import AzanAudio from '../assets/data/Azan-audio.mp3';
import AzanToastContent from '../components/Azan/AzanToastContent';
import { usePrayer } from './PrayerContext';

interface AzanContextType {
    playAzanSound: () => void;
    stopAzanSound: () => void;
}

const AzanContext = createContext<AzanContextType | undefined>(undefined);

export function AzanProvider({ children }: { children: ReactNode }) {
    const { prayerTime, timeZone } = usePrayer();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lastTriggered = useRef<string | null>(null);

    const playAzanSound = () => {
        audioRef.current?.play().catch(e => console.log(e));
    };

    const stopAzanSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const triggerToast = (prayerKey: string) => {
        toast.custom((toastObj) => (
            <AzanToastContent prayerKey={prayerKey} toastObj={toastObj} />
        ), { duration: 60000 });
    };

    useEffect(() => {
        if (!prayerTime || !timeZone) return;

        const interval = setInterval(() => {
            const now = moment().tz(timeZone).format("HH:mm");
            const currentPrayerKey = Object.keys(prayerTime).find(key => prayerTime[key] === now);

            if (currentPrayerKey && lastTriggered.current !== `${now}-${currentPrayerKey}`) {
                triggerToast(currentPrayerKey);
                playAzanSound(); 
                lastTriggered.current = `${now}-${currentPrayerKey}`;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [prayerTime, timeZone]);

    const value = useMemo(() => ({ playAzanSound, stopAzanSound }), []);

    return (
        <AzanContext.Provider value={value}>
            <Toaster position="top-center" />
            <audio ref={audioRef} src={AzanAudio} preload="auto" />
            {children}
        </AzanContext.Provider>
    );
}

export const useAzan = () => {
    const context = useContext(AzanContext);
    if (!context) throw new Error('useAzan must be used within AzanProvider');
    return context;
};