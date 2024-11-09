function graficoporDecada() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const data = JSON.parse(xmlhttp.responseText);
      const decades = data.map((item) => item.decade);
      const movie_count = data.map((item) => parseInt(item.movie_count));
      console.log(movie_count);
      crearChart(decades, movie_count);
    }
  };

  xmlhttp.open("GET", "database.php?hola=decadas", true);
  xmlhttp.send();
}

function crearChart(xAxis, yAxis) {
  Highcharts.chart("container", {
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

graficoporDecada();
