const weatherContent = [
  "date",
  "temp",
  "humidity",
  "wind_speed",
  "feels_like",
  "time",
  "description",
];
const displayWeatherRetrieved = document.createElement("div");
const weatherPageData = document.createElement("div");
const weatherPageSecondData = document.createElement("div");

displayWeatherRetrieved.className = "weather-container";
weatherPageData.className = "weather-data-group-one";
weatherPageSecondData.className = "weather-data-group-two";

const showDefaultWeather = () => {
  displayWeatherRetrieved.textContent = "";
  weatherPageData.textContent = "";
  weatherPageSecondData.textContent = "";

  document.addEventListener("DOMContentLoaded", () => {
    async function displayDefaultWeather() {
      try {
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        const weatherData = await fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.13&units=metric&appid=42cb9ecb74688a62504925b13afb6382",
          { mode: "cors" }
        );

        const getDefaultWeatherData = await weatherData.json();
        const dateOptions = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        const timeOptions = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: getDefaultWeatherData.timezone,
        };

        const dateInTimestamp = new Date(
          getDefaultWeatherData.current.dt * 1000
        );
        const formattedDate = new Intl.DateTimeFormat(
          "en-US",
          dateOptions
        ).format(dateInTimestamp);
        const fetchedLocationTime = new Intl.DateTimeFormat(
          "en-GB",
          timeOptions
        ).format(dateInTimestamp);

        const showContentOfWeather = weatherContent.forEach((item) => {
          const containerDivForAll = document.createElement("div");

          switch (item) {
            case "date":
              containerDivForAll.textContent = formattedDate;
              containerDivForAll.className = `weather-${item}-container`;
              weatherPageData.appendChild(containerDivForAll);
              break;
            case "temp":
              containerDivForAll.textContent = `${getDefaultWeatherData.current.temp}\xB0C`;
              containerDivForAll.className = `weather-${item}-container`;
              weatherPageData.appendChild(containerDivForAll);
              break;
          }
        });
      } catch (error) {
        displayWeatherRetrieved.textContent =
          "Network error! Try again or reload the page.";
        return displayWeatherRetrieved;
      }
    }
    displayDefaultWeather();
  });
  displayWeatherRetrieved.append(weatherPageData);
  return displayWeatherRetrieved;
};

const showContentOfWeather = (fetchedWeather) => {
  displayWeatherRetrieved.textContent = "";
  weatherPageData.textContent = "";
  weatherPageSecondData.textContent = "";

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: fetchedWeather.timezone,
  };

  const dateInTimestamp = new Date(fetchedWeather.current.dt * 1000);
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    dateInTimestamp
  );
  const fetchedLocationTime = new Intl.DateTimeFormat(
    "en-GB",
    timeOptions
  ).format(dateInTimestamp);

  weatherContent.forEach((item) => {
    const containerDivForAll = document.createElement("div");

    switch (item) {
      case "description":
        const obj = fetchedWeather.current.weather[0];
        Object.entries(obj).forEach(([key, value]) => {
          if (key === "description")
            containerDivForAll.textContent = `${value}`;
        });
        containerDivForAll.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerDivForAll);
        break;
      case "date":
        containerDivForAll.textContent = formattedDate;
        containerDivForAll.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerDivForAll);
        break;
      case "time":
        containerDivForAll.textContent = fetchedLocationTime;
        containerDivForAll.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerDivForAll);
        break;
      case "temp":
        containerDivForAll.textContent = `${Math.ceil(
          fetchedWeather.current.temp
        )}\xB0C`;
        containerDivForAll.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerDivForAll);
        break;
    }
  });
  displayWeatherRetrieved.append(weatherPageData);
  return displayWeatherRetrieved;
};

export { showDefaultWeather, showContentOfWeather };
