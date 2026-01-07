# Comparativo de Arquiteturas Frontend (MVC, MVP, MVVM) com React

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

> Um laboratório prático de Engenharia de Software demonstrando três padrões arquiteturais distintos aplicados à mesma aplicação.

## 🎯 Objetivo do Projeto

Este repositório unifica três implementações diferentes de um **To-Do App**, cada uma seguindo estritamente um padrão arquitetural clássico. O objetivo é comparar como **MVC**, **MVP** e **MVVM** resolvem os mesmos problemas de separação de responsabilidades (SoC) e fluxo de dados, utilizando React como base.

A estrutura foi desenhada para permitir a comparação direta:
*   Muda-se a arquitetura (/mvc, /mvp, /mvvm).
*   A View (UI/CSS) e o Model (Dados/API) permanecem praticamente idênticos.
*   Apenas a camada de **orquestração** muda.

## 🏗️ As Três Arquiteturas

### 1. MVC (Model-View-Controller)
*   **Rota:** `/mvc`
*   **Características:** A View é passiva e envia comandos para o Controller. O Model é a fonte da verdade e o Controller decide como alterá-lo.
*   **Mapeamento de Papéis:**
    *   **Model:** `Task.ts` (estado).
    *   **View:** `ToDoPageMVC.tsx` (Interface Gráfica que consome o Model para desenhar e chama métodos do Controller).
    *   **Controller:** `useToDoController.ts` (Recebe inputs da View, processa lógica e atualiza o Model).

### 2. MVP (Model-View-Presenter)
*   **Rota:** `/mvp`
*   **Características:** O Presenter é um intermediário total. A View não acessa o Model diretamente. Tudo passa pelo Presenter.
*   **Mapeamento de Papéis:**
    *   **Model:** `Task.ts`.
    *   **View:** `ToDoPageMVP.tsx` (Apenas exibe o que o Presenter manda e repassa eventos de clique).
    *   **Presenter:** `useToDoPresenter.ts` (Busca dados do Model, formata para a View e gerencia a lógica de apresentação).

### 3. MVVM (Model-View-ViewModel)
*   **Rota:** `/mvvm`
*   **Características:** Focado no *Data Binding*. A ViewModel expõe propriedades observáveis que representam o estado da View.
*   **Mapeamento de Papéis:**
    *   **Model:** `local_api.ts` + `Task.ts`.
    *   **View:** `ToDoPageMVVM.tsx` (Se conecta/observa as variáveis da ViewModel).
    *   **ViewModel:** `useToDoViewModel.ts` (Mantém o estado da tela sincronizado e expõe comandos).

## 🚀 Como Rodar

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:5173`. Você pode navegar entre as versões alterando a URL:
    *   `http://localhost:5173/mvc`
    *   `http://localhost:5173/mvvm`
    *   `http://localhost:5173/mvp`

## 📂 Estrutura de pastas

```text
src/
├── architectures/   # Divisao das arquiteturas
│   ├── mvc/         # Implementação via Controller
│   ├── mvp/         # Implementação via Presenter
│   └── mvvm/        # Implementação via ViewModel
├── models/          # Entidades compartilhadas (Task.ts) 
├── services/        # Backend 
└── App.tsx          # Roteamento entre as arquiteturas
```

## ✨ Funcionalidades (Comuns a todas as versões)

*   ✅ **CRUD Completo:** Criar, Ler, Atualizar e Deletar tarefas.
*   ✋ **Drag and Drop:** Reordenação de tarefas.
*   🌙 **Dark/Light Mode:** Tema persistente.
*   🔍 **Filtros:** Todas/Pendentes.

---
