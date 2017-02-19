'use strict';

var storySets = document.querySelectorAll('.story-set');
var mask = document.querySelector('.md-overlay');
var closeBtn = document.querySelector('.md-close');

// trigger every story cards
storySets.forEach(function (e) {
  e.addEventListener('click', function () {
    mask.classList.add('is-active');
  });
});