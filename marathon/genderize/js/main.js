import { countries } from './country.js';

function getElem(selector) {
  return document.querySelector(selector);
}

const UI = {
  'form': getElem('#genderize_form'),
  'input': getElem('#firstName'),
  'gender': getElem('#gender'),
  'country': getElem('#country'),
}

UI.form.addEventListener('submit', function () {
  const firstName = UI.input.value.trim();
  const isNotEmptyName = firstName !== '';

  if (isNotEmptyName) {
    UI.form.reset();
    UI.gender.textContent = '';
    UI.country.textContent = '';

    const serverUrl_1 = 'https://api.genderize.io';
    const url_1 = `${serverUrl_1}?name=${firstName}`;

    const serverUrl_2 = 'https://api.nationalize.io';
    const url_2 = `${serverUrl_2}?name=${firstName}`;

    fetch(url_1).then(response => response.json()).then(response => {
      const isGenderDefined = response.gender;

      if (isGenderDefined) {
        UI.gender.textContent = `${response.name[0].toUpperCase() + response.name.slice(1)} is ${response.gender}`;
        fetch(url_2).then(response => response.json()).then(response => {
          const isNotEmptyArrayOfCountries = response.country.length !== 0;
          if (isNotEmptyArrayOfCountries)
            return UI.country.textContent = `from ${countries[response.country[0].country_id]}`
        });
      } else {
        UI.gender.textContent = 'No information or wrong name';
      }

    });

  }

});