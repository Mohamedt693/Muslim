import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    LuRadio, LuPlay, LuPause, LuSquare,
    LuVolume2, LuVolumeX, LuChevronRight, LuChevronLeft, LuSparkles
} from 'react-icons/lu';
import RadioDropdown from '../components/buttons/RadioDropdown';
import radioData from '../../src/assets/data/Ezaa.json';

export default function Radio() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    const stations = radioData.radios;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentStation = stations[currentIndex] || stations[0];

    const cleanName = (name: string) => {
        return name.replace(/[-_]/g, '').trim();
    };

    useEffect(() => {
        if (audioRef.current && currentStation) {
            audioRef.current.src = currentStation.url;
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            }
        }
    }, [currentIndex]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => setIsPlaying(false));
            setIsPlaying(true);
        }
    };

    const stopRadio = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleSelectStationById = (id: number) => {
        const targetIndex = stations.findIndex(s => s.id === id);
        if (targetIndex !== -1) {
            setCurrentIndex(targetIndex);
            setIsPlaying(true);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 text-start select-none space-y-8 animate-fade-in">
            {currentStation && <audio ref={audioRef} src={currentStation.url} preload="none" />}

            {/* Header */}
            <div className="space-y-1 border-b border-neutral-100 pb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/5 text-primary rounded-full text-xs font-bold">
                    <LuRadio className="w-3.5 h-3.5" />
                    {t('radioPage.live')}
                </span>
                <h1 className="font-serif text-2xl md:text-3xl text-primary font-bold">
                    {t('radioPage.title')}
                </h1>
            </div>

            <RadioDropdown 
                currentStationId={currentStation?.id || 0}
                onSelectStationById={handleSelectStationById}
                cleanName={cleanName}
                isRtl={isRtl}
            />

            <div className="w-full max-w-2xl mx-auto bg-white rounded-[40px] border border-neutral-200/70 p-8 md:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.04)] space-y-8 relative overflow-hidden">
                
                <div className="w-full bg-[#161B19] text-[#4ADE80] p-6 rounded-2xl border-2 border-[#242C29] shadow-inner font-mono relative overflow-hidden">
                    <div className="flex justify-between items-center text-[11px] uppercase tracking-widest text-[#4ADE80]/50 font-sans font-bold">
                        <span className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full bg-red-500 ${isPlaying ? 'animate-pulse' : 'opacity-30'}`}></span>
                            {isPlaying ? t('radioPage.tuning') : t('radioPage.standby')}
                        </span>
                        <span>
                            <LuSparkles className="w-3.5 h-3.5 inline ml-1" /> CH-{String(currentStation?.id || 0).padStart(2, '0')}
                        </span>
                    </div>

                    <div className="h-12 flex items-center mt-4 overflow-hidden relative">
                        <p className={`w-full text-lg md:text-xl font-serif font-medium whitespace-nowrap text-start ${isPlaying ? 'animate-[marquee_15s_linear_infinite]' : ''}`}>
                            {currentStation ? cleanName(currentStation.name) : '---'}
                        </p>
                    </div>

                    <div className="flex justify-between items-end mt-5 pt-3 border-t border-[#4ADE80]/10">
                        <div className="flex items-end gap-[4px] h-5">
                            {[0.4, 0.7, 1.0, 0.5, 0.8, 0.3, 0.6, 0.9].map((val, i) => (
                                <div 
                                    key={i} 
                                    className="w-[3.5px] bg-[#4ADE80] rounded-full"
                                    style={{ 
                                        height: isPlaying ? '100%' : '15%',
                                        transform: isPlaying ? `scaleY(${val + Math.sin(i * 1.5)})` : 'none',
                                        animation: isPlaying ? `pulse 0.5s ease-in-out infinite alternate ${i * 0.08}s` : 'none'                                    }}
                                ></div>
                            ))}
                        </div>
                        <span className="text-xs font-sans font-semibold tracking-wider text-[#4ADE80]/60">
                            FM {87.5 + (currentStation?.id || 0) * 0.4} MHz
                        </span>
                    </div>
                </div>

                <div className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-4 relative flex items-center overflow-hidden">
                    <div className="w-full flex justify-between text-[10px] text-neutral-300 font-sans font-bold absolute inset-x-0 top-1.5 px-6 pointer-events-none">
                        <span>88</span><span>92</span><span>96</span><span>100</span><span>104</span><span>108</span>
                    </div>
                    <div className="w-full h-6 flex justify-between items-end opacity-30 pt-3">
                        {Array.from({ length: 45 }).map((_, i) => (
                            <div key={i} className={`w-[1px] bg-neutral-500 ${i % 5 === 0 ? 'h-4 bg-neutral-700' : 'h-2'}`}></div>
                        ))}
                    </div>
                    <div 
                        className="absolute h-8 w-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-500 ease-out"
                        style={{ left: `${((currentIndex) / (stations.length - 1 || 1)) * 86 + 7}%` }}
                    >
                        <div className="w-2 h-2 bg-red-500 rounded-full -ml-[3px] -mt-[3px]"></div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={toggleMute}
                            className={`p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/60 hover:bg-neutral-100 transition-colors ${isMuted ? 'text-red-500' : 'text-neutral-500'}`}
                        >
                            {isMuted ? <LuVolumeX className="w-5 h-5" /> : <LuVolume2 className="w-5 h-5" />}
                        </button>
                        
                        <button 
                            onClick={stopRadio}
                            className={`p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/60 hover:bg-neutral-100 transition-colors ${!isPlaying ? 'text-red-500 border-red-100 bg-red-50/20' : 'text-neutral-400'}`}
                        >
                            <LuSquare className="w-5 h-5 fill-current" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setCurrentIndex((prev) => (prev - 1 + stations.length) % stations.length)}
                            className="p-3 text-neutral-500 hover:text-primary transition-colors bg-neutral-50 border border-neutral-200/60 rounded-2xl"
                        >
                            <LuChevronRight className={`w-5 h-5 ${isRtl ? '' : 'rotate-180'}`} />
                        </button>

                        <button 
                            onClick={togglePlay}
                            className={`w-20 h-20 rounded-full flex justify-center items-center text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isPlaying ? 'bg-(--primary) shadow-primary/20' : 'bg-[#161B19] shadow-neutral-900/10'}`}
                        >
                            {isPlaying ? <LuPause className="w-7 h-7 stroke-[2.5]" /> : <LuPlay className={`w-7 h-7 stroke-[2.5] ${isRtl ? 'translate-x-[-2px]' : 'translate-x-[2px]'}`} />}
                        </button>

                        <button 
                            onClick={() => setCurrentIndex((prev) => (prev + 1) % stations.length)}
                            className="p-3 text-neutral-500 hover:text-primary transition-colors bg-neutral-50 border border-neutral-200/60 rounded-2xl"
                        >
                            <LuChevronLeft className={`w-5 h-5 ${isRtl ? '' : 'rotate-180'}`} />
                        </button>
                    </div>

                    <div className="w-[108px] hidden sm:block"></div>
                </div>
            </div>
        </div>
    );
}