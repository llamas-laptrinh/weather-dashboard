import cold from "./assets/cold.jpg";
import hot from "./assets/hot.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
function App() {
  const [city, setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(cold);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      saveHis(data);
      console.log(data.id);

      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(cold);
      else setBg(hot);
    };
    fetchWeatherData();
  }, [units, city]);
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const enterKey = () => {
    const input = document.querySelector(".input");
    setCity(input.value);
  };

  const saveHis = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("city", data.name);
    urlencoded.append("icon", data.iconURL);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/weather", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div key={weather.id} className="container">
            <div className="section section__inputs">
              <input
                className="input"
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button className="btn" onClick={enterKey}>
                <span> Tìm Kiếm</span>
              </button>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>
                  {weather.name}, {weather.country}
                </h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {weather.temp.toFixed()} {units === "metric" ? "°C" : "°F"}
                </h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
