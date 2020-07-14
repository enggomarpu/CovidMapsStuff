import React, { Component, useEffect, useState, useContext, useReducer } from 'react';
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import {VectorMap} from 'react-jvectormap';
import { fetchCountries } from './ApiCalls';

const mapStyles = {
  width: '80%',
  height: '100%',
  
};

// export class App extends Component {
//   render() {
//     return (
//       // <Map
//       //   google={this.props.google}
//       //   zoom={2}
//       //   style={mapStyles}
//       //   initialCenter={{
//       //    lat: 0,//30.375321,
//       //    lng: 0//69.345116
//       //   }}
//       // />
     
//     );
//   }
// }
const App = () => {
  const [countriesList, setData] = useState();
  const [loadingState, setloadingState] = useState(false);
  const [map, setMap] = useState();
  let mapObject = React.createRef();



  const fetchAPI = async() => {
    setData(await fetchCountries());
    setloadingState(true); 
}
useEffect(() => {
    fetchAPI();
  }, []);

  const mapData = {}; let totalCases;
  let max = 0; let name; let markerSize = []; let markerSizeObj = {};
  let countryMarker = [];
  let countryToolTip = [];
  if(loadingState){

    countriesList.map((country) => {
       countryMarker.push({latLng:[country.countryInfo.lat, country.countryInfo.long], name: country.country })
    });
    
       countriesList.map((c) => {
       mapData[c.countryInfo.iso2] = c.cases;
       markerSizeObj[c.countryInfo.iso2] = c.todayCases;
       countryToolTip[c.country] = {Active: c.cases, Deaths: c.deaths}
       markerSize.push(c.todayCases);
    //   if(c.deaths === 6){
    //     name = c.country;
    //   }
    //   if(parseInt(c.deaths) < 122269 ){
    //     max = parseInt(c.deaths)
    //   }  
     });

  }
  const showMarkerTip = (e, code) => {

    // let contai = document.querySelector('.jvectormap-container');
    // console.log('object in custom', mapObject.current.$mapObject);
    // var left;
    // var top;
    // contai.addEventListener('mousemove', function(ev){
    //    left = ev.pageX
    //    top = ev.pageY;

    //   if (left < 5) {
    //     left = ev.pageX + 15;
    //   }
    //   if (top < 5) {
    //     top = ev.pageY + 15;
    //   }
    //   console.log('left****', left);
    //   console.log('top****', top);
    //       }); 

    // const markerTip = document.querySelector('.jvectormap-tip');
    // //console.log(`x:, ${x} y: ${y}`);
    // markerTip.insertAdjacentHTML('afterend', `<div class="jvectormap-tip"
    // style="display: block; left: ${left}; top: ${top}">Hello</div>`);
    console.log('show marker tip');
    
     
  }
  const hideMarkerTip = (e, code) => {
    const markerTip = document.querySelector('.jvectormap-tip');
    markerTip.remove();
  }

  // const totalCases = loadingState ? countriesList.map((country) => parseInt(country.cases)) : null;
  // console.log(mapData);
  // console.log('max number', max)
   //console.log('marker sizes', markerSize)

  return(
    <div style={{width: '100%', height: '50vw'}}>

    <VectorMap map={'world_mill'}
               ref = {mapObject}
               backgroundColor="rgba(246, 247, 251,0.9)"
               hoverOpacity = '0'
               regionStyle = { 
                {
                initial: {
                  fill: '#d6e7e9'
                },
                selected: {
                  fill: '#F4A582'
                }
              }
            }


            
              // series = {
              //   {
              //     regions: [{
              //       values: mapData,
              //       scale: ['#C8EEFF', '#0071A4'],
              //       normalizeFunction: 'polynomial'
              //     }]
              //   }
              //  }
              //  onRegionTipShow = {
              //    function(e, el, code){
              //   el.html(el.html()+' (mapData - '+mapData[code]+')');
              //   console.log(el);
              //  }
              // }

              hoverColor = {true}
            
              //  markerStyle = {
              //   {
              //     initial: {
              //       fill: 'red',
              //       //opacity: 0.8,
              //       stroke: 'transparent',
              //       "fill-opacity": 1,
              //       "stroke-width": 1,
              //       "stroke-opacity": 0,
              //       // r: 5.5
              //     },
              //     hover: {
              //       stroke: 'black',
              //       "stroke-width": 2,
              //       cursor: 'pointer'
              //     },
              //     selected: {
              //       fill: 'blue'
              //     },
              //     selectedHover: {
              //     }
              //   }
              //  }
              regionLabelStyle ={ {
                initial: {
                  'font-weight': 'normal',
                  'text-align': 'right',
                  fill: 'white'
                },
                hover: {
                  fill: 'black'
                }
              }
            }
            labels ={ {
              regions: {
                render: function(code){
                  var doShow = ['US', 'PK', 'AT'];
                  var Countries = ['USA', 'Pakistan', 'Österreich']
      
                  var index = doShow.indexOf(code);
                  if ( index != -1) {
                    return Countries[index];
                  }
                }
              }
            }
          }
              //  markers = {[{latLng: [41.90, 12.45], name: 'Vatican City'},
              //  {latLng: [43.73, 7.41], name: 'Monaco'}]}
            //   series = {
            //     {
            //     markers: [{
            //       attribute: 'fill',
            //       // scale: ['#FEE5D9', '#A50F15'],
                  
            //         min: 5,
            //         max: 200
            //     },{
            //       attribute: 'r',
            //       scale: [5, 15],
            //       values: markerSize,
            //       min: 5,
            //       max: 200
            //     }]
            //   }
            // }
            // series = {
            //       {
            //       markers: [{
            //       attribute: 'fill',
            //       scale: ['#FEE5D9', '#A50F15'], 
            //       legend: {
            //           horizontal: true
            //       },
            //       min: 5,
            //       max: 200
            //       },{
                  
            //       },
            //       {
            //         attribute: 'r',
            //         scale: [5, 15],
            //         values: markerSize,
            //         min: 5,
            //         max: 200
            //       }]
            //     }
            //    }
            series={
              {
              markers: [{
                  attribute: 'fill',
                  scale: ['#FEE5D9', '#A50F15'],
                  normalizeFunction: 'polynomial',
                  values: markerSize,
                  legend: {
                    horizontal: true
                  }
                },{
                  attribute: 'r',
                  scale: [5, 7],
                  values: markerSize,
                  min: 5,
                  max: 200
                        
                }],
              }
            }
            // ref = {(map) => {setMap(getMapObjct)}}
            onMarkerTipShow = {
                  function(e, el, code){
                    let left, top;
                //     var markers = $('#world-map').vectorMap('get', 'mapObject').markers;
                //  el.html(el.html()+' (todayCases - '+mapData[code]+')');
                // //el.html(el.html() + '<p id=\"popop\">test</p>').css(\"fontSize\",\"25px\");
                //  console.log(el);
                // console.log('event', e);
                // console.log('element', el);
                // console.log('code', code);
               // console.log(el)
                //console.log(countryToolTip[el.html]);
                //el.html(el.html()+' <br>(todayCases - '+countryToolTip[el.html()].Active+')')
                
    //              var x = mapObject.current.$mapObject.markers[code].element.config.cx
    //              var y = mapObject.current.$mapObject.markers[code].element.config.cy;    

    //               console.log('object in markertipshow', mapObject.current.$mapObject)
                  let contai = document.querySelector('.jvectormap-container');
                     contai.addEventListener('mousemove', function(ev){
       left = parseInt(ev.pageX-15-mapObject.current.$mapObject.tipWidth);
       top = ev.pageY-15-mapObject.current.$mapObject.tipHeight;

      if (left < 5) {
        left = ev.pageX + 15;
      }
      if (top < 5) {
        top = ev.pageY + 15;
      }
      // console.log('left****', left);
      // console.log('top****', top);
      // console.log('left direc', ev.pageX-15-mapObject.current.$mapObject.tipWidth)
    }); 

                                   
    mapObject.current.$mapObject.tip.css({
      left: left,
      top: top
    });
                // console.log('x:', x);
                // console.log('y:', y);
            console.log('map obj', mapObject.current.$mapObject);        
                      
                 el.html(el.html()+ `<br><div class="tooltipMarker"><p>Confirmed: 
                 <span>${countryToolTip[el.html()].Active}</span></p>
                 <p>Recovered: <span>${countryToolTip[el.html()].Deaths}</span></p>
                 <p>Deaths: <span>${countryToolTip[el.html()].Active}</span></p>
                 <p>Active: <span>${countryToolTip[el.html()].Deaths}</span></p></div>`)

            
                 //return false;
               //console.log('event onmakertipshow', e)
                
                }
               }
               onMarkerOver = {
                function(e, el, code){
                  //showMarkerTip(e, el)
                } 
               }
               onMarkerOut ={
                function(e, code){
                 // hideMarkerTip(e, code)
                }
               }
               onRegionTipShow = {
                 function(e, el, code){
                   //console.log('region tip show', code)
                   e.preventDefault();
                  // el.html(el.html()+' (todayCases - '+mapData[code]+')');
              }
            }
             onRegionLabelShow = {
                function(event, label, code) {
                  // label.html(label.html()+' (todayCases - '+mapData[code]+')');
                  event.preventDefault();
                }
           }
        //     onRegionLabelShow = {
        //       function(e, el, code){
        //        el.html(el.html()+' (todayCases - '+mapData[code]+')');
        //    }
        //  }
              markers = {countryMarker} 
               containerStyle={{
                   width: '100%',
                   height: '100%'
               }}
               containerClassName="map"
    />
    <button onClick={showMarkerTip}>Button</button>
</div>
  );
}

export default App;