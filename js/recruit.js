const deadline = new Date(2017, 4, 5); //2016/12/31--24:00

const today = new Date();
const calendarHeight = $(window).height() - $('header').height() - $('main').height();
const calendarWidth = $('#recruit-calendar').width();
const margin = {
  calendarX: 30,
  calendarY: 20,
  xaxisY: 40
};
const rectHeight = (calendarHeight - margin.calendarY * 7) / 5; // 4(間距) + 2(兩側)
const rectWidth = (calendarWidth - margin.calendarX * 8) / 7;
const svg = d3.select('#recruit-calendar').append('svg')
  .attr('width', calendarWidth)
  .attr('height', calendarHeight);

let curSelectId = 'info';
$('.btn-section').click(function() {
  if (this.id === curSelectId) {;
  } else {
    $('#recruit-' + curSelectId).addClass('is-hidden');
    $('#recruit-' + this.id).removeClass('is-hidden')
    $('.btn-section').toggleClass('btn-recruit-disable');

    window.location.hash = '#recruit-' + this.id;

    curSelectId = this.id;
    $('html,body').scrollTop(0);
    console.log("switch to : " + '#recruit-' + this.id);
  }
})

// Calendar Code-------------
let startDay = d3.timeSunday(d3.timeMonth(today));
let endDay = d3.timeSunday(new Date(2016, (today.getMonth()+ 1) ));
var calendarEvent;
d3.json('../../src/calendarEvent.json', function(error, data){
	if(error)
		alert('Parse calendar event ERROR!\n' + error);

	calendarEvent = data;
	drawCalendar(startDay, endDay);
})

$('.calendar-month').click(function(){
	$('.calendar-month').removeClass('month-active');
	$('#' + this.id).addClass('month-active');

	switch(this.id){
		case 'December':
			startDay = d3.timeSunday(new Date(2016, 11));
			endDay = d3.timeSunday(new Date(2016, (today.getMonth()+ 1) ));
			break ;
		case 'January':
			startDay = d3.timeSunday(new Date(2016, 12));
			endDay = d3.timeSunday(d3.timeWeek.offset(new Date(2017, 1), 1));
			break ;
		case 'February':
			startDay = d3.timeSunday(new Date(2017, 1));
			endDay = d3.timeSunday(d3.timeWeek.offset(new Date(2017, 2), 1));
			break ;
		case 'March':
			startDay = d3.timeSunday(new Date(2017, 2));
			endDay = d3.timeSunday(d3.timeWeek.offset(new Date(2017, 3), 1));
			break ;
	}
	drawCalendar(startDay, endDay, 'c');
})

// TODO: 等開放之後再把時間加進來
// initializeClock('countdownDIV', deadline);
// ---------------------
function _format(time, option) {
  switch (option) {
    case 'd':
      return time.getDay(); // Sunday = 0
    case 'w':
      let formatW = d3.timeFormat('%W'); // 取得一年中的第幾週
      // console.log(formatW(startDay));
      // console.log(time);
      return formatW(time) - formatW(startDay);
    case 'a':
      let formata = d3.timeFormat('%a'); // 取得星期幾
      return formata(time);
    case 'm':
      let formatB = d3.timeFormat('%B'); // 取得幾月
      return formatB(time);
    default:
      return alert("Shit 轉換時間出錯了！");
  }
}

function _setCalendarBar(){
	$('.calendar-month').each(function(index, el){
		if(el.id === _format(today, 'm'))
			$(el).addClass('month-active');
	})
}

function displayNone(time, opt){
	if(_format(time,'m') !== _format(opt,'m'))
		return 'none';
	else
		return 'block';
}

function opacityHidden(time, opt){
	if(_format(time,'m') !== _format(opt,'m'))
		return 0;
	else
		return 1;
}

function getRectX(time) {
  return _format(time, 'd') * (rectWidth + margin.calendarX) + margin.calendarX; // Add padding in section
}

function getRectY(time) {
  let getWeek = _format(time, 'w');
  if (_format(time, 'd') === 0)
    getWeek += 1;

  return (getWeek - 1) * (rectHeight + margin.calendarY) + margin.calendarY + margin.xaxisY / 2; // Add padding in section
}

