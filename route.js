/*
  It's all by  `canner-core` to transform
*/
var route = [
    {
      data: {
        path: './',
        title: '',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/index.hbs",
      filename: "./index.html"
    },
    {
      data: {
        path: './',
        title: 'TFT看見的問題',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/what.hbs",
      filename: "./what.html"
    },{
      data: {
        path: './',
        title: 'TFT計畫概覽',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/how.hbs",
      filename: "./how.html"
    },{
      data: {
        path: './',
        title: '為什麼是你？',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/why.hbs",
      filename: "./why.html"
    },{
      data: {
        path: './',
        title: '如何申請',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/apply.hbs",
      filename: "./apply.html"
    },{
      data: {
        path: './',
        title: '招募活動',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/recruit.hbs",
      filename: "./recruit.html"
    },{
      data: {
        path: './',
        title: '常見問答',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/faq.hbs",
      filename: "./faq.html"
    },
    {
      data: {
        path: './',
        title: '',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/onepage.hbs",
      filename: "./onepage.html"
    }
  ];
module.exports = route;