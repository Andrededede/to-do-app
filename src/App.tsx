import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToDoPageMVC } from "./architectures/mvc/to-do/ToDoPageMVC";
import { ToDoPageMVVM } from "./architectures/mvvm/to-do/ToDoPageMVVM";
import { ToDoPageMVP } from "./architectures/mvp/to-do/ToDoPageMVP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/mvc" replace />} />
          <Route path="mvc" element={<ToDoPageMVC />} />
          <Route path="mvvm" element={<ToDoPageMVVM />} />
          <Route path="mvp" element={<ToDoPageMVP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
