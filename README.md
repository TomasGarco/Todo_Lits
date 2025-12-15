# Todo App – Full Stack (React + Node.js + MySQL)

Aplicación **full stack de lista de tareas** desarrollada con **React** en el frontend, **Node.js + Express** en el backend y **MySQL** como base de datos alojada en **Railway**.  
El proyecto está desplegado en producción usando **Netlify** (frontend) y **Render** (backend).

## Demo

- **Frontend:** https://gregarious-sfogliatella-a7b43d.netlify.app/
- **Backend API:** https://todo-lits.onrender.com  
- **Health check:** https://todo-lits.onrender.com/api/health  

## Tecnologías

- **Frontend:** React 18, Vite
- **Backend:** Node.js 22, Express
- **Base de datos:** MySQL (Railway)
- **Deploy:** Netlify (frontend), Render (backend)

## Funcionalidades

### Frontend
- Crear, editar y eliminar tareas
- Marcar tareas como completadas o pendientes
- Validación de formularios en tiempo real
- Confirmación antes de eliminar tareas
- Mensajes de éxito y error
- Interfaz responsive
- Indicador de estado de conexión con la API

### Backend
- API REST con operaciones CRUD
- Conexión a MySQL usando variables de entorno
- Manejo de errores centralizado
- Configuración CORS para entorno de producción
- Logs para debugging
- Endpoint de health check

### Base de datos
- Tabla `todos`
- Campos:
  - `id` (auto increment)
  - `title`
  - `description`
  - `completed`
  - `created_at`
- Persistencia en la nube con backups automáticos (Railway)

## Arquitectura del sistema

El frontend consume la API REST, el backend gestiona la lógica de negocio y la base de datos almacena la información.

