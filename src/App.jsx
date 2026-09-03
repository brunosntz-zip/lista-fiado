import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DebtSummary from './components/DebtSummary';
import ItemCard from './components/ItemCard';
import PaymentModal from './components/PaymentModal';
import EditDrawer from './components/EditDrawer';
import MusicPlayer from './components/MusicPlayer';
import Gallery from './components/Gallery';
import { INITIAL_ITEMS, MENSAGENS_PAGAMENTO, MENSAGENS_JUROS, INITIAL_GALLERY } from './data/initialData';
import { launchHearts, launchConfetti } from './utils/confetti';

const STORAGE_KEY = 'lista_fiado_soso_v1';

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Garante que o estado de visibilidade inicial respeite defaultVisivel
        return parsed.map((item) => ({
          ...item,
          visivel: item.defaultVisivel ?? true
        }));
      }
    } catch (e) {
      console.warn('Erro ao carregar dados do localStorage:', e);
    }
    return INITIAL_ITEMS;
  });

  const [modalData, setModalData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Salva no localStorage sempre que os itens mudam
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }, [items]);

  // Alterna o olho de visibilidade
  const handleToggleVisibility = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visivel: !item.visivel } : item
      )
    );
  };

  // Pagamento com 👌🏼 — Abre solicitação de data real
  const handlePay = (id) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.pago) return;

    setModalData({
      type: 'date_prompt',
      itemId: id,
      title: 'Vai pagar com 👌🏼? Seu branquelo quer garantia!',
      text: `Pra quitar "${item.nome}", você precisa assinar o termo de compromisso e marcar o dia oficial que vai pagar:`,
      image: item.foto || '/imagens/recibo.jpg'
    });
  };

  // Confirmação com data real prometida
  const handleConfirmPaymentWithDate = (id, formattedDate, note) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
            ...i,
            pago: true,
            dataPrometida: formattedDate,
            notaPromessa: note || null
          }
          : i
      )
    );

    launchHearts();

    const randomMsg =
      MENSAGENS_PAGAMENTO[Math.floor(Math.random() * MENSAGENS_PAGAMENTO.length)];

    setModalData({
      type: 'receipt',
      title: 'Vou passar pro meu nome no cartório!',
      text: `${randomMsg}\n\n🗓️ Data prometida: ${formattedDate}${note ? `\n💬 Recado dela: "${note}"` : ''}\n\nJá tirei print como comprovante. Se atrasar, tem multa viu kkkkkk`,
      image: item.foto || '/imagens/recibo.jpg',
      buttonText: 'Prometo que não vou dar migué'
    });
  };


  // Parcelamento com juros abusivos e cômicos
  const handleInstallment = (id) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.pago) return;

    const novasParcelas = item.parcelas + 1;
    // Juros exponenciais: 30%, 60%, 120%, 240%...
    const taxaJuros = 0.3 * Math.pow(2, novasParcelas - 1);
    const novoValorAtual = item.valor * (1 + taxaJuros);

    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
            ...i,
            parcelas: novasParcelas,
            valorAtual: novoValorAtual
          }
          : i
      )
    );

    let msgTemplate =
      MENSAGENS_JUROS[Math.floor(Math.random() * MENSAGENS_JUROS.length)];
    const msg = msgTemplate.replace('{n}', novasParcelas);

    const formatMoney = (val) => `R$ ${val.toFixed(2).replace('.', ',')}`;

    setModalData({
      title: `📈 Parcela ${novasParcelas}x solicitada!`,
      text: `${msg}\n\nValor original: ${formatMoney(item.valor)} ➜ Novo saldo: ${formatMoney(novoValorAtual)}`,
      image: '/imagens/recibo.jpg',
      buttonText: 'Entendi o prejuízo! 💸'
    });

    launchConfetti();
  };

  // Funções de edição
  const handleUpdateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      nome: 'Nova dívida de amor',
      valor: 15.0,
      valorAtual: 15.0,
      tag: 'pirracada',
      foto: null,
      visivel: true,
      defaultVisivel: true,
      pago: false,
      parcelas: 0
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems(INITIAL_ITEMS);
    setIsEditOpen(false);
  };

  return (
    <>
      {/* Botão discreto de engrenagem para abrir o modo de edição */}
      <button
        type="button"
        className="edit-toggle"
        onClick={() => setIsEditOpen(true)}
        title="Editar lista de fiado"
        aria-label="Abrir modo de edição"
      >
        ⚙
      </button>

      {/* Painel lateral de edição */}
      <EditDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        items={items}
        onUpdateItem={handleUpdateItem}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onResetDefaults={handleResetDefaults}
      />

      {/* Player de música discreto no canto */}
      <MusicPlayer audioSrc="/audio/nossa-musica.mp3" />

      {/* Modal de confirmação/recibo */}
      <PaymentModal
        modalData={modalData}
        onClose={() => setModalData(null)}
        onConfirmPaymentWithDate={handleConfirmPaymentWithDate}
      />

      {/* Container principal */}
      <div className="container">
        <Header
          photoUrl="/imagens/casal.jpg"
          title="Fiado da Soso"
          subtitle="Achou que eu não ia fazer lista, né? kkkkkkkkkk"
        />

        <DebtSummary items={items} />

        <main className="items-list">
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            item={item}
            index={index}
            onToggleVisibility={handleToggleVisibility}
            onPay={handlePay}
            onInstallment={handleInstallment}
          />
        ))}
      </main>

      <Gallery photos={INITIAL_GALLERY} />

      <footer className="footer">
        Feito com muita pirraça e carinho pra minha boneca
        <span>eu te amo demaaais ❤️</span>
      </footer>
    </div >
    </>
  );
}
