import UI from './view.js';
import storage from './storage.js';

const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const checkedCity = JSON.parse(localStorage.getItem('favoriteCities')).checked;

UI.FORM.addEventListener('submit', function () {
  const cityName = UI.INPUT.value.trim();
  let weather = new Promise(() => getWeather(cityName));
  weather.then(() => getForecast(cityName));
  this.reset();
});

const favoriteCities = storage.getFavoriteCities().cities;

for (let city of favoriteCities) {
  const location = UI.LOCATION_TEMPLATE.content.cloneNode('deep');
  const cityName = location.querySelector('.city_name');
  const deleteButton = location.querySelector('.delete_button');
  cityName.textContent = city;
  cityName.addEventListener('click', function () {
    getWeather(cityName.textContent);
    getForecast(cityName.textContent);
    storage.saveCheckedCity(cityName.textContent);
  });
  deleteButton.addEventListener('click', function deleteLocation() {
    this.closest('.location').remove();
  });
  deleteButton.addEventListener('click', storage.deleteFavoriteCity);
  UI.LOCATIONS.append(location);
}

UI.ADD_LOCATION.addEventListener('click', storage.saveFavoriteCity);

UI.ADD_LOCATION.addEventListener('click', add_location);

getWeather(checkedCity);
getForecast(checkedCity);

async function getWeather(cityName) {
  const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(function (data) {
  //     if (data.cod >= '400') {
  //       throw new Error(data.message);
  //     }
  //     const temperature = Math.round(data.main.temp);
  //     UI.CITY.forEach(elem => {
  //       elem.textContent = data.name;
  //     });
  //     UI.TEMPERATURE.forEach(elem => {
  //       elem.textContent = temperature;
  //     });
  //     UI.ICON.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  //     UI.FEELS_LIKE.textContent = Math.round(data.main.feels_like);
  //     UI.WEATHER.textContent = data.weather[0].main;
  //     UI.SUNRISE.textContent = getTime(data.sys.sunrise);
  //     UI.SUNSET.textContent = getTime(data.sys.sunset);
  //     localStorage.setItem('checked', UI.CITY[0].textContent);
  //   })
  //   .catch(err => alert(err.message));

  try {
    let response = await fetch(url);
    let data = await response.json();
    if (data.cod >= '400') {
      throw new Error(data.message);
    }
    const temperature = Math.round(data.main.temp);
    UI.CITY.forEach(elem => {
      elem.textContent = data.name;
    });
    UI.TEMPERATURE.forEach(elem => {
      elem.textContent = temperature;
    });
    UI.ICON.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    UI.FEELS_LIKE.textContent = Math.round(data.main.feels_like);
    UI.WEATHER.textContent = data.weather[0].main;
    UI.SUNRISE.textContent = getTime(data.sys.sunrise);
    UI.SUNSET.textContent = getTime(data.sys.sunset);
    storage.saveCheckedCity(cityName);
  } catch (err) {
    alert(err.message);
  }
}

function getForecast(cityName) {
  const urlTest = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
  fetch(urlTest)
    .then(response => response.json())
    .then(function (data) {
      UI.FORECAST_CARDS.textContent = '';
      data.list.forEach(function (item) {
        if (new Date(item.dt * 1000).getHours() !== 12) {
          return;
        }
        const forecastCard = UI.FORECAST_TEMPLATE.content.cloneNode('deep');
        const forecastDate = forecastCard.querySelector('.weather__date');
        const forecastTemp = forecastCard.querySelector('.forecast_temperature');
        const forecastFeelsLike = forecastCard.querySelector('.forecast_feels_like');
        const forecastCloudy = forecastCard.querySelector('.forecast_cloudy');
        const forecastImg = forecastCard.querySelector('.forecast_img');
        forecastDate.textContent = new Date(item.dt * 1000).getDate() + ' ' + new Date(item.dt * 1000).toLocaleString('default', { month: 'short' });
        forecastTemp.textContent = Math.round(item.main.temp);
        forecastFeelsLike.textContent = Math.round(item.main.feels_like);
        forecastCloudy.textContent = item.weather[0].main;
        forecastImg.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        UI.FORECAST_CARDS.append(forecastCard);

      });
    })
  // .catch(err => alert(err.message));
}

function add_location() {
  const location = UI.LOCATION_TEMPLATE.content.cloneNode('deep');
  const cityName = location.querySelector('.city_name');
  const deleteButton = location.querySelector('.delete_button');
  const isLocationNotSaved = !UI.LOCATIONS.textContent.includes(UI.CITY[0].textContent);

  if (isLocationNotSaved) {
    cityName.textContent = UI.CITY[0].textContent;
    cityName.addEventListener('click', function () {
      getWeather(cityName.textContent);
      getForecast(cityName.textContent);
    });
    deleteButton.addEventListener('click', function deleteLocation() {
      this.closest('.location').remove();
    });
    deleteButton.addEventListener('click', storage.deleteFavoriteCity);
    UI.LOCATIONS.append(location);
  }
}

function getTime(ms) {
  let hours = new Date(ms * 1000).getHours();
  let minutes = new Date(ms * 1000).getMinutes();
  hours = (hours <= 9) ? '0' + hours : hours;
  minutes = (minutes <= 9) ? '0' + minutes : minutes;
  return `${hours}:${minutes}`;
}