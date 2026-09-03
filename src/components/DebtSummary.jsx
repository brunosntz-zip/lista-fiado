import React from 'react';

export default function DebtSummary({ items }) {
  const totalGeral = items.reduce((sum, item) => sum + item.valorAtual, 0);
  const totalPago = items.filter(item => item.pago).reduce((sum, item) => sum + item.valorAtual, 0);
  const totalDevendo = Math.max(0, totalGeral - totalPago);
  const percentPago = totalGeral > 0 ? (totalPago / totalGeral) * 100 : 0;

  const formatMoney = (val) => `R$ ${val.toFixed(2).replace('.', ',')}`;

  let emoji = '💕';
  let subtitleText = 'em beijos, carinhos e mimos pendentes';

  if (percentPago >= 100 && totalGeral > 0) {
    emoji = '🎉';
    subtitleText = 'ZEROU! Tá livre de dívidas.';
  } else if (percentPago >= 50) {
    emoji = '🥰';
  } else if (percentPago >= 25) {
    emoji = '😊';
  } else if (percentPago === 0) {
    emoji = '😤';
  }

  return (
    <div className="summary-card">
      <h2>💸 Total que você me deve:</h2>
      <div className="total-value">{formatMoney(totalDevendo)}</div>
      <div className="total-label">{subtitleText}</div>

      <div className="progress-container">
        <div className="progress-label">
          <span>{percentPago === 0 ? 'Pagou nadinha 😤' : 'Progresso de quitação'}</span>
          <span>{Math.round(percentPago)}% quitado</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.max(3, Math.min(100, percentPago))}%` }}
          >
            <span className="progress-emoji">{emoji}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
