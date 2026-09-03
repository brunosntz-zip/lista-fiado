# 💕 Lista de Fiado do Amor — React + Vite

Um site romântico, engraçado e fofo estilo "Lista de Fiado" para mandar para sua namorada, construído em **React + Vite** e pronto para deploy na **Vercel** com 1 clique!

---

## 🚀 Como rodar localmente

1. Abra o terminal na pasta do projeto:
```bash
npm install
npm run dev
```
2. Acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## ☁️ Como subir na Vercel (Opção 1: Direto pelo GitHub - Recomendado)

1. Crie um repositório no seu GitHub (público ou privado) e envie o código:
```bash
git init
git add .
git commit -m "feat: Lista de Fiado do Amor"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```
2. Acesse [vercel.com](https://vercel.com) e faça login.
3. Clique em **"Add New..."** ➜ **"Project"**.
4. Selecione o seu repositório do GitHub.
5. A Vercel detecta **Vite** automaticamente:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em **"Deploy"**. Em menos de 1 minuto seu link estará no ar (ex: `https://lista-fiado-amor.vercel.app`)!

---

## ⚡ Como subir na Vercel (Opção 2: Pelo Terminal / Vercel CLI)

Se tiver o Vercel CLI instalado ou quiser rodar via `npx`:
```bash
npx vercel
```
Siga as perguntas rápidas do terminal dando Enter e pronto!

---

## 🎨 Como Personalizar

- **Foto do casal**: Substitua o arquivo em `public/imagens/casal.jpg`.
- **Música do casal**: Coloque o arquivo `.mp3` em `public/audio/nossa-musica.mp3`.
- **Modo de edição visual**: Clique no ícone discreto de engrenagem (`⚙`) no canto inferior esquerdo para alterar dívidas, valores, tags e definir se cada item já começa aberto ou escondido (`•••`).
- **Edição direta no código**: Altere `src/data/initialData.js` se preferir editar direto no código.
