# 📚 Koma E-Reader

> Leitor de e-books, mangás e HQs leve, moderno e de alta performance desenvolvido com Electron, React e TypeScript.

---

## 🚀 Sobre o Projeto

O **Koma E-Reader** é uma aplicação desktop para gerenciamento e leitura de biblioteca digital. O projeto foi projetado com foco em performance, persistência local de dados e suporte a formatos de livros e quadrinhos.

### 🛠️ Tecnologias e Fundação do Projeto

- **[Electron](https://www.electronjs.org/)** – Framework desktop multiplataforma.
- **[React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)** – Interface reativa, modular e fortemente tipada.
- **[electron-vite](https://electron-vite.org/)** – Build tool rápida para Electron baseada no Vite.
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** – Banco de dados SQLite de alta velocidade para indexação de acervo, metadados e histórico de leitura.
- **[adm-zip](https://github.com/cthackers/adm-zip)** – Leitura e manipulação de arquivos compactados (CBZ / ZIP).
- **[electron-builder](https://www.electron.build/)** – Gerador de instaladores e executáveis para Windows, macOS e Linux.

---

## 📁 Estrutura do Projeto

```text
koma-e-reader/
├── src/
│   ├── main/          # Processo Principal do Electron (Gerenciamento de janelas, IPC, SQLite)
│   ├── preload/       # Script Preload (Ponte segura de API entre Main e Renderer)
│   └── renderer/      # Interface da Aplicação (React + Vite)
│       └── src/
│           ├── assets/       # Estilos CSS globais e recursos visuais
│           ├── components/   # Componentes da interface React
│           ├── App.tsx       # Componente principal da aplicação
│           └── main.tsx      # Ponto de entrada do React
├── build/             # Recursos de compilação (ícones e configurações nativas)
└── electron-builder.yml # Configuração de empacotamento
```

---

## 🔧 Instalação e Execução

### 1. Instalar Dependências

```bash
npm install
```

### 2. Modo Desenvolvimento

Inicia o servidor de dev com hot reload para a interface React e recarregamento automático do processo Electron:

```bash
npm run dev
```

### 3. Verificação de Código e Tipagem

```bash
# Checagem de tipos (Node e Web)
npm run typecheck

# Lint de código
npm run lint
```

### 4. Compilação e Empacotamento (Build)

```bash
# Para Windows
npm run build:win

# Para macOS
npm run build:mac

# Para Linux
npm run build:linux
```
