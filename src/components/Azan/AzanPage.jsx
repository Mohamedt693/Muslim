import React, { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import toast, { Toaster } from 'react-hot-toast';
import Azan from './Azan.mp3';

function AzanPage({ Fajr, Dhuhr, Asr, Maghrib, Isha }) {
    const audioRef = useRef(null);
    const [lastAzanTime, setLastAzanTime] = useState(null);

    const handleAzan = (prayerName) => {
        toast.custom((t) => (
            <div className="rounded-xl shadow-md p-4 w-[330px] text-center bg-white text-black ">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-lg font-bold"> حان الآن موعد أذان {prayerName}</p>
                    <button
                    onClick={() => {
                        toast.dismiss(t.id);
                        audioRef.current.pause();
                    }}
                    className=" text-black text-2xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <button
                    onClick={() => audioRef.current.play()}
                    className="mt-3 bg-white shadow-md text-black py-2 px-4 rounded-md cursor-pointer"
                    >
                        ▶️ تشغيل الأذان
                    </button>
                    <button
                    onClick={() => audioRef.current.pause()}
                    className="mt-3 bg-white shadow-md text-black py-2 px-4 rounded-md cursor-pointer"
                    >
                        ⏹️ ايقاف الأذان
                    </button>
                </div>
            </div>
        ), { duration: 8000 });
        setLastAzanTime(moment().format("HH:mm:ss"));
    };


    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment().format("HH:mm:ss");

            if (now === Fajr && now !== lastAzanTime) {
                handleAzan("الفجر");
            } else if (now === Dhuhr && now !== lastAzanTime) {
                handleAzan("الظهر");
            } else if (now === Asr && now !== lastAzanTime) {
                handleAzan("العصر");
            } else if (now === Maghrib && now !== lastAzanTime) {
                handleAzan("المغرب");
            } else if (now === Isha && now !== lastAzanTime) {
                handleAzan("العشاء");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [Fajr, Dhuhr, Asr, Maghrib, Isha, lastAzanTime]);

    return (
        <div>
            <Toaster position="top-center" />
            <audio ref={audioRef} src={Azan} />
        </div>
    );
}

export default AzanPage;
