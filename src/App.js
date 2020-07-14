import React, { Component, useEffect, useState, useContext, useReducer } from 'react';
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import {VectorMap} from 'react-jvectormap';
import { fetchCountries } from './ApiCalls';
import MapChart from './amMap';
//import MapChart from './amchart';
//import MapChart from './amchart2';


const mapStyles = {
  width: '80%',
  height: '100%',
  
};

const App = () => {
  const [countriesList, setData] = useState();
  const [loadingState, setloadingState] = useState(false);
  const [map, setMap] = useState();
  


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
    if(countriesList.length > 0){
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
  }

  

  return(
       <div style={{ width: '80%', margin: '0 auto' }}>
        <MapChart countrycode="US"/>
       
        
      </div>
    
  );
}

export default App;
