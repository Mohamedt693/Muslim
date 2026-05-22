// ui components
import PrayerTime from '../components/home/PrayerTimeSection/PrayerTime'
import DailyHadith from '../components/home/quickCards/DailyHadith'
import DailyVerse from '../components/home/quickCards/DailyVerse'
import NearbyMosques from '../components/home/quickCards/NearbyMosques';
import TelegramBotCard from '../components/home/quickCards/TelegramBotCard';

function Home() {
  return (
    <main className="w-full flex flex-col gap-12 items-center">
      
      <section className="w-full">
        <PrayerTime />
      </section>

      <div className="w-full max-w-lg md:max-w-xl my-24 flex justify-center">
        <img 
          src="/iqraa.png" 
          alt="إقرأ" 
          className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-md"
          loading="eager"
        />
      </div>

      <section className="w-full">
        <TelegramBotCard />
      </section>
  
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <DailyVerse />
        <DailyHadith />
      </section>

      <section className="w-full max-w-6xl mx-auto">
        <NearbyMosques /> 
      </section>

    </main>
  );
}

export default Home;