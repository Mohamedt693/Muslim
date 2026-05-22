import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
// navbar pages
import Home from "./pages/Home";
import Azkar from "./pages/Azkar";
import AzkarSection from "./components/Azkar/AzkarSection";
import Doaa from "./pages/Doaa";
import DoaaSection from "./components/Doaa/DoaaSection";
import Hadith from "./pages/Hadith";
import HadithSection from "./components/Hadith/HadithSection";
import Radio from "./pages/Radio";
import QuranRead from "./pages/QuranRead";
import QuranListen from "./pages/QuranListen";
// static pages
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <main
        className="w-full min-h-screen bg-gradient-to-b py-12 
      from-[#F8F3DC] via-[#FAF6E5] to-[#FDFBEE] pt-4 px-4 text-neutral-900 dark:text-neutral-50"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quran-read" element={<QuranRead />} />
          <Route path="/quran-listen" element={<QuranListen />} />

          <Route path="/azkar" element={<Azkar />}>
            <Route path=":category" element={<AzkarSection />} />
          </Route>

          <Route path="/doaa" element={<Doaa />}>
            <Route path=":category" element={<DoaaSection />} />
          </Route>

          <Route path="/hadith" element={<Hadith />}>
            <Route path=":id" element={<HadithSection />} />
          </Route>

          <Route path="/radio" element={<Radio />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
