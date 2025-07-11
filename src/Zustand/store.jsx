import { create } from "zustand";
import axios from "axios";

export const useStore = create((set) => ({
    TimeZone: "Africa/Cairo",
    prayerTime: {},
    loading: true,
    error: null,
    city: {
        displayName: "القاهرة",
        cityName: "cairo",
        code: "EG",
    },
    setCity: (cityData) => set({ city: cityData }),
    surah: [],

    // Action: fetch prayer times
    fetchPrayerTimes: async (city) => {
        set({ loading: true, error: null });

    try {
        const res = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city.cityName}&country=${city.code}`,
        { signal: AbortSignal.timeout(10000) }
        );

        set({
            prayerTime: res.data.data.timings,
            TimeZone: res.data.data.meta.timezone,
        });

        // simulate delay
        setTimeout(() => {
            set({ loading: false });
        }, 1000);

        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Action: fetch Surah
    fetchSurah: async () => {
        try {
            const response = await axios.get("https://api.alquran.cloud/v1/surah",
                { signal: AbortSignal.timeout(10000) });
            set({ surah: response.data.data });
        } catch (error) {
            set({ error: error.message });
        }
    },
}));