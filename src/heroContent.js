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
const weatherIcon = document.createElement("div");
const iconImg = document.createElement("img");
let fahrenheitData;
let celsiusData;

displayWeatherRetrieved.className = "weather-container";
weatherPageData.className = "weather-data-group-one";
weatherPageSecondData.className = "weather-data-group-two";
weatherIcon.className = "weather-main-icon-container";
iconImg.className = "main-icon";

const showDefaultWeather = () => {
  displayWeatherRetrieved.textContent = "";
  weatherPageData.textContent = "";
  weatherPageSecondData.textContent = "";
  weatherIcon.textContent = "";

  document.addEventListener("DOMContentLoaded", () => {
    async function displayDefaultWeather() {
      try {
        const weatherData = await fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=10&lon=8&units=metric&appid=42cb9ecb74688a62504925b13afb6382",
          { mode: "cors" }
        );
        const defaultWeatherName = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=10&lon=8&units=imperial&appid=42cb9ecb74688a62504925b13afb6382",
          { mode: "cors" }
        );
        const getDefaultWeatherDataInCelsius = await weatherData.json();
        const getDefaultWeatherDataInFahrenheit =
          await defaultWeatherName.json();
        fahrenheitData = getDefaultWeatherDataInFahrenheit;
        celsiusData = getDefaultWeatherDataInCelsius;

        showContentOfWeather({
          fetchedWeatherInCelsius: getDefaultWeatherDataInCelsius,
          weatherDataInFahrenheit: getDefaultWeatherDataInFahrenheit,
        });
      } catch (error) {
        displayWeatherRetrieved.textContent =
          "Network error! Try again or reload the page.";
        return displayWeatherRetrieved;
      }
    }
    displayDefaultWeather();
  });
  return displayWeatherRetrieved;
};

const showContentOfWeather = ({
  fetchedWeatherInCelsius,
  weatherDataInFahrenheit,
} = {}) => {
  displayWeatherRetrieved.textContent = "";
  weatherPageData.textContent = "";
  weatherPageSecondData.textContent = "";
  weatherIcon.textContent = "";

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
    timeZone: fetchedWeatherInCelsius.timezone,
  };

  const dateInTimestamp = new Date(fetchedWeatherInCelsius.current.dt * 1000);
  const userTimezone = new Date(
    (fetchedWeatherInCelsius.current.dt +
      fetchedWeatherInCelsius.timezone_offset) *
      1000
  );
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    userTimezone
  );

  const fetchedLocationTime = new Intl.DateTimeFormat(
    "en-GB",
    timeOptions
  ).format(dateInTimestamp);

  const { icon } = fetchedWeatherInCelsius.current.weather[0];
  iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.appendChild(iconImg);

  weatherContent.forEach((item) => {
    const containerContent = document.createElement("div");
    const containerTitle = document.createElement("div");

    switch (item) {
      case "locationName":
        containerContent.textContent = `${weatherDataInFahrenheit.name}`;
        containerContent.className = `weather-${item}-container`;
        weatherIcon.appendChild(containerContent);
        break;
      case "description":
        const { description } = fetchedWeatherInCelsius.current.weather[0];
        containerContent.textContent = description;
        containerContent.className = `weather-${item}-container`;
        weatherIcon.appendChild(containerContent);
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
          fetchedWeatherInCelsius.current.temp
        )} \xB0C`;
        containerContent.className = `weather-${item}-container`;
        weatherPageData.appendChild(containerContent);
        break;
      case "feels_like":
        containerContent.textContent = `${Math.floor(
          fetchedWeatherInCelsius.current.feels_like
        )} \xB0C`;
        containerTitle.textContent = "feels like";
        containerContent.className = `${item}-container`;
        containerTitle.className = `${item}-title`;
        weatherPageSecondData.append(containerTitle, containerContent);
        break;
      case "humidity":
        containerContent.textContent = `${fetchedWeatherInCelsius.current.humidity}%`;
        containerTitle.textContent = "humidity";
        containerContent.className = `${item}-container`;
        containerTitle.className = `${item}-title`;
        weatherPageSecondData.append(containerTitle, containerContent);
        break;
      case "wind_speed":
        const speed = fetchedWeatherInCelsius.current.wind_speed * 3.6;
        containerContent.textContent = `${speed.toFixed(1)} km/h`;
        containerTitle.textContent = "wind speed";
        containerContent.className = `${item}-container`;
        containerTitle.className = `${item}-title`;
        weatherPageSecondData.append(containerTitle, containerContent);
        break;
      case "chanceOfRain":
        const { pop } = fetchedWeatherInCelsius.daily[0];
        containerContent.textContent = `${pop}%`;
        containerTitle.textContent = "chance of rain";
        containerContent.className = `${item}-container`;
        containerTitle.className = `${item}-title`;
        weatherPageSecondData.append(containerTitle, containerContent);
        break;
    }
  });

  displayWeatherRetrieved.append(
    weatherPageData,
    weatherIcon,
    weatherPageSecondData
  );
  return displayWeatherRetrieved;
};

const postDefaultWeatherData = () => {
  return { fahrenheitData, celsiusData };
};

export { showDefaultWeather, showContentOfWeather, postDefaultWeatherData };
