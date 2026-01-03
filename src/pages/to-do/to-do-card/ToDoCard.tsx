import React, { useState, useRef, useEffect } from "react";
import type { Task } from "../../../models/Task";
import { Trash2, CheckCircle2, Circle, Pencil, Save, X } from "lucide-react";
import "./to-do-card.css";

interface ToDoCardProps {
  task: Task;
  index: number;
  onDelete: () => void;
  onToggle: () => void;
  onUpdate: (id: string, newTitle: string) => void;
  // MUDANÇA: Agora aceitam string (ID) em vez de number (index)
  onDragStart: (id: string) => void;
  onDragEnter: (id: string) => void;
  onDragEnd: () => void;
}

export const ToDoCard: React.FC<ToDoCardProps> = ({
  task,
  // index, -> Não precisamos mais do index para o Drag
  onDelete,
  onToggle,
  onUpdate,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  const handleDragStartInternal = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    // MUDANÇA: Passamos o ID
    onDragStart(task.id);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEndInternal = () => {
    onDragEnd();
    setIsDragging(false);
  };

  return (
    <div
      className={`todo-card ${task.completed ? "completed" : ""} ${
        isDragging ? "dragging" : ""
      }`}
      draggable={!isEditing}
      onDragStart={handleDragStartInternal}
      // MUDANÇA: Passamos o ID
      onDragEnter={() => onDragEnter(task.id)}
      onDragEnd={handleDragEndInternal}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="todo-content">
        {!isEditing && (
          <div
            className="icon-wrapper"
            onClick={onToggle}
            title={task.completed ? "Desmarcar tarefa" : "Concluir tarefa"}
          >
            {task.completed ? (
              <CheckCircle2 className="icon-check" size={24} />
            ) : (
              <Circle className="icon-circle" size={24} />
            )}
          </div>
        )}

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="todo-edit-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleSave}
          />
        ) : (
          <span className="todo-title">
            <span>{task.title}</span>
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <div title="Salvar alteração" onClick={handleSave}>
              <Save size={18} className="icon-save" />
            </div>
            <div title="Cancelar edição" onClick={handleCancel}>
              <X size={18} className="icon-cancel" />
            </div>
          </>
        ) : (
          <>
            <div
              title="Editar tarefa"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Pencil size={18} className="icon-edit" />
            </div>

            <div title="Excluir tarefa">
              <Trash2
                size={18}
                className="icon-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
