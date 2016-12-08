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
        title: '問題與解方',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/solution.hbs",
      filename: "./solution.html"
    },{
      data: {
        path: './',
        title: '改變與成果',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/achievment.hbs",
      filename: "./achievment.html"
    },{
      data: {
        path: './',
        title: '申請與甄選',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/apply.hbs",
      filename: "./apply.html"
    },{
      data: {
        path: './',
        title: '資源與收穫',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/gain.hbs",
      filename: "./gain.html"
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
        title: 'FAQ',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/faq.hbs",
      filename: "./faq.html"
    },
    {
      data: {
        path: './',
        title: 'onePage',
        first_word: 'It is a good template'
      },
      partials: './partial.js',
      layout:  "./layout/onepage.hbs",
      filename: "./onepage.html"
    }
  ];
module.exports = route;