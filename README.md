# To Do App - Arquitetura MVVM com React

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

> Uma aplicação de gerenciamento de tarefas focada em **Arquitetura de Software**, **Clean Code** e **UI/UX refinada**.

## 🎨 Preview

![Demo da Aplicação](./public/demo.gif)

## 📖 Sobre o Projeto

Este projeto foi desenvolvido como parte de um estudo de Engenharia de Software (IFCE 2025.2) para comparar arquiteturas de frontend. O objetivo principal foi implementar o padrão **MVVM (Model-View-ViewModel)** em React, garantindo uma estrita separação de responsabilidades.

Este projeto tem como pontos de destaque:
* **Separação Arquitetural:** A View não contém regras de negócio; a ViewModel gerencia todo o estado e lógica.
* **Design:** Busca pela implementação de uma interface agradável visualmente.
* **Simplicidade:** Se mantém no escopo de um trabalho acadêmico simples, sem preocupações elevadas com escalabilidade, performance, segurança e outros detalhes.


## 🚀 Branches e Versões

Para fins de demonstração e desenvolvimento, o projeto está dividido em branches:

| Branch | Descrição |
| :--- | :--- |
| **`main`** | Contém a versão final integrada com o Backend Real (API REST/WebSocket). |
| **`local`** | Contém a versão **Standalone**. Funciona inteiramente no navegador utilizando um *Mock Service* e `localStorage`. Ideal para testar a UI/UX sem precisar rodar um servidor. |

> **Nota:** Se você clonou este repositório para testar rapidamente, faça o checkout na branch `local`.

## ✨ Funcionalidades

* ✅ **CRUD Completo:** Criar, Ler, Atualizar e Deletar tarefas.
* ✋ **Drag and Drop Nativo:** Reordenação de tarefas com feedback visual ("ghost dragging" e placeholder pontilhado).
* 🌙 **Dark/Light Mode:** Tema persistente com variáveis CSS nativas.
* 🔍 **Filtros:** Alternar visualização entre todas as tarefas ou pendentes.
* 🔔 **Feedback Visual:** Sistema de Toasts (notificações) para sucesso e erro.
* 📱 **Responsivo:** Layout fluido que se adapta a diferentes tamanhos de tela.

## 🏗️ Arquitetura (MVVM)

A estrutura de pastas reflete a separação de responsabilidades do padrão MVVM:

```text
src/
├── hooks/           # Hooks globais (ex: useTheme para gestão de UI)
├── models/          # Interfaces e Tipos (Task.ts)
├── services/        # Camada de abstração de dados (Mock ou API Real)
└── pages/
    └── to-do/       # Módulo da Funcionalidade
        ├── to-do-card/         # Componentes visuais menores (View)
        ├── to-do-log/          # Componente de notificação (View)
        ├── ToDoPage.tsx        # Página Principal (View)
        └── useToDoViewModel.ts # Lógica de Negócio (ViewModel)
