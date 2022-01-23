function getElem(selector) {
  return document.querySelector(selector);
}

const UI = {
  WINDOWS: getElem('#weather__windows').children,
  TABS: getElem('#weather__menu').children,
  FORM: getElem('.weather__form'),
  INPUT: getElem('.weather__input'),
  CITY: document.querySelectorAll('.weather__city'),
  TEMPERATURE: document.querySelectorAll('.temperature'),
  LOCATIONS: getElem('#locations'),
  ADD_LOCATION: getElem('.add_location'),
  ICON: getElem('.weather__icon'),
  LOCATION_TEMPLATE: getElem('#location_template'),
  FEELS_LIKE: getElem('#feels_like'),
  WEATHER: getElem('#weather'),
  SUNRISE: getElem('#sunrise'),
  SUNSET: getElem('#sunset'),
  FORECAST_CARDS: getElem('.weather__date_cards'),
  FORECAST_TEMPLATE: getElem('#forecast_template'),
}

export default UI;