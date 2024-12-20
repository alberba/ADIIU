# IMDB Data Dashboard

![Captura de pantalla de la página web](./img/screenshot.png)

#### Autores: Ramiro Martins y Albert Salom

Este proyecto es un dashboard interactivo diseñado para visualizar y analizar datos de películas del conjunto de datos de IMDb Top 1000. Incluye gráficos dinámicos, búsquedas de películas específicas a través de la API de TMDB y visualizaciones generadas a partir de datos almacenados en una base de datos MySQL.

## Setup

Para hacer poder interactuar con la página web, deberá descargar el repositorio e introducirlo en la carpeta */htdocs* de xampp. Además deberá importar la base de datos a partir del archivo sql.

## Data Set

El dataset de IMDb Top 1000 contiene información sobre las 1000 películas mejor valoradas según [IMDb](https://www.imdb.com/). A partir de la base de datos, utilizamos estas variables:

- **_Series_Title_**: Nombre de la película.
- **_Released_Year_**: Año de lanzamiento.
- **_Genre_**: Género/s de la película.
- **_Gross_**: Recaudación de la película en dólares.

La base de datos se encuentra hospedado en un servidor MySQL en local.

## Integraciones

- **_TailwindCSS_**: **Framework de CSS** para el diseño del layout. Hemos decidido utilizar este framework porque estamos más familiarizados con él y creemos que ofrece menos limitaciones en cuanto a personalización.

- **_Highcharts_**: Librería de gráficos interactivos utilizado en el proyecto. Dentro de _Highcharts_, hemos utilizado el _Bar_Chart_, _Pie_Chart_ y _Column_Chart_.

- **_The Movie Database (TMDB) API_**: API utilizada para buscar información de películas específicas en tiempo real. La búsqueda se puede realizar tanto con el id de IMDb como con el nombre de la película, ya sea en inglés o en español.

## Gráficos Interactivos

En cuánto a los gráficos interactivos, hemos implementado tres tipos de gráficos:

1. **Películas por década**: Muestra un gráfico de columnas con el número de películas lanzadas en cada década. Como se puede observar en el gráfico, la década de los 2020 es la que menos películas tiene, ya que aún no ha terminado.

2. **Distribución por géneros**: Representa un gráfico de pastel con los géneros principales de las películas y su porcentaje. Para ello, hemos extraído el primer género de cada película y los hemos ordenado de mayor a menor.

3. **Recaudación por año**: Muestra un gráfico de barras con las top 3 películas más taquilleras de los 5 géneros más comunes en la lista.

## Uso de la API de TMDB

A partir de una pequeña barra de búsqueda, podemos obtener información de cualquier película. Para ello, hay que introducir el nombre de la película en inglés o en español. La API de TMDB nos devuelve la información de la película y nosotros mostramos el poster, el título, la fecha de lanzamiento y la sinopsis.

## Estructura del Proyecto

### Frontend

**HTML**: Contiene la estructura básica del dashboard con secciones para los gráficos, el formulario de búsqueda y los resultados.

**JavaScript:**

- _api.js_: Encargado de hacer la gestión con la API de TMDB.
- _Chart.js_: Se encarga de gestionar las solicitudes y salidas del php y genera los gráficos a partir de los datos obtenidos.

### Backend

**PHP**:

- _database.php_: Encargado de establecer conexión con la base de datos y procesar las consultas SQL para generar los datos de los gráficos en formato _JSON_ y enviarlos al frontend.

**SQL**:

Contiene todos los datos para la creación de la base de datos y la inserción de los datos del dataset.

## Accesibilidad

El dashboard es accesible para cualquier usuario, ya que hemos implementado un diseño responsivo y adaptado a cualquier dispositivo.

Por otro lado, el html cuenta con una gran semántica y estructura, que junto con los gráficos Highchart que están preparados para ser accesibles, facilita la navegación a través de lectores de pantalla.

## Créditos

Framework CSS: [TailwindCSS](https://tailwindcss.com/)

Gráficos: [Highcharts](https://www.highcharts.com/)

Fuente de Datos: [IMDB Dataset](https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows)

API de Búsqueda: [The Movie Database](https://www.themoviedb.org/)
