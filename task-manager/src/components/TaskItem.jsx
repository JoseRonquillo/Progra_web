export default function TaskItem({ task, onToggle, onDelete }) {
  const completed = task.status === "completed";

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Marcar ${task.name} como ${completed ? "pendiente" : "completada"}`}
      />
      <span style={{ flex: 1, textDecoration: completed ? "line-through" : "none" }}>
        {task.name}
      </span>
      <small
        style={{
          padding: "2px 6px",
          borderRadius: 6,
          background: completed ? "#e7f7ee" : "#fff7e6",
          border: "1px solid #ddd",
        }}
      >
        {completed ? "Completado" : "Pendiente"}
      </small>
      <button onClick={() => onDelete(task.id)} aria-label={`Eliminar ${task.name}`}>
        🗑️
      </button>
    </li>
  );
}
