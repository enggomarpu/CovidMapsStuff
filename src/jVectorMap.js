$(function(){
    var map = new jvm.Map({
      map: 'your-map',
      container: $('#map'),
      backgroundColor: '#fff',
      regionsSelectable: true,
      regionsSelectableOne: true,
      regionStyle: {
        initial: {
          fill: '#DBDBDB',
          "fill-opacity": 1,
          stroke: 'black',
          "stroke-width": 0.5,
          "stroke-opacity": 1,
        },
        hover: {
          fill: '#E6165C',
          cursor: 'pointer'
        },
        selected: {
          fill: '#E6165C'
        }
      },
      series: {
        regions: [{
          values: {
            'NL': '#A8A8A8',
            'SW': '#A8A8A8',
            'AT': '#A8A8A8'
          },
          attribute: 'fill'
        }]
      },
      regionLabelStyle: {
        initial: {
          'font-weight': 'normal',
          'text-align': 'right',
          fill: 'white'
        },
        hover: {
          fill: 'white'
        }
      },
      labels: {
        regions: {
          render: function(code){
            var doShow = ['NL', 'SW', 'AT'];
            var Countries = ['NL', 'Schweiz', 'Österreich']

            var index = doShow.indexOf(code);
            if ( index> -1) {
              return Countries[index];
            }
          }
        }
      },
      onRegionClick: function (event, code) {
        alert(code);
      }
    });




    onMarkerTipShow: function (e, el, code) {
        var markers = $('#world-map').vectorMap('get', 'mapObject').markers;  
        el.html(el.html() + '<br /><img src="https://cdn.pixabay.com/photo/2020/06/20/06/34/scenery-5319835_960_720.jpg' 
           + markers[code].config.imgsrc 
           + '"/>').css("fontSize", "15px");
    }



//////
import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// am4core.useTheme(am4themes_animated);

// class LineChart extends Component {
//   componentDidMount() {
//     let chart = am4core.create("chartdiv", am4charts.XYChart);

//     chart.paddingRight = 20;

//     let data = [];
//     let visits = 10;
//     for (let i = 1; i < 366; i++) {
//       visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//       data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
//     }

//     chart.data = data;

//     let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//     dateAxis.renderer.grid.template.location = 0;

//     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//     valueAxis.tooltip.disabled = true;
//     valueAxis.renderer.minWidth = 35;

//     let series = chart.series.push(new am4charts.LineSeries());
//     series.dataFields.dateX = "date";
//     series.dataFields.valueY = "value";

//     series.tooltipText = "{valueY.value}";
//     chart.cursor = new am4charts.XYCursor();

//     let scrollbarX = new am4charts.XYChartScrollbar();
//     scrollbarX.series.push(series);
//     chart.scrollbarX = scrollbarX;

//     this.chart = chart;
//   }

//   componentWillUnmount() {
//     if (this.chart) {
//       this.chart.dispose();
//     }
//   }

//   render() {
//     return (
//       <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
//     );
//   }
// }

// export default LineChart;

//

import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";

class MapChart extends Component {
  render() {
    const config = {
      "type": "map",
      "theme": "light",
      "colorSteps": 10,
      "dataProvider": {
        "map": "usaLow",
        "areas": [{
            "id": "US-AL",
            "value": 4447100
            },{
              "id": "US-AL",
            "value": 4447100
          },
      ]},
      "areasSettings": {
        "autoZoom": true
    },
    "valueLegend": {
        "right": 10,
        "minValue": "little",
        "maxValue": "a lot!"
    },
    "listeners": [{
      "event": "descriptionClosed",
      "method": function(ev) {
          ev.chart.selectObject();
      }
  }]
};
    return (
      <div>
        <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
      </div>
    );
  }
}

export default MapChart;



triggerTooltip(code) {
  let imagesLe = this.chart._series._values[1]._mapImages._values.length;
  let imageFind, polygonFind;
  this.chart._series._values[0]._mapPolygons._values.forEach(image => {
    if(image._dataItem._dataContext.id === code){
      polygonFind = image;
    }
  });
   this.chart._series._values[1]._mapImages._values.forEach(image => {
     if(image._dataItem._dataContext.id === code){
       imageFind = image;
     }
});