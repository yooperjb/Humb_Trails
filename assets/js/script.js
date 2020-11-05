

require([ 
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/TileLayer",
    "esri/layers/FeatureLayer" ], 
    function(Map, MapView, TileLayer, FeatureLayer) {
    
    var transportationLayer = new TileLayer({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
        id: "streets",
        opacity: 0.7
    });

    var housingLayer = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
        id: "ny-housing"
      });
    
    // points to a hosted Feature Layer in ArcGIS Online (Eureka Trustee Areas)
    const trustee = new FeatureLayer({
        portalItem: {  // autocasts as esri/portal/PortalItem
        id: "7e6db93006ff4b30ac401871d2cf3991"
      }
    });

    //map.add(fl);  // adds the layer to the map


    
    // Code to create the map and view will go here
    var map = new Map({
        basemap: "topo-vector",
        layers: [housingLayer, transportationLayer,trustee] // Layers can be added as an arrary
    });
    
    var view = new MapView({
        container: "viewDiv", // Reference to the DOM node that will contain the view
        map: map // References the map object created in step 3
      });
    
    // can also add layers with map.layers.add
    //map.layers.add(transportationLayer);
    var streetsLayerToggle = document.getElementById("streetsLayer");
    
    // Listen to the change event for the checkbox
    streetsLayerToggle.addEventListener("change", function(){
        // When the checkbox is checked (true), set the layer's visibility to true
        transportationLayer.visible = streetsLayerToggle.checked;
    });
    
    
    view.on("layerview-create", function(event) {
        if (event.layer.id === "ny-housing") {
          // Explore the properties of the housing layer's layer view here
          console.log("LayerView for New York housing density created!", event.layerView);
        }
        if (event.layer.id === "streets") {
          // Explore the properties of the transportation layer's layer view here
          //console.log("LayerView for streets created!", event.layerView);
        }
    });

    // When the layer's promise resolves, animate the view to the layer's fullExtent
    trustee.when(function() {
        view.goTo(trustee.fullExtent);
    });
});
