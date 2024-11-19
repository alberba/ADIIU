function graficoporDecada() {
  console.log("graficoporDecada");
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const data = JSON.parse(xmlhttp.responseText);
      const decades = data.map((item) => item.decade);
      const movie_count = data.map((item) => parseInt(item.movie_count));
      console.log(movie_count);
      crearChartBarras(decades, movie_count);
    }
  };

  xmlhttp.open("GET", "database.php?grafico=decadas", true);
  xmlhttp.send();
}

function graficoGeneros() {
  console.log("graficoGeneros");
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

function crearChartBarras(xAxis, yAxis) {
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
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
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

graficoporDecada();
graficoGeneros();
