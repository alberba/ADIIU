<?php
header("Content-Type: application/json");

$grafico = $_GET["grafico"];
$conexion = mysqli_connect("localhost", "root", "");
$bd = mysqli_select_db($conexion, "csv_db 6");
if ($grafico == "decadas") {
    $sql = "SELECT FLOOR(Released_Year / 10) * 10 AS decade, 
            COUNT(*) AS movie_count
            FROM 
                imdb_top_1000
            GROUP BY 
                decade
            HAVING
                decade > 0
            ORDER BY 
                decade;";

    $result = mysqli_query($conexion, $sql);

    echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
} elseif ($grafico == "generos") {
    $sql = "SELECT TRIM(SUBSTRING_INDEX(Genre, ',', 1)) AS primer_genero,
            COUNT(*) AS cantidad
            FROM 
                imdb_top_1000
            GROUP BY 
                primer_genero
            ORDER BY 
                cantidad DESC;";

    $result = mysqli_query($conexion, $sql);

    echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
} elseif ($grafico == "recaudacion") {
    $sql = "WITH TopGenres AS (
                SELECT 
                    TRIM(SUBSTRING_INDEX(Genre, ',', 1)) AS primer_genero,
                    COUNT(*) AS cantidad
                FROM 
                    imdb_top_1000
                GROUP BY 
                    primer_genero
                ORDER BY 
                    cantidad DESC
                LIMIT 5
            ),
            TopMovies AS (
                SELECT 
                    TRIM(SUBSTRING_INDEX(Genre, ',', 1)) AS primer_genero,
                    Series_Title,
                    Gross,
                    ROW_NUMBER() OVER (PARTITION BY TRIM(SUBSTRING_INDEX(Genre, ',', 1)) ORDER BY Gross DESC) AS rn
                FROM 
                    imdb_top_1000
                WHERE 
                    TRIM(SUBSTRING_INDEX(Genre, ',', 1)) IN (SELECT primer_genero FROM TopGenres)
            )
            SELECT 
                tm.primer_genero,
                tm.Series_Title,
                FORMAT(tm.Gross / 1000000, 2) AS Gross
            FROM 
                TopMovies tm
            JOIN 
                TopGenres tg ON tm.primer_genero = tg.primer_genero
            WHERE 
                tm.rn <= 3
            ORDER BY 
                tg.cantidad DESC, tm.primer_genero, tm.Gross DESC;";

    $result = mysqli_query($conexion, $sql);

    echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
} else {
    echo "No se encontro la opcion";
}

mysqli_close($conexion);
