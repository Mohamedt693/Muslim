import * as React from "react";
import Divider from "@mui/material/Divider";
// components
import AzanPage from "../Azan/AzanPage";
import Header from "./HeaderSection/Header";
import PrayerTime from "./PrayerTimeSection/PrayerTime";
import AzkarSection from "./AzkarSection";
import QuranSection from "./QuranSection";
import MosqueMap from "./MosqueMap";
// react Hooks
import { useEffect } from "react";
// Zustand
import { useStore } from "../../Zustand/store";
// Moment Liberary
import moment from "moment-timezone";
import "moment/locale/ar";
moment.locale("ar");

export default function MainPage() {
    const {TimeZone, prayerTime, loading, fetchPrayerTimes, city} = useStore();

    useEffect(() => {
        fetchPrayerTimes(city);
    }, [city, fetchPrayerTimes]);

    return (
    <div >
        <AzanPage
            Fajr={`${prayerTime.Fajr}:00`}
            Dhuhr={`${prayerTime.Dhuhr}:00`}
            Asr={`${prayerTime.Asr}:00`}
            Maghrib={`${prayerTime.Maghrib}:00`}
            Isha={`${prayerTime.Isha}:00`}
            PrayerTime={PrayerTime}
        />
        <Header loading={loading} TimeZone={TimeZone} />
        <Divider />
        <PrayerTime prayerTime={prayerTime} loading={loading} TimeZone={TimeZone}/>
        <h1 className="w-full  text-center text-3xl font-semibold mb-5 mt-25">الاذكار</h1>
        <AzkarSection />
        <h1 className="w-full  text-center text-3xl font-semibold mb-5 mt-25">القران الكريم</h1>
        <QuranSection />
        <h1 className="w-full  text-center text-3xl font-semibold mb-5 mt-25">اقرب مسجد اليك</h1>
        <div className="relative right-1/2 mr-[-50vw] w-screen">
            <MosqueMap />
        </div>
    </div>
    );
}
