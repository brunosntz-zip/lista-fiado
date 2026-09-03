import React from 'react';

export default function Gallery({ photos = [] }) {
  if (!photos || photos.length === 0) return null;

  return (
    <section className="gallery-section">
      <h2>📸 Galeria do nosso amor</h2>
      <div className="gallery-grid">
        {photos.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Momento especial ${index + 1} 💕`} />
          </div>
        ))}
      </div>
    </section>
  );
}
