const storySets = document.querySelectorAll('.story-set');
const mask = document.querySelector('.md-overlay');
const closeBtn = document.querySelector('.md-close');

// trigger every story cards
storySets.forEach((e)=> {
  e.addEventListener('click',()=>{
    mask.classList.add('is-active');
    
  });
});
