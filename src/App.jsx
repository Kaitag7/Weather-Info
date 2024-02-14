import React, { useCallback, useState } from "react";
import "./style.css";

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  // const apiKey = process.env.REACT_APP_APIKEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=55a4a077c95a0fc476de3f4952afc4f7`;

  const locationSearch = useCallback(
    (event) => {
      if (event.key === "Enter") {
        fetch(url)
          .then((res) => res.json())
          .then((total) => setData(total));

        setLocation("");
      }
    },
    [url]
  );

  const backgroundImage = useCallback((temp) => {
    switch (true) {
      case temp > 20:
        return "high";

      case temp <= 20 && temp > 10:
        return "medium";

      case temp <= 10 && temp > 0:
        return "low";

      case temp <= 0:
        return "cold";

      default:
        return "";
    }
  }, []);

  return (
    <div className={`app ${backgroundImage(data?.main?.temp)}`}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={locationSearch}
          type="text"
          placeholder="Enter Location"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? (
              <h1>
                {data.main.temp}
                °С
              </h1>
            ) : null}
          </div>
          <div className="description">{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
        </div>

        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {data.main.feels_like}
                  °С
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} KM/PH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
