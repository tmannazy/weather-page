const weatherContent = [
  "locationName",
  "date",
  "temp",
  "humidity",
  "wind_speed",
  "feels_like",
  "time",
  "description",
  "chanceOfRain",
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
          const containerContent = document.createElement("div");

          switch (item) {
            case "date":
              containerContent.textContent = formattedDate;
              containerContent.className = `weather-${item}-container`;
              weatherPageData.appendChild(containerContent);
              break;
            case "temp":
              containerContent.textContent = `${getDefaultWeatherData.current.temp}\xB0C`;
              containerContent.className = `weather-${item}-container`;
              weatherPageData.appendChild(containerContent);
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

const showContentOfWeather = (fetchedWeather, weatherDataInFahrenheit) => {
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
    const containerContent = document.createElement("div");
    const containerTitle = document.createElement("div");

    switch (item) {
      case "locationName":
        containerContent.textContent = `${weatherDataInFahrenheit.name}`;
        containerContent.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerContent);
        break;
      case "description":
        const { description } = fetchedWeather.current.weather[0];
        containerContent.textContent = description;
        containerContent.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerContent);
        break;
      case "date":
        containerContent.textContent = formattedDate;
        containerContent.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerContent);
        break;
      case "time":
        containerContent.textContent = fetchedLocationTime;
        containerContent.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerContent);
        break;
      case "temp":
        containerContent.textContent = `${Math.ceil(
          fetchedWeather.current.temp
        )}\xB0C`;
        containerContent.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerContent);
        break;
      case "feels_like":
        containerContent.textContent = `${Math.floor(
          fetchedWeather.current.feels_like
        )} \xB0C`;
        containerTitle.textContent = "feels like";
        containerContent.className = `${item}-container`;
        containerTitle.className = `${item}-title`;
        weatherPageSecondData.append(containerTitle, containerContent);
        break;
      case "humidity":
        containerContent.textContent = `${fetchedWeather.current.humidity}%`;
        containerTitle.textContent = "humidity";
        containerContent.className = `${item}-container`;
        containerTitle.className = `${item}-title`;
        weatherPageSecondData.append(containerTitle, containerContent);
        break;
      case "wind_speed":
        const speed = fetchedWeather.current.wind_speed * 3.6;
        containerContent.textContent = `${speed.toFixed(1)} km/h`;
        containerTitle.textContent = "wind speed";
        containerContent.className = `${item}-container`;
        containerTitle.className = `${item}-title`;
        weatherPageSecondData.append(containerTitle, containerContent);
        break;
    }
  });
  displayWeatherRetrieved.append(weatherPageData, weatherPageSecondData);
  return displayWeatherRetrieved;
};

export { showDefaultWeather, showContentOfWeather };
