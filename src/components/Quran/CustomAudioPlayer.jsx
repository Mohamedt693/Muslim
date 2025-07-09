import React, { useRef, useState, useEffect } from 'react';

export default function CustomAudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // لتحويل الثواني إلى صيغة دقيقة:ثانية
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      style={{
        maxWidth: 400,
        width: '100%',
        padding: 20,
        marginTop: "20px",
        borderRadius: 12,
        background: '#f9f9f9',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'sans-serif',
      }}
    >
      <audio ref={audioRef} src={src} />

      <button
        onClick={togglePlay}
        style={{
          width: "100%",
          background: isPlaying ? '#d33' : '#2d89ef',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '10px 18px',
          fontSize: 16,
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
      >
        {isPlaying ? '⏸️ إيقاف مؤقت' : '▶️ تشغيل'}
      </button>

      <div
        style={{
          marginTop: 16,
          background: '#ddd',
          height: 10,
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#2d89ef',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* ✅ التايمر */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          color: '#333',
          marginTop: 6,
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
