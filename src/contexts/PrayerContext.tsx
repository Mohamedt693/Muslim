import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { prayerService, type PrayerTimes } from '../services/prayerService';

export interface CityData {
    displayName: string;
    cityName: string;
    code: string;
}

interface PrayerContextType {
    city: CityData;
    setCity: (city: CityData) => void;
    prayerTime: PrayerTimes | null;
    timeZone: string;
    loading: boolean;
    error: string | null;
}

const PrayerContext = createContext<PrayerContextType | undefined>(undefined);

export function PrayerProvider({ children }: { children: ReactNode }) {
    const [city, setCity] = useState<CityData>({
        displayName: "القاهرة",
        cityName: "cairo",
        code: "EG",
    });
    const [prayerTime, setPrayerTime] = useState<PrayerTimes | null>(null);
    const [timeZone, setTimeZone] = useState<string>("Africa/Cairo");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await prayerService.getTimesByCity(city.cityName, city.code);
                
                setPrayerTime(data.timings);
                setTimeZone(data.meta.timezone);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
    }, [city]);

    return (
        <PrayerContext.Provider value={{ city, setCity, prayerTime, timeZone, loading, error }}>
            {children}
        </PrayerContext.Provider>
    );
}

export function usePrayer() {
    const context = useContext(PrayerContext);
    if (context === undefined) {
        throw new Error('usePrayer must be used within a PrayerProvider');
    }
    return context;
}