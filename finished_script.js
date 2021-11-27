// Template code for what a finished webpage could look like

var graph = document.getElementById("myGraph").getContext("2d");
var graph2 = document.getElementById("myGraph2").getContext("2d");
var graph3 = document.getElementById("myGraph3").getContext("2d");
var graph4 = document.getElementById("myGraph4").getContext("2d");
var graph5 = document.getElementById("myGraph5").getContext("2d");

// Manual graph

var walkChart = new Chart(graph, {
  type: "bar",
  data: {
    labels: ["11/10", "11/11", "11/12"],
    datasets: [
      {
        label: "Steps Taken",
        data: [10000, 12000, 5000]
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Steps Per Day"
      }
    },
    responsive: true
  }
});

// Calorie Data

Papa.parse(
  "https://cdn.glitch.me/216e4103-705c-4852-b096-8f86345d55a1%2Fcereal.csv?v=1636618297328",
  {
    download: true,
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: function(results) {
      createCalChart(results.data);
    }
  }
);

function createCalChart(cerealData) {
  var labels = cerealData.map(d => d.name);
  var data = cerealData.map(d => d.calories);

  var myChart = new Chart(graph2, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "calories",
          transpose: true,
          indexAxis: "y",
          data: data,
          backgroundColor: "rgba(153,255,51,0.4)"
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Most Unhealthy Cereal",
          padding: {
            top: 10,
            bottom: 30
          }
        },
        responsive: false,
        maintainAspectRatio: true
      }
    },

  });

  var points = cerealData.map(d => ({ x: d.calories, y: d.rating }));

  var whyUnhealthy = new Chart(graph3, {
    type: "scatter",
    data: { datasets: [{ data: points, backgroundColor: "#FF0000" }] },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Calories and Cereal Rating"
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Rating"
          }
        },
        x: {
          title: {
            display: true,
            text: "Calories"
          }
        }
      },
      responsive: false,
      maintainAspectRatio: true
    }
  });

  // Chicago ELectricity

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  Papa.parse(
    "https://cdn.glitch.me/216e4103-705c-4852-b096-8f86345d55a1%2FEnergy_Usage_2010.csv?v=1636619814020",
    {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function(results) {
        createChart(results.data);
      }
    }
  );

  function createChart(energyData) {
    var neighborhoodEnergy = new Object();

    var colors = new Array();

    for (var i = 0; i < energyData.length; i++) {
      var neighborhood = energyData[i]["COMMUNITY AREA NAME"];
      var energy = energyData[i]["TOTAL KWH"];

      if (neighborhood in neighborhoodEnergy) {
        neighborhoodEnergy[neighborhood] += energy;
      } else {
        neighborhoodEnergy[neighborhood] = energy;
      }
    }

    for (var i = 0; i < Object.keys(neighborhoodEnergy).length; i++) {
      colors.push(getRandomColor());
    }

    var myChart = new Chart(graph4, {
      type: "pie",
      data: {
        labels: Object.keys(neighborhoodEnergy),
        datasets: [
          {
            data: Object.values(neighborhoodEnergy),
            backgroundColor: colors
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "Chicago Electricity Usage, 2010",
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },
        responsive: false,
        maintainAspectRatio: true
      }
    });
  }
}

// Star Wars Characters

Papa.parse(
  "https://cdn.glitch.me/216e4103-705c-4852-b096-8f86345d55a1%2FSW_EpisodeIV.txt?v=1636765616152",
  {
    download: true,
    header: true,
    skipEmptyLines: true,
    delimiter: " ",
    dynamicTyping: true,
    complete: function(results) {
      console.log(results.data);
      graphStarWarsCharacters(results.data);
    }
  }
);

function graphStarWarsCharacters(starWarsScript) {
  var characterCounter = new Object();

  for (var i = 0; i < starWarsScript.length; i++) {
    var elem = starWarsScript[i];
    var character = elem["character"];
    if (character in characterCounter) {
      characterCounter[character] += 1;
    } else {
      characterCounter[character] = 1;
    }
  }

  var characters = Object.keys(starWarsScript);
  for (var i = 0; i < characters.length; i++) {
    if (characters[i] < 20) {
      delete characterCounter[characters[i]];
    }
  }

  new Chart(graph5, {
    type: "bar",
    data: {
      labels: Object.keys(characterCounter),
      datasets: [
        {
          transpose: true,
          indexAxis: "y",
          label: "Star Wars Character Dialog",
          data: Object.values(characterCounter)
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Star Wars Dialog"
        }
      },

    }
  });
}
