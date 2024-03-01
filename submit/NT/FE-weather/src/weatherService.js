const API_KEY = "0a47de985ad5ce3673350872443bc7b5";
const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;
const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log(URL);
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
  console.log(data);
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  console.log(weather);
  const { description, icon, id } = weather[0];
  return {
    id,
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};
export { getFormattedWeatherData };
