import React, { useState } from "react";
import "./searchWeather.css";
import { XOutlined } from "@ant-design/icons";
const SearchWeather = () => {
  const [weather, setWeather] = useState([]);
  const getData = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/weather");
    data = await data.json();
    const URL = await data.data;
    setWeather(URL);
  };

  const handleDelete = async (id) => {
    console.log("id:", id);
    const data = await fetch("http://127.0.0.1:8000/api/weather/" + id, {
      method: "DELETE",
    });
    await data.json();
    getData();
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <section id="cart" className="section-p1">
      <table width="100%">
        <thead>
          <tr>
            <td>Remove</td>
            <td>ImageICon</td>
            <td>CityName</td>
            <td>day month Year</td>
          </tr>
          {weather.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <XOutlined onClick={() => handleDelete(item.id)} />
                </td>
                <td>
                  <img src={item.icon} alt={item.city} />
                </td>
                <td>{item.city}</td>
                <td>{new Date(item.created_at).toDateString()}</td>
              </tr>
            );
          })}
        </thead>
        <tbody></tbody>
      </table>
    </section>
  );
};

export default SearchWeather;
