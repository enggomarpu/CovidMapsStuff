import React from 'react';
import StateContext from '../ContextFolder/StateContext';

function MapChart(props) {
  const {countriesData, loadingCountries} = useContext(StateContext);

  useEffect(()=>{

    let chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.seriesContainer.background.fill = am4core.color("#ffffff")

    // Set map definition
    chart.geodataSource.url =
      "https://www.amcharts.com/lib/4/geodata/json/worldLow.json";
    chart.geodataSource.events.on("parseended", function (event) {
      let data = [];
      let data1 = [];
      let markers = [];

      countriesData.map((country) => {
        data1.push({
          id: country.countryInfo.iso2,
        //   value: { confirmed: country.confirmed, recovered: country.recovered, 
        //            deaths: country.deaths, active: country.active },
        value: country.cases
         });
        markers.push({
          
          id: country.countryInfo.iso2,
          title: country.country,
          confirmed: country.cases,
          active: country.active,
          recovered: country.recovered,
          deaths: country.deaths,
          latitude: country.countryInfo.lat,
          longitude: country.countryInfo.long,

        });
      });
      for (var i = 0; i < event.target.data.features.length; i++) {
        data.push({
          id: event.target.data.features[i].id,
          value: something[12].cases,
        });
      }
      //console.log("data", data);
      //console.log("dtata", data1);
      polygonSeries.data = data1;
      imageSeries.data = markers;
    });

    // Set projection
    chart.projection = new am4maps.projections.Miller();
  

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Set initial zoom
    chart.homeZoomLevel = 1;

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.mapPolygons.template.strokeWidth = 1.0;

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.exclude = ["AQ"];
   

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.propertyFields.id = "id";

    
    // polygonSeries.heatRules.push({
    //   "property": "fill",
    //   "target": polygonSeries.mapPolygons.template,
    //   "min": am4core.color("#ffffff"),
    //   "max": am4core.color("#AAAA00")
    // });

    //polygonTemplate.tooltipHTML = `{name} <br> <span>Active:<b>{value.active}</b>`;
    polygonTemplate.fill = am4core.color("#d6e7ea");

    //polygonSeries.mapPolygons.template.tooltipPosition = "fixed";
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Create active state
    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = chart.colors.getIndex(1);

    // Create an event to toggle "active" state
    polygonTemplate.events.on("hit", function (event) {
      event.target.isActive = !event.target.isActive;
    });

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    let imageSeriesTemplate = imageSeries.mapImages.template;
   
    
    imageSeries.tooltip.showInViewport = false;
    imageSeries.tooltip.fontSize = 10;
    imageSeries.tooltip.paddingBottom = 30;  
    imageSeries.tooltip.background.fillOpacity = 1.0;
    imageSeries.tooltip.getStrokeFromObject = false;
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.background.fill = am4core.color("#00272b");


    imageSeriesTemplate.tooltipPosition = "fixed";
    imageSeriesTemplate.tooltipHTML = `<div class="tooltip">
                                         <b>{title}</b><br>
                              <span>Confirmed:<b class = tooltip__conf> {confirmed}</b></span><br>
                              <span>Active:<b class = tooltip__act> {active}</b></span><br>
                              <span>Recovered:<b class = tooltip__rec> {recovered}</b></span><br>
                              <span>Deaths:<b class = tooltip__deaths> {deaths}</b></span><br></div>`;
                              
    imageSeries.dataFields.id = "id";
    imageSeries.dataFields.value = "active";                                    
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    if (imageSeries){
      console.log('image pk', imageSeries);
    }

    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    //circle.radius = 4;
    //circle.stroke = am4core.color("#FFFFFF");
    //circle.strokeWidth = 2;
    circle.fill = am4core.color("#ff0000");
    circle.fillOpacity = 0.5
    circle.nonScaling = true;
    circle.tooltipText = "{title}";
    imageSeries.heatRules.push({
      "target": circle,
      "property": "radius",
      "min": 3,
      "max": 30,
      "dataField": "value"
    })
    // var heatLegend = chart.createChild(am4maps.HeatLegend);
    //   heatLegend.series = polygonSeries;
    //   heatLegend.width = am4core.percent(100);

    //   polygonSeries.mapPolygons.template.events.on("over", function(ev) {
    //     if (!isNaN(ev.target.dataItem.value)) {
    //       heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
    //     }
    //     else {
    //       heatLegend.valueAxis.hideTooltip();
    //     }
    //   });

    //   polygonSeries.mapPolygons.template.events.on("out", function(ev) {
    //     heatLegend.valueAxis.hideTooltip();
    //   });

    
    //this.chart = chart;
    chart.events.on("ready", triggerPK)
  }, [])
    return (
        <div>
            <div id="chartdiv" style={{ width: "100%", height: "750px" }}></div>
        <button onClick={() => this.triggerTooltip("AF")}>Hello</button>
        <a href="_blank" onMouseEnter={() => this.triggerTooltip("AF")} 
            onMouseLeave={() => this.triggerTooltip("AF")}>Click</a>
        </div>
    );
}

export default MapChart;