// Script created from Uncommon Makes 2021 live workshop demo

var graph = document.getElementById("myGraph").getContext("2d");
var graph2 = document.getElementById("myGraph2").getContext("2d");
var graph3 = document.getElementById("myGraph3").getContext("2d");
var graph4 = document.getElementById("myGraph4").getContext("2d");

new Chart(graph, {
  type: "bar",
  data: {
    labels: ["11/5", "11/9", "11/10", "11/11"],
    datasets: [
      {
        label: "Steps Taken",
        data: [11267, 5600, 9180, 6857]
      }
    ]
  },
  options:{
    scales: {
        y: {
          title: {
            display: true,
            text: "Steps"
          }
        },
        x: {
          title: {
            display: true,
            text: "Date"
          }
        }
      },
  }
});

// https://cdn.glitch.me/a49c971b-4763-44ed-bc77-0b59dee908d9%2Fcereal.csv?v=1636771936463

// Cereal dataset

Papa.parse(
  "https://cdn.glitch.me/a49c971b-4763-44ed-bc77-0b59dee908d9%2Fcereal.csv?v=1636771936463",
  {
    download: true,
    header: true,
    complete: function(result) {
      console.log(result);
      graphCerealData(result.data);
    }
  }
);

function graphCerealData(cerealData) {
  var cerealCalories = cerealData.map(cereal => cereal.calories);
  var names = cerealData.map(cereal => cereal.name);
  // console.log("names", names);
  // console.log("calories", cerealCalories);

  new Chart(graph2, {
    type: "bar",
    data: {
      labels: names,
      datasets: [
        {
          label: "Cereal Calories",
          data: cerealCalories
        }
      ]
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: "Calories"
          }
        },
        x: {
          title: {
            display: true,
            text: "Cereal"
          }
        }
      },
    }
  });
  
  var points = cerealData.map(cereal => ({x: cereal.fiber, y: cereal.calories}))
  console.log("cereal points", points)
  
  new Chart(graph3, {
    type: "scatter",
    data: {
      labels: names,
      datasets: [
        {
          label: "Fiber vs. Calories",
          data: points,
          backgroundColor: "#000000"
        }
      ]
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: "Calories"
          }
        },
        x: {
          title: {
            display: true,
            text: "Fiber [g]"
          }
        }
      },
    }
  });
  
}

// 

Papa.parse(
  "https://cdn.glitch.me/a49c971b-4763-44ed-bc77-0b59dee908d9%2Fspeed-camera-violations.csv?v=1636773054841",
  {
    download: true,
    header: true,
    complete: function(result) {
      console.log(result);
      graphCamData(result.data);
    }
  }
);

function graphCamData(camData) {
  var zipCodeCounter = new Object();
  
  for (var i = 0; i < camData.length; i++) {
    var zipCode = camData[i]["Zip Codes"];
    if (zipCode in zipCodeCounter) {
      zipCodeCounter[zipCode] += 1
    } else {
      zipCodeCounter[zipCode] = 1
    }
  }
  
  console.log(zipCodeCounter)
  
  new Chart(graph4, {
    type: "pie",
    data: {
      labels: Object.keys(zipCodeCounter),
      datasets: [
        {
          label: "Traffic Violations Per Zip Code",
          data: Object.values(zipCodeCounter),
        }
      ]
    }
  });
  
}