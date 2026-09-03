import React, { useState, useRef } from 'react';

export default function MusicPlayer({ audioSrc = '/audio/nossa-musica.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay ou carregamento de áudio impedido:', err);
      });
    }
  };

  return (
    <>
      <div id="music-player" onClick={toggleMusic} title="Tocar / Pausar trilha sonora">
        <button
          id="music-btn"
          className={isPlaying ? 'playing' : ''}
          aria-label="Tocar/Pausar música"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <span id="music-label">Nossa música 🎶</span>
      </div>

      <audio
        ref={audioRef}
        loop
        src={audioSrc}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
}
