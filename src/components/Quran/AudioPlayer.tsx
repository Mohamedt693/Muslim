import { useState } from 'react';
import AudioPlayerComponent from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; 
import surahs from '../../assets/data/surahs.json';
import reciters from '../../assets/data/reciters.json';
import { useTranslation } from 'react-i18next';

export default function AudioPlayer() {
  const { t } = useTranslation();

  const [selectedReciter, setSelectedReciter] = useState(reciters[0]);
  const [currentSurahIndex, setCurrentSurahIndex] = useState<number>(0);

  const currentSurah = surahs[currentSurahIndex];
  const formattedSurahNum = currentSurah.id.toString().padStart(3, '0');
  const audioUrl = `${selectedReciter.server}/${formattedSurahNum}.mp3`;

  const nextSurah = () => {
    if (currentSurahIndex < surahs.length - 1) {
      setCurrentSurahIndex(prev => prev + 1);
    }
  };

  const prevSurah = () => {
    if (currentSurahIndex > 0) {
      setCurrentSurahIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-100 rounded-2xl p-6 lg:p-10 flex flex-col items-center">
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-[11px] font-bold text-neutral-400 mb-2 mr-1">{t('audioPlayer.reciterLabel')}</label>
            <select 
              value={selectedReciter.id} 
              onChange={(e) => {
                const reciter = reciters.find(r => r.id === e.target.value);
                if (reciter) setSelectedReciter(reciter);
              }}
              className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500/20 transition-all dark:text-white"
            >
              {reciters.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-400 mb-2 mr-1">{t('audioPlayer.chooseSurah')}</label>
            <select 
              value={currentSurahIndex} 
              onChange={(e) => setCurrentSurahIndex(parseInt(e.target.value, 10))}
              className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500/20 transition-all dark:text-white"
            >
              {surahs.map((s, index) => (
                <option key={s.id} value={index}>{parseInt(s.id.toString(), 10)}. {s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
            {t('audioPlayer.surahLabel')} {currentSurah?.name}
          </h2>
          <p className="text-xs text-neutral-400">
            {currentSurah?.type === "مكية" ? t('audioPlayer.meccan') : t('audioPlayer.medinan')}
          </p>
        </div>

        <div className="w-full custom-audio-player" dir="ltr">
          <AudioPlayerComponent
            src={audioUrl}
            showSkipControls={true}
            showJumpControls={false}
            onClickNext={nextSurah}
            onClickPrevious={prevSurah}
            onEnded={nextSurah}
            autoPlayAfterSrcChange={true}
            className="rounded-2xl border border-neutral-100 shadow-sm !bg-neutral-50"
          />
        </div>

      </div>
    </div>
  );
}