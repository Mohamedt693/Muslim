import React from "react";
import "./App.css";
// azkar pages
import MainPage from "./components/mainPage/mainContent";
import Quran from "./components/Quran/Quran";
import Morningazkar from "./components/Azkar/MorningAzkar";
import Nightazkar from "./components/Azkar/NightAzkar";
import Wakeupazkar from "./components/Azkar/wakeupAzkar";
import Sleepingazkar from "./components/Azkar/SleepingAzkar";
import Prayerazkar from "./components/Azkar/PrayerAzkar";
import Tasbeeh from "./components/Azkar/Tasbeeh";
// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Scroll to top
import ScrollToTop from "./ScrollToTop";


function App() {
  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto pt-4 px-4">
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Quran" element={<Quran />} />
                <Route path="/Morningazkar" element={<Morningazkar />} />
                <Route path="/Nightazkar" element={<Nightazkar />} />
                <Route path="/Wakeupazkar" element={<Wakeupazkar />} />
                <Route path="/Sleepingazkar" element={<Sleepingazkar />} />
                <Route path="/Prayerazkar" element={<Prayerazkar />} />
                <Route path="/Tasbeeh" element={<Tasbeeh />} />
              </Routes>
            </BrowserRouter>
      </div>
    </>
  );
}

export default App;
