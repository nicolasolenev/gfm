function getElem(selector) {
  return document.querySelector(selector);
}

function convertDeg(degree) {
  return Math.round(degree - 273.15);
}

function getTime(ms) {
  let hours = new Date(ms * 1000).getHours();
  let minutes = new Date(ms * 1000).getMinutes();
  hours = (hours <= 9) ? '0' + hours : hours;
  minutes = (minutes <= 9) ? '0' + minutes : minutes;
  return `${hours}:${minutes}`;
}

const UI = {
  weatherWindows: getElem('#weather__windows').children,
  weatherMenu: getElem('#weather__menu').children,
  form: getElem('.weather__form'),
  input: getElem('.weather__input'),
  city: document.querySelectorAll('.weather__city'),
  temp: document.querySelectorAll('.temperature'),
  feels_like: getElem('#feels_like'),
  weather: getElem('#weather'),
  sunrise: getElem('#sunrise'),
  sunset: getElem('#sunset'),
  locations: getElem('#locations'),
  add_location: getElem('.add_location'),
  icon: getElem('.weather__icon'),
}


for (let elem of UI.weatherMenu) {
  elem.addEventListener('click', changeWindow);
}

function changeWindow(event) {
  if (!event.target.classList.contains('menu-checked')) {
    const preventTarget = event.target.parentElement.querySelector('.menu-checked');
    const preventTargetId = preventTarget.getAttribute('id');
    const preventWindow = UI.weatherWindows[preventTargetId];
    preventWindow.style.display = 'none';
    preventTarget.classList.remove('menu-checked');
    event.target.classList.add('menu-checked');
    const targetId = event.target.getAttribute('id');
    const currentWindow = UI.weatherWindows[targetId];
    currentWindow.style.display = 'block';
  }
}

UI.form.addEventListener('submit', function () {
  getWeather(UI.input.value.trim());
  UI.form.reset();
});

function getWeather(cityName) {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(function (data) {
      console.log(data);
      const temp = convertDeg(data.main.temp);
      const feels_like = convertDeg(data.main.feels_like);
      UI.city.forEach(elem => {
        elem.textContent = data.name;
      });
      UI.temp.forEach(elem => {
        elem.textContent = temp;
      });
      UI.icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      UI.feels_like.textContent = feels_like;
      UI.weather.textContent = data.weather[0].main;
      UI.sunrise.textContent = getTime(data.sys.sunrise);
      UI.sunset.textContent = getTime(data.sys.sunset);

      if (!UI.locations.textContent.includes(UI.city[0].textContent)) {
        UI.add_location.firstElementChild.setAttribute('src', '/img/heart-ico.svg');
      } else {
        UI.add_location.firstElementChild.setAttribute('src', '/img/heart-selected-ico.svg');
      }
    });
}

UI.add_location.addEventListener('click', function (event) {
  const li = document.createElement('li');
  if (!UI.locations.textContent.includes(UI.city[0].textContent)) {
    localStorage.setItem(UI.city[0].textContent, UI.city[0].textContent);
    console.log(localStorage);
    li.textContent = UI.city[0].textContent;
    li.addEventListener('click', function () {
      getWeather(li.textContent);
    });
    UI.locations.append(li);
    console.log(event.target);
    event.target.setAttribute('src', '/img/heart-selected-ico.svg');
  } else {
    localStorage.removeItem(UI.city[0].textContent);
    console.log(localStorage);
    event.target.setAttribute('src', '/img/heart-ico.svg');
    Array.from(UI.locations.children).find(item => item.textContent === UI.city[0].textContent).remove();
  }
});

for (let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue;
  }
  const li = document.createElement('li');
  li.textContent = key;
  li.addEventListener('click', function () {
    getWeather(li.textContent);
  });
  UI.locations.append(li);

}

getWeather('Moscow');

