import { pageHeader } from "./header";
import { showDefaultWeather, showContentOfWeather } from "./heroContent";

const content = document.querySelector(".content");
const queryLocation = document.createElement("input");
const searchBtn = document.createElement("button");
const defaultWeatherContainer = document.createElement("section");
// const weatherPageData = document.createElement("div");
// const weatherPageInfo = document.createElement("div");

queryLocation.setAttribute("type", "text");
queryLocation.setAttribute("class", "search");
searchBtn.textContent = "Search";
defaultWeatherContainer.append(showDefaultWeather());
content.append(pageHeader(), queryLocation, searchBtn, defaultWeatherContainer);

searchBtn.addEventListener("click", () => {
  const useVal = queryLocation.value.toLocaleLowerCase();

  //   const firPromise = (data) => {
  //     return new Promise((resolve, reject) => {
  //       const link = new XMLHttpRequest();
  //       link.open("GET", data, true);
  //       link.onclick = () => {
  //         if (link.status == 200) {
  //           resolve(link.response);
  //         } else {
  //           reject(Error(link.statusText));
  //         }
  //       };

  //       link.onerror = () => {
  //         reject(Error("Location not reachable"));
  //       };

  //       link.send();
  //     });
  //   };

  //   firPromise(
  //   fetch(
  //     "http://api.openweathermap.org/data/2.5/weather?q=" +
  //       useVal +
  //       "&appid=42cb9ecb74688a62504925b13afb6382"
  //   )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("Failed!", error);
  //     });

  //   firPromise(useVal);

  async function displayWeather() {
    // const weatherData = await fetch(
    //   "http://api.openweathermap.org/data/2.5/weather?q=" +
    //     useVal +
    //     "&appid=42cb9ecb74688a62504925b13afb6382"
    // );
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${useVal}&units=imperial&appid=42cb9ecb74688a62504925b13afb6382`
      // "&appid=42cb9ecb74688a62504925b13afb6382"r
    );
    const getWeatherData = await weatherData.json();
    const longitude = getWeatherData.coord.lon;
    const latitude = getWeatherData.coord.lat;
    // const showTemperature = await storeWeatherData.main.temp;
    // console.log(showTemperature);
    const getUserWeatherQuery = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=42cb9ecb74688a62504925b13afb6382`,
      { mode: "cors" }
    );
    const parseFetchedUserWeatherQuery = await getUserWeatherQuery.json();
    // console.log(getWeatherData);
    // console.log(parseFetchedUserWeatherQuery);
    defaultWeatherContainer.textContent = "";
    defaultWeatherContainer.append(
      showContentOfWeather(parseFetchedUserWeatherQuery)
    );
  }

  displayWeather();
});

// document.addEventListener("DOMContentLoaded", () => {
//   async function displayWeather() {
//     const weatherData = await fetch(
//       "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=42cb9ecb74688a62504925b13afb6382"
//     );
//     const storeWeatherData = await weatherData.json();
//     const showTemperature = await storeWeatherData.main.temp;
//     // console.log(showTemperature);
//     console.log(storeWeatherData);
//   }
//   displayWeather();
// });

// console.log(firPromise());
