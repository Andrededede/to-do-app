import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { ToDoPageMVC } from "./architectures/mvc/to-do/ToDoPageMVC";
import { ToDoPageMVVM } from "./architectures/mvvm/to-do/ToDoPageMVVM";
import { ToDoPageMVP } from "./architectures/mvp/to-do/ToDoPageMVP";
import { BackendModeProvider, useBackendMode } from "./contexts/BackendModeContext";
import "./App.css";

// Componente interno para a Barra de Navegação
const NavBar = () => {
  const { isReactive, toggleMode } = useBackendMode();
  const location = useLocation();
  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path)
      ? "nav-link active"
      : "nav-link";
  };

  return (
    <nav className="app-navbar">
      <div className="nav-links-container">
        <Link to="/mvc" className={getLinkClass("/mvc")}>MVC</Link>
        <Link to="/mvvm" className={getLinkClass("/mvvm")}>MVVM</Link>
        <Link to="/mvp" className={getLinkClass("/mvp")}>MVP</Link>
      </div>
      <div className="backend-controls">
        <span className="backend-label">
          Backend:
        </span>
        <button 
          onClick={toggleMode}
          className={`backend-toggle-btn ${isReactive ? 'reactive' : 'rest'}`}
        >
          {isReactive ? (
            <>
              <span className="pulse-icon">⚡</span>
              Reativo (SSE)
            </>
          ) : (
            <>
              <span>🔄</span>
              REST (Fetch)
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <BackendModeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
          <NavBar />
          <main className="p-4 flex justify-center">
            <Routes>
              <Route path="/" element={<Navigate to="/mvc" replace />} />
              <Route path="mvc" element={<ToDoPageMVC />} />
              <Route path="mvvm" element={<ToDoPageMVVM />} />
              <Route path="mvp" element={<ToDoPageMVP />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </BackendModeProvider>
  );
}

export default App;