function drawCalendar(startDay, endDay, option){
	/*
	 * 's' : start(default)
	 * 'c' : change
	 */
	option = option || 's';

	let calendarRange = d3.timeDays(startDay, endDay);
	console.log(calendarRange);

	// Mon, Tue...
	let x = d3.scaleTime()
	  .domain([startDay, d3.timeDay.offset(startDay, 6)])
	  .range([margin.calendarX + rectWidth / 2, calendarWidth - margin.calendarX - rectWidth / 2]);

	let xAxis = d3.axisTop()
	  .scale(x)
	  .ticks(7)
	  .tickFormat(function(d) {
	    return _format(d, 'a');
	  })

	if (option === 's'){
		_init();
	}else if( option === 'c'){
		_change();
	}

	function _init(){
		//  calendar
		let dayGrid = svg.selectAll("g")
		  .data(calendarRange)
		  .enter()
		  .append("g")
			  .attr('class', 'grid');

		// draw
		dayGrid
		  .append('rect')
			  .attr('class', 'day')
			  .attr('width', rectWidth)
			  .attr('height', rectHeight)
			  .attr('x', function(d) {
			    return getRectX(d);
			  })
			  .attr('y', function(d) {
			    return getRectY(d);
			  })
			  .style('display', function(d){
			  	return displayNone(d, today);
			  })

		dayGrid
		  .append('text')
		  	.attr('class', 'date')
			  .attr('x', function(d) {
			    return getRectX(d) + 10;
			  })
			  .attr('y', function(d) {
			    return getRectY(d) + 30;
			  })
			  .text(function(d) {
			    return d.getDate();
			  })
			  .style('display', function(d){
			  	return displayNone(d, today);
			  })

		dayGrid
			.append('text')
				.attr('class', 'calendar-event')
				.attr('x', function(d){
					return getRectX(d) + 10;
				})
				.attr('y', function(d){
					return getRectY(d) + 60;
				})
				.style('display', function(d){
			  	return displayNone(d, today);
			  })
				.text(function(d){
					let month = _format(today, 'm');
					if(calendarEvent[month][d.getDate()] !== undefined)
						return calendarEvent[month][d.getDate()];
				})

		svg
		  .append("g")
			  .attr("class", "xAxial")
			  .attr("transform", 'translate(0,' + margin.xaxisY + ')')
			  .call(xAxis);

		_setCalendarBar(startDay);
	}

	function _change(){
		// console.log(calendarRange);
		let dayGrid = svg.selectAll(".grid")
		let xi = 0, yi = 0, di = 0, ti = 0;
		 
		dayGrid
		  .selectAll('rect')
			.transition()
			.duration(500)
			.attr('x', function() {
				console.log(calendarRange[xi]);
		    return getRectX(calendarRange[xi++]);
		  })
		  .attr('y', function() {
		    return getRectY(calendarRange[yi++]);
		  })
		  .style('opacity', function(){
		  	return opacityHidden(calendarRange[di++], calendarRange[15]);
		  })
		  .style('display', 'block')

		// reset 
		xi = 0, yi = 0, di = 0, ti = 0;
		dayGrid
		  .selectAll('.date')
		  .transition()
			.duration(800)
			  .attr('x', function() {
			    return getRectX(calendarRange[xi++]) + 10;
			  })
			  .attr('y', function() {
			    return getRectY(calendarRange[yi++]) + 30;
			  })
			  .text(function() {
			    return calendarRange[ti++].getDate();
			  })
			  .style('display', function(){
			  	return displayNone(calendarRange[di++], calendarRange[15]);
			  })

		xi = 0, yi = 0, di = 0, ti = 0;
		dayGrid
			.selectAll('.calendar-event')
				.attr('x', function(){
					return getRectX(calendarRange[xi++]) + 10;
				})
				.attr('y', function(){
					return getRectY(calendarRange[yi++]) + 60;
				})
				.style('display', 'block')
				.style('opacity', function(){
					return opacityHidden(calendarRange[di++], calendarRange[15]);
				})
				.text(function(){
					let month = _format(calendarRange[15], 'm');
					if(calendarEvent[month][calendarRange[ti].getDate()] !== undefined)
						return calendarEvent[month][calendarRange[ti++].getDate()];

					ti++;
				})
	}
		
}
