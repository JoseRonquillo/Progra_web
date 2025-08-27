import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nueva tarea..."
        aria-label="Nombre de la tarea"
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}
