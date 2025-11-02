/* 
  Weather App Script
  File: script.js
  Description: Handles city search, API fetching, and weather data updates.
  Author: Vedant Parashar
*/

// ===== IMPORTS =====
import dayjs from "https://esm.sh/dayjs";


// ===== CONSTANTS =====
const API_KEY = "af27a5f280f61370320dfb5028c52c04";


// ===== ELEMENT SELECTORS =====
const searchInput = document.querySelector(".searchBar__input");
const searchButton = document.querySelector(".searchBar__btn");

const sectionSearchCity = document.querySelector(".js-search-city");
const sectionWeatherInfo = document.querySelector(".js-weather-info");
const sectionNotFound = document.querySelector(".js-not-found");

const cityNameElem = document.querySelector(".js-city");
const dateElem = document.querySelector(".js-date");
const skyImgElem = document.querySelector(".js-sky-img");
const tempElem = document.querySelector(".js-temp");
const skyTextElem = document.querySelector(".js-sky-text");
const humidityElem = document.querySelector(".js-humidity");
const windSpeedElem = document.querySelector(".js-wind-speed");


// ===== EVENT HANDLERS =====
function handleSearch() {
  const city = searchInput.value.trim();
  if (!city) return;

  updateWeatherInfo(city);
  searchInput.value = "";
  searchInput.blur();
}

function handleEnterKey(event) {
  if (event.key === "Enter") handleSearch();
}


// ===== EVENT LISTENERS =====
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", handleEnterKey);


// ===== API REQUEST =====
async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return await response.json();
}


// ===== UPDATE UI =====
async function updateWeatherInfo(city) {
  const weatherData = await fetchWeatherData(city);

  // City not found
  if (weatherData.message === "city not found") {
    sectionSearchCity.style.display = "none";
    sectionWeatherInfo.style.display = "none";
    sectionNotFound.style.display = "flex";
    return;
  }

  // City found → show info
  sectionNotFound.style.display = "none";
  sectionSearchCity.style.display = "none";
  sectionWeatherInfo.style.display = "flex";

  // Fill data
  cityNameElem.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
  dateElem.innerHTML = dayjs().format("ddd, DD MMM");
  skyImgElem.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  tempElem.innerHTML = `${Math.round(weatherData.main.temp)} &deg;C`;
  skyTextElem.innerHTML = weatherData.weather[0].main;
  humidityElem.innerHTML = `${weatherData.main.humidity}%`;
  windSpeedElem.innerHTML = `${weatherData.wind.speed} M/s`;
}
