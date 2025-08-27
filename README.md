<img width="558" height="334" alt="image" src="https://github.com/user-attachments/assets/72863c73-0148-458c-b3f3-7cc139da28b3" />

Hooks utilizados
- useState: manejo de estado local (tareas, filtro).
- useEffect (a través del custom hook): sincroniza el estado con `localStorage`.
- Custom hook – useLocalStorage: encapsula lectura/escritura resiliente y persistencia del estado de `tasks`.
- useMemo: calcula la lista filtrada sin recalcular innecesariamente.

Decisiones de diseño
- Cada tarea: `{ id, name, status }`, donde `status ∈ {"pending","completed"}`.
- Al crear una tarea, se marca "pending" por defecto.
- Filtros: Todas | Pendientes | Completadas.
- Acciones: alternar estado, eliminar, limpiar completadas.
