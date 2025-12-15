import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base según entorno
  const API_BASE =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://todo-lits.onrender.com';

  const API_TODOS = `${API_BASE}/api/todos`;
  const API_HEALTH = `${API_BASE}/api/health`;

  // Verificar conexión inicial
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(API_HEALTH);
        if (!res.ok) throw new Error('Backend no disponible');
        await fetchTodos();
      } catch (err) {
        setError(`No se pudo conectar con el backend (${API_BASE})`);
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_TODOS);
      if (!res.ok) throw new Error('Error al cargar tareas');
      const data = await res.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await fetch(API_TODOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      if (!res.ok) throw new Error('No se pudo crear la tarea');

      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setTitle('');
      setDescription('');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta tarea?')) return;

    try {
      const res = await fetch(`${API_TODOS}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar tarea');
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const res = await fetch(`${API_TODOS}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar tarea');

      const updated = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <p>Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Todo App</h1>
        <p className="backend-status">
          Backend: {error ? 'No conectado' : 'Conectado'}
        </p>
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Nueva tarea</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción (opcional)"
            />
            <button type="submit">Agregar</button>
          </form>
        </div>

        {error && (
          <div className="error-card">
            <p>{error}</p>
            <button onClick={fetchTodos}>Reintentar</button>
          </div>
        )}

        <div className="card">
          <h2>Tareas ({todos.length})</h2>

          {todos.length === 0 ? (
            <p>No hay tareas</p>
          ) : (
            <ul className="todos-list">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={todo.completed ? 'completed' : ''}
                >
                  <span onClick={() => toggleComplete(todo.id)}>
                    {todo.title}
                  </span>
                  <button onClick={() => handleDelete(todo.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>React · Node.js · MySQL (Railway)</p>
      </footer>
    </div>
  );
}

export default App;
