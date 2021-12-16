/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pageHeader\": () => (/* binding */ pageHeader)\n/* harmony export */ });\nconst pageHeader = () => {\n  const header = document.createElement(\"header\");\n  const pageIcon = document.createElement(\"img\");\n  const h1 = document.createElement(\"h1\");\n\n  pageIcon.setAttribute(\"src\", \"\");\n  h1.textContent = \"Weather Page\";\n  h1.classList.add(\"page-title\");\n  header.append(pageIcon, h1);\n\n  return header;\n};\n\n\n\n\n//# sourceURL=webpack://weather-page/./src/header.js?");

/***/ }),

/***/ "./src/heroContent.js":
/*!****************************!*\
  !*** ./src/heroContent.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showDefaultWeather\": () => (/* binding */ showDefaultWeather),\n/* harmony export */   \"showContentOfWeather\": () => (/* binding */ showContentOfWeather)\n/* harmony export */ });\nconst weatherContent = [\n  \"locationName\",\n  \"date\",\n  \"temp\",\n  \"humidity\",\n  \"wind_speed\",\n  \"feels_like\",\n  \"time\",\n  \"description\",\n];\nconst displayWeatherRetrieved = document.createElement(\"div\");\nconst weatherPageData = document.createElement(\"div\");\nconst weatherPageSecondData = document.createElement(\"div\");\n\ndisplayWeatherRetrieved.className = \"weather-container\";\nweatherPageData.className = \"weather-data-group-one\";\nweatherPageSecondData.className = \"weather-data-group-two\";\n\nconst showDefaultWeather = () => {\n  displayWeatherRetrieved.textContent = \"\";\n  weatherPageData.textContent = \"\";\n  weatherPageSecondData.textContent = \"\";\n\n  document.addEventListener(\"DOMContentLoaded\", () => {\n    async function displayDefaultWeather() {\n      try {\n        await new Promise((resolve, reject) => setTimeout(resolve, 1000));\n        const weatherData = await fetch(\n          \"https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.13&units=metric&appid=42cb9ecb74688a62504925b13afb6382\",\n          { mode: \"cors\" }\n        );\n\n        const getDefaultWeatherData = await weatherData.json();\n        const dateOptions = {\n          weekday: \"short\",\n          year: \"numeric\",\n          month: \"short\",\n          day: \"numeric\",\n        };\n\n        const timeOptions = {\n          hour: \"numeric\",\n          minute: \"numeric\",\n          hour12: true,\n          timeZone: getDefaultWeatherData.timezone,\n        };\n\n        const dateInTimestamp = new Date(\n          getDefaultWeatherData.current.dt * 1000\n        );\n        const formattedDate = new Intl.DateTimeFormat(\n          \"en-US\",\n          dateOptions\n        ).format(dateInTimestamp);\n        const fetchedLocationTime = new Intl.DateTimeFormat(\n          \"en-GB\",\n          timeOptions\n        ).format(dateInTimestamp);\n\n        const showContentOfWeather = weatherContent.forEach((item) => {\n          const containerDivForAll = document.createElement(\"div\");\n\n          switch (item) {\n            case \"date\":\n              containerDivForAll.textContent = formattedDate;\n              containerDivForAll.className = `weather-${item}-container`;\n              weatherPageData.appendChild(containerDivForAll);\n              break;\n            case \"temp\":\n              containerDivForAll.textContent = `${getDefaultWeatherData.current.temp}\\xB0C`;\n              containerDivForAll.className = `weather-${item}-container`;\n              weatherPageData.appendChild(containerDivForAll);\n              break;\n          }\n        });\n      } catch (error) {\n        displayWeatherRetrieved.textContent =\n          \"Network error! Try again or reload the page.\";\n        return displayWeatherRetrieved;\n      }\n    }\n    displayDefaultWeather();\n  });\n  displayWeatherRetrieved.append(weatherPageData);\n  return displayWeatherRetrieved;\n};\n\nconst showContentOfWeather = (fetchedWeather, fetchedWeatherName) => {\n  displayWeatherRetrieved.textContent = \"\";\n  weatherPageData.textContent = \"\";\n  weatherPageSecondData.textContent = \"\";\n\n  const dateOptions = {\n    weekday: \"short\",\n    year: \"numeric\",\n    month: \"short\",\n    day: \"numeric\",\n  };\n\n  const timeOptions = {\n    hour: \"numeric\",\n    minute: \"numeric\",\n    hour12: true,\n    timeZone: fetchedWeather.timezone,\n  };\n\n  const dateInTimestamp = new Date(fetchedWeather.current.dt * 1000);\n  const formattedDate = new Intl.DateTimeFormat(\"en-US\", dateOptions).format(\n    dateInTimestamp\n  );\n  const fetchedLocationTime = new Intl.DateTimeFormat(\n    \"en-GB\",\n    timeOptions\n  ).format(dateInTimestamp);\n\n  weatherContent.forEach((item) => {\n    const containerDivForAll = document.createElement(\"div\");\n\n    switch (item) {\n      case \"locationName\":\n        containerDivForAll.textContent = `${fetchedWeatherName}`;\n        containerDivForAll.className = `weather-${item}-container`;\n        weatherPageData.appendChild(containerDivForAll);\n        break;\n      case \"description\":\n        const obj = fetchedWeather.current.weather[0];\n        Object.entries(obj).forEach(([key, value]) => {\n          if (key === \"description\")\n            containerDivForAll.textContent = `${value}`;\n        });\n        containerDivForAll.className = `weather-${item}-container`;\n        weatherPageData.appendChild(containerDivForAll);\n        break;\n      case \"date\":\n        containerDivForAll.textContent = formattedDate;\n        containerDivForAll.className = `weather-${item}-container`;\n        weatherPageData.appendChild(containerDivForAll);\n        break;\n      case \"time\":\n        containerDivForAll.textContent = fetchedLocationTime;\n        containerDivForAll.className = `weather-${item}-container`;\n        weatherPageData.appendChild(containerDivForAll);\n        break;\n      case \"temp\":\n        containerDivForAll.textContent = `${Math.ceil(\n          fetchedWeather.current.temp\n        )}\\xB0C`;\n        containerDivForAll.className = `weather-${item}-container`;\n        weatherPageData.appendChild(containerDivForAll);\n        break;\n    }\n  });\n  displayWeatherRetrieved.append(weatherPageData);\n  return displayWeatherRetrieved;\n};\n\n\n\n\n//# sourceURL=webpack://weather-page/./src/heroContent.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ \"./src/header.js\");\n/* harmony import */ var _heroContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heroContent */ \"./src/heroContent.js\");\n\n\n\nconst content = document.querySelector(\".content\");\nconst queryLocation = document.createElement(\"input\");\nconst searchBtn = document.createElement(\"button\");\nconst defaultWeatherContainer = document.createElement(\"section\");\nconst errorContainer = document.createElement(\"div\");\nconst temperatureBtn = document.createElement(\"button\");\nlet weatherDataReceivedInFahrenheit;\nlet weatherDataReceivedInCelsius;\n\nqueryLocation.setAttribute(\"type\", \"text\");\nqueryLocation.setAttribute(\"class\", \"search\");\nerrorContainer.setAttribute(\"class\", \"error-info\");\ntemperatureBtn.setAttribute(\"class\", \"temp-toggle-btn\");\nsearchBtn.textContent = \"Search\";\ntemperatureBtn.textContent = \"Display \\xB0F\";\ndefaultWeatherContainer.append((0,_heroContent__WEBPACK_IMPORTED_MODULE_1__.showDefaultWeather)());\ncontent.append(\n  (0,_header__WEBPACK_IMPORTED_MODULE_0__.pageHeader)(),\n  defaultWeatherContainer,\n  queryLocation,\n  searchBtn,\n  temperatureBtn\n);\n\nsearchBtn.addEventListener(\"click\", () => {\n  const userQuery = queryLocation.value.toLocaleLowerCase();\n  let fetchedLocationName;\n  async function displayWeather() {\n    const weatherData = await fetch(\n      `https://api.openweathermap.org/data/2.5/weather?q=${userQuery}&units=imperial&appid=42cb9ecb74688a62504925b13afb6382`,\n      { mode: \"cors\" }\n    );\n    const getWeatherData = await weatherData.json();\n    fetchedLocationName = getWeatherData.name;\n    weatherDataReceivedInFahrenheit = getWeatherData;\n    return getWeatherData;\n  }\n\n  async function displayReceivedData() {\n    try {\n      const weatherDataReceived = await displayWeather();\n      const longitude = weatherDataReceived.coord.lon;\n      const latitude = weatherDataReceived.coord.lat;\n      const getUserWeatherQuery = await fetch(\n        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=42cb9ecb74688a62504925b13afb6382`,\n        { mode: \"cors\" }\n      );\n      const parseFetchedUserWeatherQuery = await getUserWeatherQuery.json();\n      weatherDataReceivedInCelsius = parseFetchedUserWeatherQuery;\n      defaultWeatherContainer.textContent = \"\";\n      defaultWeatherContainer.append(\n        (0,_heroContent__WEBPACK_IMPORTED_MODULE_1__.showContentOfWeather)(parseFetchedUserWeatherQuery, fetchedLocationName)\n      );\n    } catch (error) {\n      errorContainer.textContent =\n        \"Location not found! Search by name of City or Country.\";\n      defaultWeatherContainer.appendChild(errorContainer);\n    }\n  }\n  displayReceivedData();\n});\n\ntemperatureBtn.addEventListener(\"click\", (e) => {\n  const getTempContainer = document.querySelector(\".weather-temp-container\");\n\n  if (e.target.textContent === \"Display °F\") {\n    e.target.textContent = \"Display \\xB0C\";\n    getTempContainer.textContent = `${Math.ceil(\n      weatherDataReceivedInFahrenheit.main.temp\n    )} \\xB0F`;\n  } else {\n    e.target.textContent = \"Display \\xB0F\";\n    getTempContainer.textContent = `${Math.ceil(\n      weatherDataReceivedInCelsius.current.temp\n    )} \\xB0C`;\n  }\n});\n\n\n//# sourceURL=webpack://weather-page/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;