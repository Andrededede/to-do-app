import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import "./to-do-log.css";

export type LogType = "success" | "error" | null;

interface ToDoLogProps {
  message: string | null;
  type: LogType;
}

export const ToDoLog: React.FC<ToDoLogProps> = ({ message, type }) => {
  if (!message || !type) return null;

  const isSuccess = type === "success";
  const title = isSuccess ? "Sucesso!" : "Erro!";
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-icon-area">
        <Icon size={24} />
      </div>

      <div className="toast-content">
        <strong className="toast-title">{title}</strong>
        <p className="toast-message">{message}</p>
      </div>
    </div>
  );
};
