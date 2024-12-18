function buscarPelicula(event) {
  event.preventDefault();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  // Obtenemos el valor del input con el id "nombre_pelicula" del formulario
  let nombrePelicula = document.getElementById("nombre_pelicula").value;

  fetch(
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=es-ES&page=1&query=" +
      nombrePelicula +
      "&api_key=89189a800c1bb9ba924a9573efd695af",
    options,
  )
    .then((res) => res.json())
    .then((res) => {
      // Coger la primera pelicula de la lista de resultados
      let pelicula = res.results[0];

      // Modificamos el DOM con los datos de la pelicula
      document.getElementById("img_pelicula").src =
        "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
      document.getElementById("titulo_pelicula").innerHTML = pelicula.title;
      document.getElementById("pelicula_year").innerHTML =
        pelicula.release_date;
      document.getElementById("descripcion_pelicula").innerHTML =
        pelicula.overview;
    })
    .catch((err) => console.error(err));
}
