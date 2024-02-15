import { useState} from 'react'
import { api } from './services/api'

import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState([])

  async function handleSearchWeather(){

    const location = [];

    const response = await api.get(`current.json?key=ed750a1433c448d49ab232544240602&q=${city}&aqi=no&lang=pt`);

    const data = response.data;

    location.push({
      city: data.location.name,
      state: data.location.region,
      country: data.location.country,
      temp_c: Math.floor(data.current.temp_c),
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      lat: data.location.lat,
      lon: data.location.lon,
      humidity: data.current.humidity,
      feelslike_c: Math.floor(data.current.feelslike_c),

    })

    setWeather(location)
    

  }

  return (
    <>




    <header>
      <div className='search'>
        <input type="text" placeholder='Digite a cidade' value={city} onChange={(e) => setCity(e.target.value)}/>
        <button onClick={handleSearchWeather}>Pesquisar</button>
      </div>
    </header>
    
    {weather.map(w => (
      <main className='mainContent' key={w.city}>
          <h1>{w.city}, {w.state} - {w.country}</h1>
          <div className='column'>
            <h2>{w.temp_c}</h2>
            <div className='weather'>
              <div className='img'>
                <img src={w.icon} alt={w.condition}/>
              </div>
              
              <p className='textTemp'> {w.condition}</p>
            </div>
          </div>
    
          <div className='informationWeather'>
            <div>
              <p>Longitude: {w.lon}</p>
              <p>Latitude: {w.lat}</p>
            </div>
    
            <div>
              <p>Sensação de: {w.feelslike_c}</p>
              <p>Umidade: {w.humidity}</p>
            </div>
          </div>
      </main>
    ))}
    </>



  )
}

export default App
