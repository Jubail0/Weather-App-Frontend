import React from 'react'
import './App.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Pagination from './Components/Pagination';
import sun from './icons/sun.png'
import clouds from './icons/clouds.png'
import tempIcon from './icons/temp.png'

const getIcon = (_iconSize)=>{
return L.icon({
  iconUrl: require('../src/icons/map-marker-icon.png'),
  iconSize:[_iconSize]
})
}

function App() {
  const countryPosition=[20.593684,78.96288]
  const[weatherData, setWeatherData]=React.useState([])
  const[currentPage,setCurrentPage]=React.useState(1)
  const[totalPages,setTotalPages]=React.useState("")


  const fetchWeatherData = async()=>{
    const res = await fetch(`https://weather-app-api-vyzw.onrender.com/weather?page=${currentPage}`)
    const data = await res.json()
    if(data){
      setWeatherData(data)
      setTotalPages(data.totalPage)

    }
  }

  React.useEffect(()=>{
    fetchWeatherData()
  },[currentPage])

  const convertToCelcius = (kelvin)=>{
    let formula = kelvin - 273.15
    formula = formula.toString().slice(0,5)
    return formula
  }
  

  return (
  <div>
  <img id='sun' src={sun} alt="sun"/>
  <img id='clouds' src={clouds} alt="clouds"/>
  <div className='container'>
  <h1 style={{color:'slateblue', fontSize:'3rem'}}>Weather App</h1>
  <small style={{ marginBottom:'1.5rem ' }}>Weather report of 30 cities in India</small>
  <MapContainer center={countryPosition} zoom={13} scrollWheelZoom={false} className="map_container">
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  
{    weatherData?.data?.map(({name,position,temp},index) => (
        <Marker 
        key={index}
        position={position} 
        icon={getIcon(20)}>
          
        <Popup>
        {name}
          <span style={{display:'flex', alignItems:'center'}}>
          {convertToCelcius(temp) }
          
          <img style={{width:"1.2rem", marginLeft:'2px'}} src={tempIcon} alt='temp'/>
          </span>
         
          </Popup>
        </Marker>
      ))
}  
  </MapContainer>

  <Pagination 
  totalPages= {totalPages} 
  currentPage= {currentPage} 
  setCurrentPage={setCurrentPage}/>
   </div>
  </div> 
);
}

export default App;

