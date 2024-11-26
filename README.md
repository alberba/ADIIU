IMDB Data Dashboard
Este proyecto es un dashboard interactivo diseñado para visualizar y analizar datos de películas del conjunto de datos de IMDB Top 1000. Incluye gráficos dinámicos, búsquedas de películas específicas a través de la API de TMDB y visualizaciones generadas a partir de datos almacenados en una base de datos MySQL.

Funcionalidades

1. Gráficos Interactivos
Películas por década: Muestra un gráfico de barras con el número de películas lanzadas en cada década.
Distribución por géneros: Representa un gráfico de pastel con los géneros principales de las películas y su porcentaje.
Mayores recaudaciones de peliculas ordenadas por genero: mostrado con un grafico de barras.

2. Búsqueda de películas
Permite buscar películas por nombre utilizando la API de TMDB.
Muestra información de la película, como el póster, título, año de lanzamiento y descripción.

Estructura del Proyecto
Frontend
HTML: Contiene la estructura básica del dashboard con secciones para los gráficos, el formulario de búsqueda y los resultados.
TailwindCSS: Se utiliza para diseñar un layout moderno y responsivo.
Highcharts: Librería para gráficos interactivos.
JavaScript:
api.js: Contiene la función buscarPelicula para consumir la API de TMDB.
Chart.js: Implementa las funciones para generar los gráficos de barras y de pastel  a partir de los datos obtenidos de la base de datos.
Backend
PHP: Archivo database.php encargado de manejar las peticiones para generar los datos de los gráficos.
Procesa consultas SQL según el parámetro grafico enviado por el cliente.
Retorna datos en formato JSON listos para ser usados en el frontend.
Base de Datos
MySQL:
Base de datos: csv_db 6
Tabla: imdb_top_1000
Columnas utilizadas: Released_Year, Genre, Series_Title, Gross.


Créditos
Framework CSS: TailwindCSS
Gráficos: Highcharts
Fuente de Datos: IMDB Dataset
API de Búsqueda: The Movie Database (TMDB)
