import React from 'react';

export default function Header({ 
  photoUrl = '/imagens/casal.jpg', 
  title = 'Fiado do Amor ❤️', 
  subtitle = 'Aqui a conta nunca fecha, mas o coração já fechou! 💘' 
}) {
  return (
    <header className="header">
      <div className="header-photo-wrapper">
        <img
          src={photoUrl}
          alt="Foto do Casal 💕"
          className="header-photo"
          onError={(e) => {
            // Fallback suave se a imagem não for encontrada
            e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop&crop=faces';
          }}
        />
      </div>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}
