fetch("database.php?grafico=decadas")
  .then((response) => response.json())
  .then((data) => {
    const decades = data.map((item) => item.decade);
    const movie_count = data.map((item) => parseInt(item.movie_count));

    crearChartBarrasDecada(decades, movie_count);
  });

fetch("database.php?grafico=generos")
  .then((response) => response.json())
  .then((data) => {
    crearChartPie(data);
  });

fetch("database.php?grafico=recaudacion")
  .then((response) => response.json())
  .then((data) => {
    const xAxis = [...new Set(data.map((item) => item.primer_genero))];
    const movieName = data.map((item) => item.Series_Title);

    const groupedByGenre = {};

    // Agrupamos las recaudaciones por género
    data.forEach((item) => {
      const genre = item.primer_genero;
      if (!groupedByGenre[genre]) {
        groupedByGenre[genre] = [];
      }
      groupedByGenre[genre].push(parseFloat(item.Gross));
    });

    // Preparamos los datos para Highcharts.
    const arraySeriesY = Array.from({ length: 3 }, (_, i) => ({
      name: `Top ${i + 1}`,
      data: xAxis.map((genre) => {
        return groupedByGenre[genre][i];
      }),
    }));

    crearChartBarrasRecaudacion(xAxis, arraySeriesY, movieName);
  });

function crearChartBarrasDecada(xAxis, yAxis) {
  Highcharts.chart("grafico1", {
    chart: {
      type: "column",
    },
    accessibility: {
      description:
        "La siguiente gráfica muestra el número de películas del Top 1000 de IMDB por decadas. Como podemos observar, vemos que la mayoría de peliculas son de la decada de los 2000 hacia adelante",
    },
    title: {
      text: "Nº Peliculas por decada",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: xAxis,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      max: 250,
      title: {
        text: "",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0"></td>' +
        '<td style="padding:0"><b>{point.y:.0f} películas</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },
    },
    series: [
      {
        name: "Películas",
        colorByPoint: true,
        data: yAxis,
      },
    ],
    legend: {
      enabled: false,
    },
  });
}

function crearChartPie(data) {
  // Calcular el total de todas las cantidades
  const total = data.reduce((sum, item) => sum + parseInt(item.cantidad), 0);

  // Convertir las cantidades a porcentajes
  const pieData = data.map((item) => ({
    name: item.primer_genero,
    y: parseInt(item.cantidad),
    percentage: (parseInt(item.cantidad) / total) * 100,
  }));

  Highcharts.chart("chartPie", {
    chart: {
      type: "pie",
    },
    accessibility: {
      description:
        "La siguiente gráfica muestra el porcentaje de películas que hay por género en el Top 1000 de IMDB. Las películas de drama, acción y comedia suponen mas de la mitad de las películas",
    },
    title: {
      text: "Porcentaje de películas por género",
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: false,
          },
        ],
      },
    },
    series: [
      {
        name: "Cantidad",
        colorByPoint: true,
        data: pieData,
      },
    ],
  });
}

function crearChartBarrasRecaudacion(xAxis, arraySeriesY, moviesName) {
  Highcharts.chart("grafico3", {
    chart: {
      type: "bar",
    },
    accessibility: {
      description:
        "La siguiente gráfica muestra las 3 películas con mayor recaudación por género. Podemos observar que las películas de acción son las más taquilleras",
    },
    title: {
      text: "Top 3 de películas con mayor recaudación por género",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: xAxis,
      gridLineWidth: 1,
      lineWidht: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0"></td>' +
        '<td style="padding:0"><b>{point.y:.2f}M  </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      bar: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return moviesName[this.point.index * 3 + this.series.index];
          },
        },
        groupPadding: 0.1,
      },
    },
    series: arraySeriesY,
    legend: {
      enabled: false,
    },
  });
}
