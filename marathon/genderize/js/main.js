import { countries } from './country.js';

document.querySelector('form').addEventListener('submit', function (event) {
  const firstName = event.currentTarget.querySelector('#firstName').value;
  const serverUrl = 'https://api.genderize.io';
  const urlMy = `${serverUrl}?name=${firstName}`;
  const result = document.querySelector('#result');
  fetch(urlMy).then(response => response.json()).then(commits => result.textContent = `${commits.name[0].toUpperCase() + commits.name.slice(1)} is ${commits.gender}`);
  const serverUrl2 = 'https://api.nationalize.io';
  const urlMy2 = `${serverUrl2}?name=${firstName}`;
  const result2 = document.querySelector('#result2');
  fetch(urlMy2).then(response => response.json()).then(commits => result2.textContent = `from ${countries[commits.country[0].country_id]}`);

  event.currentTarget.querySelector('#firstName').value = '';
});
