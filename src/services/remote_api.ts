import  {type Task}  from '../models/Task.ts';

const API_URL = 'https://eng-soft-backend.onrender.com/todos'; 

export const api = {
  // Buscar todas as tarefas
  getAll: async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    const data = await response.json();
    const tasks = data.map((item: any) => ({
      id: item.id,
      title: item.text,
      completed: item.completed
    }));
    return tasks;
  },

  // Criar tarefa
  create: async (text: string): Promise<Task> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text , completed: false })
    });
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return  await response.json();
  },

    // Alternar status da tarefa
  toggle: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const tasks: Task[] = await api.getAll();
        const oldTask = tasks.find((t) => t.id === id);
        if (!oldTask) return;
        const updatedTask = { ...oldTask, completed: !oldTask.completed };
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: updatedTask.title, completed: updatedTask.completed })
        });
        if (!response.ok) throw new Error('Erro ao alternar status da tarefa');
        resolve();
      }, 100);
    }); 
  },

  // Atualizar tarefa
  update: async (id: string, text: string): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // Ou 'PATCH', verifique na imagem
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return await response.json();
  },

  // Deletar tarefa
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar tarefa');
  }
};