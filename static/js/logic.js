const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Create a Leaflet map object.
let myMap = L.map("map", {
 center: [40.7, -9.5],
 zoom: 3,

});
 


// Add a Leaflet tile layer.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
    "Street Map": streetmap
}



//define the earthquake layergroup 
d3.json(url).then(function(data) {

    console.log(data);
   

  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
  
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: "
        + feature.properties.mag
        + "<br>Depth: "
        + feature.geometry.coordinates[2]
        + "<br>Location: "
        + feature.properties.place
      );
    }
  }).addTo(myMap);



    // Give each feature a popup describing the earthquak
    function styleInfo(feature) {
      return {
          color: "#000000",
          weight: 0.5,
          radius: chooseRadius(feature.properties.mag), //sets radius based on magnitude 
          fillColor: chooseColor(feature.geometry.coordinates[2]) //sets fillColor based on the depth of the earthquake
      };
    }
    
    //define a function to choose the fillColor of the earthquake based on earthquake depth
    function chooseColor(depth) {
      //let depth = feature.geometry.coordinates[2];
      console.log("depth", depth);
      var color = ""
      if (depth > 90){
        color = "blue"

      }
      
      else if  (depth > 70){
        color = "orange"
      }

      else if (depth > 50) {
        color = "red"
      }

      else if (depth > 30) {
        color = "yellow"
      }
       
      else if (depth > 10){
        color = "brown"
 
      }
      else  {color = "green"}


      return color;
    };
    
    //define a function to determine the radius of each earthquake marker
    function chooseRadius(magnitude) {
      return magnitude*5;
    };
    
    
    
    let colors = [
      "blue",
      "orange",
      "red",
      "yellow",
      "brown",
      "green"];
    
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "legend");
        labels = ['<strong>categories</strong>'],
        categories = ['depth > 90', 'depth > 70', 'depth > 50', 'depth > 30', 'depth > 10', 'depth > -10'];
        for (let i = 0; i < colors.length; i++){
          div.innerHTML +=
          labels.push(
            '<i class="circle" style="background:' + colors[i] + '"></i>' +
            (categories[i] ? categories[i] : '+'));
    
        }
        div.innerHTML = labels.join('<br>');
    
        
        return div;
      };
      //add the legend to the map
      legend.addTo(myMap);
    
    
});
  
 






    






