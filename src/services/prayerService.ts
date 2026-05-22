import axios from 'axios';

export interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string;
}

export interface ApiResponse {
    timings: PrayerTimes;
    meta: {
        timezone: string;
    };
}

export const prayerService = {
    getTimesByCity: async (city: string, country: string): Promise<ApiResponse> => {
        const response = await axios.get<{ data: ApiResponse }>(
            `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`,
            { signal: AbortSignal.timeout(10000) }
        );
        
        if (!response.data?.data) {
            throw new Error('فشل في جلب البيانات من السيرفر');
        }
        
        return response.data.data;
    }
};