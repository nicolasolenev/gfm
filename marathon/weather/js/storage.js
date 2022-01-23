import UI from './view.js';

if (!localStorage.getItem('favoriteCities')) {
  localStorage.setItem('favoriteCities', '{"checked":"Moscow","cities":[]}');
}

const storage = {
  getFavoriteCities() {
    return JSON.parse(localStorage.getItem('favoriteCities'));
  },
  saveCheckedCity(cityName) {
    const favoriteCities = storage.getFavoriteCities();
    favoriteCities.checked = cityName;
    storage.saveCityToLocalStorage(favoriteCities);
  },
  saveFavoriteCity() {
    const favoriteCities = storage.getFavoriteCities();
    if (favoriteCities.cities.includes(UI.CITY[0].textContent)) {
      return
    }
    favoriteCities.cities.push(UI.CITY[0].textContent);
    storage.saveCityToLocalStorage(favoriteCities);
  },
  deleteFavoriteCity() {
    const favoriteCities = storage.getFavoriteCities();
    favoriteCities.cities = favoriteCities.cities.filter(elem => elem !== this.previousElementSibling.textContent);
    storage.saveCityToLocalStorage(favoriteCities);
  },
  saveCityToLocalStorage(favoriteCities) {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  },
}

export default storage;