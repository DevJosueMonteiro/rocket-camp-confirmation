# Rocket Summer Camp 25 - Sistema de Confirmação

Sistema de gerenciamento e confirmação de participantes para o Rocket Summer Camp 25.

## 🚀 Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Faça push do código para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/rocket-camp-confirmation.git
   git push -u origin main
   ```

2. **Conecte no Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione o repositório `rocket-camp-confirmation`
   - O Vercel detectará automaticamente que é um projeto Vite
   - Clique em "Deploy"

### Opção 2: Deploy via Vercel CLI

1. **Instale o Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Faça login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Para produção:**
   ```bash
   vercel --prod
   ```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── RocketCampConfirmation.tsx  # Componente principal
│   └── ui/                         # Componentes UI (shadcn/ui)
├── hooks/
│   └── use-toast.ts               # Hook para notificações
├── lib/
│   └── utils.ts                   # Utilitários
├── App.tsx                        # App principal
├── main.tsx                       # Entry point
└── globals.css                    # Estilos globais
```

## 🎨 Tecnologias

- **React 18** - Biblioteca de UI
- **Vite** - Build tool
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Framer Motion** - Animações
- **Lucide React** - Ícones

## 📱 Funcionalidades

- ✅ Lista de participantes
- ✅ Confirmação de status (clique no badge)
- ✅ Adicionar novos participantes
- ✅ Editar participantes existentes
- ✅ Ver detalhes completos
- ✅ Remover participantes
- ✅ Filtros por status
- ✅ Busca por nome
- ✅ Exportação para CSV
- ✅ Modo escuro/claro
- ✅ Responsivo

## 🔧 Configuração

O projeto já está configurado para deploy no Vercel com:

- `vercel.json` - Configuração do Vercel
- Build otimizado para produção
- SPA routing configurado
- Assets otimizados

## 🌐 URLs

Após o deploy, você receberá URLs como:
- **Preview:** `https://rocket-camp-confirmation-git-main-seu-usuario.vercel.app`
- **Produção:** `https://rocket-camp-confirmation.vercel.app`

## 📊 Analytics

O Vercel oferece analytics gratuitos incluindo:
- Page views
- Performance
- Core Web Vitals
- Analytics de visitantes

## 🔄 Atualizações

Para atualizar o site:
1. Faça as mudanças no código
2. Commit e push para GitHub
3. O Vercel fará deploy automático
4. Ou use `vercel --prod` via CLI 