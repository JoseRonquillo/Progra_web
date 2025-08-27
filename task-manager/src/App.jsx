import { useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./index.css";

// util seguro para ID único
const uid = () => (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all"); // all | pending | completed

  const addTask = (name) => {
    const newTask = { id: uid(), name, status: "pending" }; // estado inicial: pendiente
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "pending" ? "completed" : "pending" } : t
      )
    );
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const clearCompleted = () => setTasks((prev) => prev.filter((t) => t.status !== "completed"));

  const filtered = useMemo(() => {
    switch (filter) {
      case "pending":
        return tasks.filter((t) => t.status === "pending");
      case "completed":
        return tasks.filter((t) => t.status === "completed");
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const remaining = tasks.filter((t) => t.status === "pending").length;

  return (
    <div style={{ maxWidth: 620, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Gestión de Tareas</h1>

      <TaskForm onAdd={addTask} />

      <div style={{ display: "flex", gap: 8, marginTop: 16, alignItems: "center" }}>
        <strong>Filtro:</strong>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>Todas</button>
        <button onClick={() => setFilter("pending")} disabled={filter === "pending"}>Pendientes</button>
        <button onClick={() => setFilter("completed")} disabled={filter === "completed"}>Completadas</button>
        <span style={{ marginLeft: "auto" }}>{remaining} pendiente(s)</span>
        <button onClick={clearCompleted} title="Eliminar todas las completadas">Limpiar completadas</button>
      </div>

      <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
