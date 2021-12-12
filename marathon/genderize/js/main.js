function getElem(selector) {
  return document.querySelector(selector);
}

const UI = {
  FORM: getElem('#genderize_form'),
  INPUT: getElem('#firstName'),
  GENDER: getElem('#gender'),
}

const serverUrl = 'https://api.genderize.io';
const errorText = 'No information or wrong name';

UI.FORM.addEventListener('submit', function () {
  const firstName = UI.INPUT.value.trim();
  const isNotEmptyName = firstName !== '';

  if (isNotEmptyName) {
    UI.FORM.reset();
    UI.GENDER.textContent = '';
    const url = `${serverUrl}?name=${firstName}`;
    fetch(url)
      .then(response => response.json())
      .then(function (responseJson) {
        const isGenderUndetermined = !responseJson.gender;
        if (isGenderUndetermined) {
          throw new Error(errorText);
        }
        UI.GENDER.textContent = `${responseJson.name[0].toUpperCase() + responseJson.name.slice(1)} is ${responseJson.gender}`;
      })
      .catch(err => {
        if (err.message === errorText) {
          UI.GENDER.textContent = err.message;
        } else {
          throw err;
        }
      });
  }
});