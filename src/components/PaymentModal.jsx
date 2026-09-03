import React, { useState, useEffect } from 'react';

export default function PaymentModal({ modalData, onClose, onConfirmPaymentWithDate }) {
  // Padrão: amanhã
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [note, setNote] = useState('');

  // Hoje no formato YYYY-MM-DD para o min do input
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!modalData) return null;

  const isDatePrompt = modalData.type === 'date_prompt';

  const setQuickDate = (daysToAdd) => {
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const setNextWeekend = () => {
    const d = new Date();
    const day = d.getDay(); // 0 = Domingo, 6 = Sábado
    const diff = (6 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleSubmitDate = (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    // Converte YYYY-MM-DD para DD/MM/AAAA
    const [year, month, day] = selectedDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    onConfirmPaymentWithDate(modalData.itemId, formattedDate, note);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        {modalData.image && (
          <img
            src={modalData.image}
            alt="Comprovante do Amor"
            onError={(e) => {
              e.target.src = '/imagens/recibo.jpg';
            }}
          />
        )}
        <h3>{modalData.title}</h3>
        <p>{modalData.text}</p>

        {isDatePrompt ? (
          <form onSubmit={handleSubmitDate}>
            <div className="date-picker-box">
              <label htmlFor="payment-date" className="date-picker-label">
                📅 Escolha a data exata do pagamento:
              </label>

              <input
                id="payment-date"
                type="date"
                className="modal-date-input"
                value={selectedDate}
                min={todayStr}
                required
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <div className="quick-date-row">
                <button
                  type="button"
                  className={`quick-date-btn ${selectedDate === todayStr ? 'active' : ''}`}
                  onClick={() => setQuickDate(0)}
                >
                  Hoje! 🏃‍♀️
                </button>
                <button
                  type="button"
                  className="quick-date-btn"
                  onClick={() => setQuickDate(1)}
                >
                  Amanhã 🥺
                </button>
                <button
                  type="button"
                  className="quick-date-btn"
                  onClick={setNextWeekend}
                >
                  Fim de semana 💕
                </button>
                <button
                  type="button"
                  className="quick-date-btn"
                  onClick={() => setQuickDate(7)}
                >
                  Semana que vem 📅
                </button>
              </div>

              <input
                type="text"
                className="modal-note-input"
                placeholder="Observação (Ex: ai amor, quando vc chegar vou fazer tal coisa...)"
                value={note}
                maxLength={60}
                onChange={(e) => setNote(e.target.value)}
              />

            </div>

            <button type="submit" className="btn btn-pay">
              ✍️ Assinar Termo e Quitar com 👌🏼
            </button>
          </form>
        ) : (
          <button className="btn btn-pay" onClick={onClose}>
            {modalData.buttonText || 'Eitcha joãaaaaao'}
          </button>
        )}
      </div>
    </div>
  );
}
