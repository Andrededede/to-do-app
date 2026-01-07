import React from "react";
import { useToDoViewModel } from "./useToDoViewModel";
import { useTheme } from "../../../hooks/useTheme";
import { ToDoCard } from "./to-do-card/ToDoCard";
import { ToDoLog } from "./to-do-log/ToDoLog";
import { Plus, ListChecks, Sun, Moon, Filter } from "lucide-react";
import "./to-do-page.css";

export const ToDoPage: React.FC = () => {
  const vm = useToDoViewModel();
  const { isDark, toggleTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") vm.handleAddTask();
  };

  return (
    <div className="page-wrapper">
      <div className="todo-container">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <header className="todo-header">
          <h1>To Do App MVVM</h1>
          <ListChecks size={32} className="header-icon" />
        </header>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicione uma nova tarefa..."
            value={vm.newTaskText}
            onChange={(e) => vm.setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={vm.handleAddTask}
            className="add-btn"
            title="Adicionar nova tarefa"
          >
            <Plus size={24} color="white" />
          </button>
        </div>

        <ToDoLog
          key={vm.logState?.id}
          message={vm.logState?.message || null}
          type={vm.logState?.type || null}
        />

        <div className="tasks-toolbar">
          <button
            className={`filter-btn ${vm.hideCompleted ? "active" : ""}`}
            onClick={vm.toggleHideCompleted}
            title={
              vm.hideCompleted
                ? "Mostrar todas as tarefas"
                : "Ocultar tarefas concluídas"
            }
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="tasks-list">
          {vm.tasks.map((task, index) => (
            <ToDoCard
              key={task.id}
              index={index}
              task={task}
              onDelete={() => vm.handleRemoveTask(task.id)}
              onToggle={() => vm.handleToggleTask(task.id)}
              onUpdate={vm.handleUpdateTask}
              // MUDANÇA: Drag habilitado sempre, pois agora usa IDs
              onDragStart={vm.handleDragStart}
              onDragEnter={vm.handleDragEnter}
              onDragEnd={vm.handleDragEnd}
            />
          ))}

          {vm.tasks.length === 0 && (
            <p className="empty-msg">
              {vm.hideCompleted
                ? "Nenhuma tarefa pendente."
                : "Nenhuma tarefa por enquanto."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
