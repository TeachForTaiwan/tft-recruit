'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.querySelector('.menu_button');
  var menuList = document.querySelector('.m-nav--mobile');
  var mask = document.querySelector('.overlay');

  menuBtn.addEventListener('click', function (e) {
    menuBtn.classList.toggle('is-active');
    menuList.classList.toggle('is-active');
    mask.classList.toggle('is-active');
  });
});