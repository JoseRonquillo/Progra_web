# Mensajes Secretos - Assessment 3

Este proyecto permite enviar y recibir **mensajes secretos** que solo pueden ser vistos una vez y expiran en 24 horas. Está construido con **React + Vite** en el frontend y **Django + Redis** en el backend, todo dockerizado para un despliegue rápido.

## Requisitos

- Docker y Docker Compose instalados en tu máquina.
- Navegador moderno para probar el frontend.

## Levantar la aplicación

1. Abre una terminal en la carpeta raíz del proyecto.
2. Ejecuta el siguiente comando para construir y levantar los contenedores:

```bash
docker-compose up --build

Esto levantará los servicios:

Redis: base de datos en memoria para almacenar los secretos.

Redis Commander: interfaz web para inspeccionar Redis.

Backend: API REST en Django que maneja la creación y revelado de secretos.

Frontend: aplicación React/Vite para interactuar con los secretos.

Acceder a la aplicación

Frontend: http://localhost:3000

Redis Commander: http://localhost:8081
