import UI from './view.js';

function changeTab(event) {
  if (!event.target.classList.contains('menu-checked')) {
    const preventTarget = event.target.parentElement.querySelector('.menu-checked');
    const preventTargetId = preventTarget.getAttribute('id');
    const preventWindow = UI.WINDOWS[preventTargetId];
    preventWindow.style.display = 'none';
    preventTarget.classList.remove('menu-checked');
    event.target.classList.add('menu-checked');
    const targetId = event.target.getAttribute('id');
    const currentWindow = UI.WINDOWS[targetId];
    currentWindow.style.display = 'block';
  }
}

for (let tab of UI.TABS) {
  tab.addEventListener('click', changeTab);
}