var fs = require("fs");

module.exports= function (hbs) {
  // register partials
  hbs.registerPartial('head', getPartials('head'));
  hbs.registerPartial('header', getPartials('header'));
  hbs.registerPartial('footer', getPartials('footer'));
  hbs.registerPartial('nav', getPartials('nav'));
  hbs.registerPartial('apply-button', getPartials('apply-button'));

  hbs.registerPartial('recruit-info', getPartials('recruit-info'));
  hbs.registerPartial('recruit-calendar', getPartials('recruit-calendar'));

  hbs.registerPartial('onepage-header', getPartials('onepage-header'));
};

function getPartials(filename) {
  var template = fs.readFileSync('./layout/partial/'+filename+'.hbs', 'utf8');
  template = template.replace(/[\t\n]/g, '');
  return template;
}
