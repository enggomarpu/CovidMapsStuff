/**
 * Created by yhon.
 */
import React from "react";
//import AmCharts from "amcharts3-react";
import AmCharts from "@amcharts/amcharts3-react";
import {fetchCountries} from './ApiCalls';

export default class MapChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countriesData: [],
            data: []
        }
    }

   async componentDidMount() {
        let tempArr = [];
        let makers = [];
       const something = await fetchCountries();
       something.map((country)=>{
         tempArr.push({id: country.countryInfo.iso2, 
            title: `${country.country} <br> Active: ${country.cases}`});
       })
       this.setState({ data: tempArr, countriesData: something })
    }

    render(){
        

        return (
            <div style={{height:"400px"}}>
                <AmCharts
                    type= "map"
                    theme= "light"
                    mouseWheelZoomEnabled = {true}
                    colorSteps = {10}
                    dataProvider = {{
                      "map": "worldLow",
                      "areas": this.state.data,
                      "images": [
                          {
                              "id": 'AF',
                            "type": "circle",
                            "latitude": 48.856614,
                            "longitude": 2.352222,
                            "title": 'Pakistan'
                          }
                        ]
                  }}            
                    areasSettings = {{
                      "autoZoom": true
                  }}
                  valueLegend ={{
                      "right": 10,
                      "minValue": "little",
                      "maxValue": "a lot!"
                  }}
                //   listeners = [{
                //     "event": descriptionClosed,
                //     method: function(ev) {
                //         this.chart = ev.chart
                //         console.log('event', ev)
                //     }
                // }]
                />
            </div>
        )
    }
}
