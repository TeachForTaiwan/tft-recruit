/*
 *  Get TimeRemaining
 */
const getTimeRemaining = (endtime) => {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes
    // 'seconds': seconds
  };
}

const initializeClock = (id, endtime) => {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  // var secondsSpan = clock.querySelector('.seconds');
  var schedule = [
    ['Jul 25 2015', 'Sept 20 2015'],
    ['Sept 21 2015', 'Jul 25 2016'],
    ['Jul 25 2016', 'Jul 25 2030']
  ];

  const updateClock = () => {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    // secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// -------------------------------

// ----- Main CODE -------
// ----- DOMContentLoaded -----
document.addEventListener('DOMContentLoaded', () => {

  const menuBtn = document.querySelector('.menu_button');
  const menuList = document.querySelector('.m-nav--mobile');
  const mask = document.querySelector('.overlay');
  const $banner = $('.wrap');
  const quoteH = $('.wrap .quote').innerHeight();
  const gDocTabName = document.getElementById('gDoc').dataset.name;
  const setBannerBottom = (quoteH) => {
    if (window.innerWidth < 768) {
      $banner.css({
        "margin-bottom": quoteH,
      });
    } else {
      $banner.css({
        "margin-bottom": "initial",
      });
    }
  };
  const getGDoc = (callback) => {
    if (gDoc) {
      gDoc('1JP0tnjFoTQO388FpDELkfM318KSxFMbJgkCaNgR_WZQ', gDocTabName);
    }
    callback();
  };
  const loadingAnimEnd = () => {
    setTimeout(() => {
      document.querySelector('.loading-mask').classList.remove('is-loading');
    }, 500);
  };

  setBannerBottom(quoteH);

  menuBtn.addEventListener('click', (e) => {
    menuBtn.classList.toggle('is-active');
    menuList.classList.toggle('is-active');
    mask.classList.toggle('is-active');
  });

  // ----- onLoad -----
  window.addEventListener('load', () => {
    getGDoc(loadingAnimEnd);
  });

  // ----- onResize -----
  window.addEventListener('resize', () => {
    const quoteH = $('.wrap .quote').innerHeight();
    setBannerBottom(quoteH);
  });

  initPage();

});


function initPage(){
  let pathname = window.location.pathname;

  switch(pathname){
    case '/index.html':
      break;
    case '/what.html':
      $('#list-what').addClass('color-gray');
      break;
    case '/how.html':
      $('#list-how').addClass('color-gray');
      break;
    case '/why.html':
      $('#list-why').addClass('color-gray');
      break;
    case '/apply.html':
      $('#list-apply').addClass('color-gray');
      break;
    case '/faq.html':
      $('#list-faq').addClass('color-gray');
      break;
    case '/recruit.html':
      initRecruitPage();
      break;

  }
}


function initRecruitPage(){
  let hash = window.location.hash;

  if (hash.indexOf('calendar') > 0) {
    $('#recruit-info').addClass('is-hidden');
    $('#recruit-calendar').removeClass('is-hidden')
    $('.btn-section').toggleClass('btn-recruit-disable');
    curSelectId = 'calendar';
  }
}
