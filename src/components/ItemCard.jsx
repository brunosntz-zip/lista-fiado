import React from 'react';

export default function ItemCard({ item, index, onToggleVisibility, onPay, onInstallment }) {
  const formatMoney = (val) => `R$ ${val.toFixed(2).replace('.', ',')}`;

  const nomeDisplay = item.visivel ? item.nome : '•••••••••••••';
  const valorDisplay = item.visivel ? formatMoney(item.valorAtual) : '••••••';
  const hiddenClass = item.visivel ? '' : ' hidden-content';
  const eyeIcon = item.visivel ? '👁️' : '🙈';

  const isUrgente = item.tag === 'urgente';

  return (
    <div
      className={`item-card ${item.pago ? 'paid' : ''}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {item.pago && <div className="paid-badge">✅ QUITADO COM 👌🏼</div>}

      <div className="item-top">
        {item.foto && (
          <img
            src={item.foto}
            alt="Foto do item"
            className="item-photo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        <div className="item-info">
          <div className="item-header">
            <span className={`item-name${hiddenClass}`}>
              {nomeDisplay}
            </span>

            <span className={`item-tag ${isUrgente ? 'tag-urgente' : 'tag-pirracada'}`}>
              {isUrgente ? '🔥 Urgente' : '😤 Pirraçada'}
            </span>

            <button
              className="eye-btn"
              onClick={() => onToggleVisibility(item.id)}
              title={item.visivel ? 'Esconder item' : 'Mostrar item'}
              aria-label="Alternar visibilidade do item"
            >
              {eyeIcon}
            </button>
          </div>

          <div className={`item-value${hiddenClass}`}>
            {valorDisplay}
          </div>

          {item.dataPrometida && (
            <div className="item-promised-date">
              📅 Prometeu pagar em: <strong>{item.dataPrometida}</strong>
              {item.notaPromessa && <span style={{ fontStyle: 'italic', opacity: 0.85 }}> — "{item.notaPromessa}"</span>}
            </div>
          )}

          {item.parcelas > 0 && (
            <div className="item-installment-info">
              📈 Parcelado {item.parcelas}x — juros acumulados: {formatMoney(item.valorAtual - item.valor)}
            </div>
          )}
        </div>
      </div>

      <div className="item-actions">
        <button
          className="btn btn-pay"
          onClick={() => onPay(item.id)}
          disabled={item.pago}
        >
          {item.pago
            ? (item.dataPrometida ? `✅ Prometeu p/ ${item.dataPrometida} ✍️` : '✅ Pago com sucesso!')
            : 'Pagar com 👌🏼'}
        </button>

        <button
          className="btn btn-installment"
          onClick={() => onInstallment(item.id)}
          disabled={item.pago}
        >
          💳 Pagar parcelado com juros
        </button>
      </div>
    </div>
  );
}
