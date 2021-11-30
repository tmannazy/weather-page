const showDefaultWeather = () => {
  const weatherContent = [
    "date",
    "temp",
    "humidity",
    "wind_speed",
    "feels_like",
  ];
  const displayWeatherRetrieved = document.createElement("div");
  const weatherPageData = document.createElement("div");
  const weatherPageInfo = document.createElement("div");

  document.addEventListener("DOMContentLoaded", () => {
    async function displayWeather() {
      const weatherData = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=metric&appid=42cb9ecb74688a62504925b13afb6382",
        { mode: "cors" }
      );
      const storeWeatherData = await weatherData.json();
      //   const showTemperature = await storeWeatherData.main.temp;
      // console.log(showTemperature);
      console.log(storeWeatherData);
      const showContentOfWeather = weatherContent.forEach((item) => {
        const divW = document.createElement("div");
        switch (item) {
          case "date":
            divW.textContent = new Date(storeWeatherData.current.dt);
            weatherPageData.appendChild(divW);
            break;
          case "temp":
            divW.textContent = `${storeWeatherData.current.temp}\xB0C`;
            weatherPageInfo.appendChild(divW);
            break;
        }
      });
    }
    displayWeather();
  });
  displayWeatherRetrieved.append(weatherPageData, weatherPageInfo);
  return displayWeatherRetrieved;
};

export { showDefaultWeather };
