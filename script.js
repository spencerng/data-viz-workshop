var graph = document.getElementById("myGraph").getContext("2d");

new Chart(graph, {
  type: "bar",
  data: {
    labels: ["11/12", "11/13", "11/14"],
    dataset: [{data: [1, 2, 3]}]
  }
  
})