import React from "react";
import '../../../App.css'
// Components
import TimeCard from "./TimeCard";
import Timer from "./Timer";

function PrayerTime({ prayerTime, loading, TimeZone }) {
  if (!prayerTime) return <div>Loading...</div>;

  return (
    <div data-testid="timer-wrapper" className="flex justify-center items-center text-end mt-12">
      <div className="flex flex-col items-center px-4">
        <div className="flex justify-between items-center w-full mb-4">
          <h1 className="hidden md:block text-2xl font-bold">مواقيت الصلاة</h1>
          <Timer
            loading={loading}
            TimeZone={TimeZone}
            prayerTime={prayerTime}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 ">
          <TimeCard title={"العشاء"} time={prayerTime?.Isha || "--:--"} />
          <TimeCard title={"المغرب"} time={prayerTime?.Maghrib || "--:--"} />
          <TimeCard title={"العصر"} time={prayerTime?.Asr || "--:--"} />
          <TimeCard title={"الظهر"} time={prayerTime?.Dhuhr || "--:--"} />
          <TimeCard title={"الضحى"} time={prayerTime?.Sunrise || "--:--"} />
          <TimeCard title={"الفجر"} time={prayerTime?.Fajr || "--:--"} />
        </div>
      </div>
    </div>
  );
}

export default PrayerTime;
