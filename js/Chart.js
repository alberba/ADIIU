fetch("database.php?grafico=decadas")
  .then((response) => response.json())
  .then((data) => {
    // Convertir los datos a un formato que Highcharts pueda entender
    const decades = data.map((item) => item.decade);
    // Hemos de convertir los valores de movie_count a números
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
        "The following chart shows the number of movies from the IMDB Top 1000 by decade. As we can observe, most of the movies are from the 2000s onward.",
    },
    caption: {
      text: "A bar chart showing the number of movies from the IMDB Top 500 by decade.",
    },
    title: {
      text: "Nº Movies by Decade",
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
        '<td style="padding:0"><b>{point.y:.0f} movies</b></td></tr>',
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
        name: "Movies",
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

  // Convertir las cantidades a porcentajes ya que asi es como lo entiende Highcharts
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
        "The following chart shows the percentage of movies from the IMDB Top 1000 by genre. As we can observe, the most common genre is Drama.",
    },
    caption: {
      text: "A pie chart showing the percentage of movies from the IMDB Top 1000 by genre.",
    },
    title: {
      text: "Movies by Genre",
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
        name: "Amount",
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
        "The following chart displays the top 3 highest-grossing movies by genre. As we can observe, action movies are the highest-grossing.",
    },
    title: {
      text: "Top 3 Movies by Grossing",
    },
    caption: {
      text: "A bar chart showing the top 3 highest-grossing movies by genre.",
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
