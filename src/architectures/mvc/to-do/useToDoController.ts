import { useState, useEffect, useRef } from "react";
import type { Task } from "../../../models/Task";
import { api } from "../../../services/remote_api";
import { useBackendMode } from "../../../contexts/BackendModeContext";

type LogState = {
  id: number;
  message: string;
  type: "success" | "error";
} | null;

export const useToDoController = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [logState, setLogState] = useState<LogState>(null);
  const [hideCompleted, setHideCompleted] = useState(false);

  const { isReactive } = useBackendMode();

  const dragItem = useRef<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const loadTasksRest = async () => {
      try {
        const data = await api.getAll();
        setTasks(data);
      } catch (error) {
        showLog("Erro ao carregar tarefas (REST).", "error");
      }
    };

    if (isReactive) {
      try {
        eventSource = api.getEventSource();

        eventSource.onopen = () => {
        };

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
               const mappedTasks = data.map((item: any) => ({
                id: item.id,
                title: item.text,
                completed: item.completed
              }));
              setTasks(mappedTasks);
            }
          } catch (err) {
            console.error("Erro ao processar mensagem SSE:", err);
          }
        };

        eventSource.onerror = (err) => {
          console.error("Erro na conexão SSE:", err);
          eventSource?.close();
        };
      } catch (e) {
        console.error("Falha ao criar EventSource", e);
      }
    } else {
      loadTasksRest();
    }

    return () => {
      if (eventSource) {
        console.log("Fechando conexão SSE (MVC)");
        eventSource.close();
      }
    };
  }, [isReactive]);

  const showLog = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setLogState({ id, message, type });
    setTimeout(() => {
      setLogState((current) => {
        if (current?.id === id) return null;
        return current;
      });
    }, 3000);
  };

  const handleAddTask = async () => {
    if (!newTaskText.trim()) {
      showLog("A tarefa não pode estar vazia.", "error");
      return;
    }
    try {
      await api.create(newTaskText);
      setNewTaskText("");
      showLog("Tarefa criada com sucesso!", "success");
      
      if (!isReactive) {
        const data = await api.getAll();
        setTasks(data);
      }
    } catch (error) {
      showLog("Erro ao criar tarefa.", "error");
    }
  };

  const handleRemoveTask = async (id: string) => {
    try {
      await api.delete(id);
      showLog("Tarefa removida.", "success");

      if (!isReactive) {
         setTasks((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      showLog("Erro ao remover tarefa.", "error");
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await api.toggle(id);
      if (!isReactive) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
      }
    } catch (error) {
      showLog("Erro ao atualizar tarefa.", "error");
    }
  };

  const handleUpdateTask = async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    try {
      await api.update(id, newTitle);
      showLog("Tarefa editada com sucesso!", "success");

      if (!isReactive) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
        );
       }
    } catch (error) {
      showLog("Erro ao editar tarefa.", "error");
    }
  };

  // --- LÓGICA DE DRAG AND DROP ---
  // Nota: A API Remote fornecida no snippet não tem 'reorder'.
  // Vamos manter a lógica local visual, mas sem persistência real no backend se não houver endpoint.
  // Se houver endpoint, descomentar a chamada da api.

  const handleDragStart = (id: string) => {
    dragItem.current = id;
  };

  const handleDragEnter = (targetId: string) => {
    if (dragItem.current === null) return;
    if (dragItem.current === targetId) return;

    const sourceIndex = tasks.findIndex((t) => t.id === dragItem.current);
    const targetIndex = tasks.findIndex((t) => t.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const newTasks = [...tasks];
    const draggedItemContent = newTasks[sourceIndex];

    newTasks.splice(sourceIndex, 1);
    newTasks.splice(targetIndex, 0, draggedItemContent);

    setTasks(newTasks);
  };

  const handleDragEnd = async () => {
    dragItem.current = null;
    // await api.reorder(tasks); // Backend REST precisa suportar isso
  };

  const filteredTasks = hideCompleted
    ? tasks.filter((t) => !t.completed)
    : tasks;

  const toggleHideCompleted = () => {
    setHideCompleted((prev) => !prev);
  };

  return {
    model: {
      tasks: filteredTasks,
      newTaskText,
      logState,
      hideCompleted,
    },
    controller: {
      setNewTaskText,
      handleAddTask,
      handleRemoveTask,
      handleToggleTask,
      handleUpdateTask,
      toggleHideCompleted,
      handleDragStart,
      handleDragEnter,
      handleDragEnd,
    }
  };
};
