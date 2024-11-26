function graficoporDecada() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const data = JSON.parse(xmlhttp.responseText);
      const decades = data.map((item) => item.decade);
      const movie_count = data.map((item) => parseInt(item.movie_count));
      crearChartBarrasDecada(decades, movie_count);
    }
  };

  xmlhttp.open("GET", "database.php?grafico=decadas", true);
  xmlhttp.send();
}

function graficoGeneros() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const data = JSON.parse(xmlhttp.responseText);
      crearChartPie(data);
    }
  };

  xmlhttp.open("GET", "database.php?grafico=generos", true);
  xmlhttp.send();
}

function graficoRecaudacion() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const data = JSON.parse(xmlhttp.responseText);
      console.log(data);
      const xAxis = [...new Set(data.map((item) => item.primer_genero))];
      const groupedByGenre = data.reduce((acc, item) => {
        const genre = item.primer_genero;
        if (!acc[genre]) {
          acc[genre] = [];
        }
        acc[genre].push(item);
        return acc;
      }, {});

      // Construir arraySeriesY
      const arraySeriesY = [];
      const maxTop = 3; // Número máximo de top N a considerar

      for (let i = 0; i < maxTop; i++) {
        const topN = Object.keys(groupedByGenre).map((genre) => {
          // Ordenar las películas por recaudación y seleccionar el top N
          const sortedMovies = groupedByGenre[genre]
            .sort(
              (a, b) =>
                parseInt(b.Gross.replace(/,/g, "")) -
                parseInt(a.Gross.replace(/,/g, "")),
            )
            .slice(0, maxTop);

          return {
            name: genre,
            data: sortedMovies[i]
              ? parseFloat(sortedMovies[i].Gross.replace(/,/g, ""))
              : 0, // Si no hay suficiente películas, poner 0
          };
        });

        arraySeriesY.push({
          name: `Top ${i + 1}`,
          data: topN.map((item) => item.data),
        });
      }

      const movieName = data.map((item) => item.Series_Title);

      crearChartBarrasRecaudacion(xAxis, arraySeriesY, movieName);
    }
  };

  xmlhttp.open("GET", "database.php?grafico=recaudacion", true);
  xmlhttp.send();
}

function crearChartBarrasDecada(xAxis, yAxis) {
  Highcharts.chart("grafico1", {
    chart: {
      type: "column",
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

graficoporDecada();
graficoGeneros();
graficoRecaudacion();
