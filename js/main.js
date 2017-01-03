document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu_button');
  const menuList = document.querySelector('.m-nav--mobile');
  const mask = document.querySelector('.overlay');

  menuBtn.addEventListener('click', (e) => {
    menuBtn.classList.toggle('is-active');
    menuList.classList.toggle('is-active');
    mask.classList.toggle('is-active');
  });

});