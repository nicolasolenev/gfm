

document.querySelector('form').addEventListener('submit', function (event) {
  const firstName = event.currentTarget.querySelector('#firstName').value;
  const serverUrl = 'https://api.genderize.io';
  const urlMy = `${serverUrl}?name=${firstName}`;
  const result = document.querySelector('#result');
  fetch(urlMy).then(response => response.json()).then(commits => result.textContent = `${commits.name[0].toUpperCase() + commits.name.slice(1)} is ${commits.gender}`);
  event.currentTarget.querySelector('#firstName').value = '';
});
