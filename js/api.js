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
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=" +
      nombrePelicula +
      "&api_key=89189a800c1bb9ba924a9573efd695af",
    options,
  )
    .then((res) => res.json())
    .then((res) => {
      // Coger la primera pelicula de la lista de resultados
      let pelicula = res.results[0];

      if (!pelicula) {
        document.getElementById("titulo_pelicula").innerHTML =
          "Movie not found";
        document.getElementById("descripcion_pelicula").innerHTML =
          "Sorry, we couldn't find the movie you were looking for.";
      } else {
        let imgElement = document.createElement("img");
        imgElement.className =
          "float-left mr-4 h-auto w-1/5 max-w-44 object-contain lg:w-1/3 lg:max-w-32";
        imgElement.id = "img_pelicula";
        // Modificamos el DOM con los datos de la pelicula
        imgElement.src =
          "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
        imgElement.alt = "Image of " + pelicula.title + "'s movie";

        let headElement = document.createElement("h3");
        headElement.id = "titulo_pelicula";
        headElement.className = "text-xl font-bold";
        headElement.innerHTML = pelicula.title;
        
        document.getElementById("pelicula_year").innerHTML =
          pelicula.release_date;
        document.getElementById("descripcion_pelicula").innerHTML =
          pelicula.overview;

        // Añadimos la imagen al DOM
        let articleElement = document.querySelector("article.flex");
        articleElement.insertBefore(imgElement, articleElement.firstChild);
      }
    })
    .catch((err) => console.error(err));
}
