<?php
  header('Content-Type: application/json');

  $hola = $_GET['hola'];
  $conexion = mysqli_connect("localhost","root","");
  $bd = mysqli_select_db($conexion, "imdb_db");
  if($hola == "decadas"){
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
  } else {
    echo "No se encontro la opcion";
  }
    
    mysqli_close($conexion);
  
?> 