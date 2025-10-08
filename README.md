Proyecto Django con Docker y PostgreSQL

Requisitos

* Docker y Docker Compose instalados.
* Puerto 8000 libre.

Configuración

1. Clonar el repositorio y entrar al proyecto:

   bash
   git clone 
   cd 


2. Crear el archivo `.env` con:

   POSTGRES_DB=mi_basedatos
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   DB_HOST=db
   DB_PORT=5432

3. Crear `requirements.txt`:


   Django>=5.0
   psycopg2-binary>=2.9


## Ejecución

1. Construir e iniciar:

   bash
   docker-compose up --build


2. Acceder en el navegador:

   http://localhost:8000

