import React from 'react';

export default function EditDrawer({
  isOpen,
  onClose,
  items,
  onUpdateItem,
  onAddItem,
  onDeleteItem,
  onResetDefaults
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="edit-panel-overlay" onClick={onClose} />
      <aside className="edit-panel" aria-label="Painel de Edição">
        <h2>
          <span>✏️ Editar Lista de Fiado</span>
          <button className="edit-close-btn" onClick={onClose} title="Fechar painel">
            &times;
          </button>
        </h2>

        <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '16px' }}>
          Personalize as dívidas antes de mandar o link pra ela. As alterações ficam salvas no navegador! 💕
        </p>

        <div className="edit-items-container">
          {items.map((item) => (
            <div key={item.id} className="edit-item">
              <label>📝 Nome da dívida</label>
              <input
                type="text"
                value={item.nome}
                onChange={(e) => onUpdateItem(item.id, 'nome', e.target.value)}
                placeholder="Ex: Beijo atrasado"
              />

              <label>💰 Valor original (R$)</label>
              <input
                type="number"
                step="0.50"
                min="0"
                value={item.valor}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  onUpdateItem(item.id, 'valor', val);
                  onUpdateItem(item.id, 'valorAtual', val);
                  onUpdateItem(item.id, 'parcelas', 0);
                }}
              />

              <label>🏷️ Tag de urgência</label>
              <select
                value={item.tag}
                onChange={(e) => onUpdateItem(item.id, 'tag', e.target.value)}
              >
                <option value="urgente">🔥 Urgente</option>
                <option value="pirracada">😤 Pirraçada</option>
              </select>

              <label>📸 Foto opcional (caminho em /imagens/exemplo.jpg)</label>
              <input
                type="text"
                value={item.foto || ''}
                placeholder="/imagens/casal.jpg"
                onChange={(e) => onUpdateItem(item.id, 'foto', e.target.value || null)}
              />

              <div className="toggle-row">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={item.defaultVisivel}
                    onChange={(e) => {
                      onUpdateItem(item.id, 'defaultVisivel', e.target.checked);
                      onUpdateItem(item.id, 'visivel', e.target.checked);
                    }}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span style={{ fontSize: '0.85rem', color: 'var(--texto)', fontWeight: 600 }}>
                  {item.defaultVisivel ? '👁️ Visível por padrão' : '🙈 Escondido por padrão (•••)'}
                </span>
              </div>

              <div className="edit-item-actions">
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => onDeleteItem(item.id)}
                >
                  🗑️ Excluir item
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn btn-add" onClick={onAddItem}>
          ➕ Adicionar nova dívida
        </button>

        <button
          type="button"
          className="btn-reset"
          onClick={() => {
            if (window.confirm('Deseja resetar a lista para os itens originais padrão?')) {
              onResetDefaults();
            }
          }}
        >
          🔄 Restaurar itens originais
        </button>
      </aside>
    </>
  );
}
