import type { Task } from "../models/Task";

const DB_KEY = "todo_local_db";

export const api = {
  getAll: async (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(DB_KEY);
        resolve(data ? JSON.parse(data) : []);
      }, 1);
    });
  },

  create: async (title: string): Promise<Task> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          completed: false,
        };
        const tasks = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem(DB_KEY, JSON.stringify(updatedTasks));
        resolve(newTask);
      }, 1);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks: Task[] = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
        const updatedTasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem(DB_KEY, JSON.stringify(updatedTasks));
        resolve();
      }, 1);
    });
  },

  toggle: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks: Task[] = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
        const updatedTasks = tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        localStorage.setItem(DB_KEY, JSON.stringify(updatedTasks));
        resolve();
      }, 1);
    });
  },

  update: async (id: string, newTitle: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks: Task[] = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
        const updatedTasks = tasks.map((t) =>
          t.id === id ? { ...t, title: newTitle } : t
        );
        localStorage.setItem(DB_KEY, JSON.stringify(updatedTasks));
        resolve();
      }, 1);
    });
  },

  reorder: async (newOrderTasks: Task[]): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(DB_KEY, JSON.stringify(newOrderTasks));
        resolve();
      }, 1);
    });
  },
};
