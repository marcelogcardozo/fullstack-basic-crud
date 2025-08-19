# CodeLeap Network - Frontend

Uma aplicação React moderna para criar e compartilhar posts com sistema completo de interações sociais.

## 📋 Visão Geral

O CodeLeap Network é uma plataforma social onde usuários podem criar posts, interagir através de likes e comentários, e mencionar outros usuários. A aplicação oferece uma experiência rica e moderna similar às principais redes sociais.

## ✨ Funcionalidades

### 🔐 Autenticação
- **Login simples**: Sistema de autenticação baseado em username
- **Persistência de sessão**: Mantém usuário logado entre sessões
- **Roteamento protegido**: Acesso restrito às áreas autenticadas

### 📝 Gestão de Posts
- **Criar posts**: Interface intuitiva com título e conteúdo
- **Editar posts**: Edição completa de posts próprios
- **Deletar posts**: Remoção com modal de confirmação
- **Visualização**: Layout responsivo e organizado

### 💬 Sistema de Comentários
- **Adicionar comentários**: Interface simples e direta
- **Deletar comentários**: Remoção de comentários próprios
- **Expandir/Recolher**: Toggle para visualização dos comentários
- **Contador dinâmico**: Mostra quantidade de comentários

### 🔗 Sistema de Menções
- **Autocomplete inteligente**: Digite @ + nome para mencionar usuários
- **Navegação por teclado**: Use setas ↑/↓ e Enter para selecionar
- **Destaque visual**: Menções aparecem destacadas em azul
- **Floating dropdown**: Sugestões não são limitadas por containers

### ❤️ Sistema de Likes
- **Like/Unlike**: Clique no coração para curtir posts
- **Contador em tempo real**: Mostra total de likes
- **Controle de duplicatas**: Um like por usuário
- **Estado visual**: Coração vermelho quando curtido

### 🎨 Interface e UX
- **Design responsivo**: Funciona em desktop e mobile
- **Tema moderno**: Interface limpa e profissional
- **Feedback visual**: Hover effects e transições suaves
- **Acessibilidade**: Títulos e labels apropriados

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
cd frontend

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 🗂️ Estrutura do Projeto

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── Dashboard.js     # Tela principal da aplicação
│   ├── Login.js         # Tela de autenticação
│   ├── PostForm.js      # Formulário para criar posts
│   ├── PostList.js      # Lista de posts
│   ├── PostItem.js      # Item individual de post
│   ├── Comments.js      # Sistema de comentários
│   ├── MentionInput.js  # Input com autocomplete de menções
│   ├── MentionText.js   # Componente para exibir texto com menções
│   ├── DeleteModal.js   # Modal de confirmação de delete
│   ├── EditModal.js     # Modal de edição de posts
│   └── *.css           # Estilos dos componentes
├── App.js              # Componente principal e roteamento
├── App.css             # Estilos globais
└── index.js            # Ponto de entrada da aplicação
```

## 📦 Dependências Principais

- **React 19.1.1**: Biblioteca principal
- **React Router DOM 7.8.1**: Roteamento SPA
- **Axios 1.11.0**: Cliente HTTP (preparado para integração com backend)

## 🔧 Scripts Disponíveis

### `npm start`
Executa a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

## 💾 Persistência de Dados

A aplicação utiliza **localStorage** para persistir dados entre sessões:

- **Posts**: Todos os posts criados
- **Comentários**: Comentários de todos os posts
- **Likes**: Estado dos likes por usuário
- **Usuário logado**: Informações da sessão ativa
- **Lista de usuários**: Para autocomplete de menções

## 🎯 Como Usar

### 1. **Login**
- Digite seu username na tela inicial
- O sistema criará automaticamente uma conta

### 2. **Criando Posts**
- Use o formulário "What's on your mind?"
- Preencha título e conteúdo
- Clique em "Create"

### 3. **Interagindo com Posts**
- **Curtir**: Clique no ❤️ para like/unlike
- **Comentar**: Clique em "💬 X comments" para expandir
- **Mencionar**: Digite @ + nome do usuário nos comentários
- **Editar/Deletar**: Use os botões 🗑️ e ✏️ em posts próprios

### 4. **Sistema de Menções**
- Digite `@` seguido do nome
- Use ↑/↓ para navegar nas sugestões
- Pressione Enter para selecionar
- As menções aparecerão destacadas
