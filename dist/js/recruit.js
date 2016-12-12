'use strict';

var deadline = new Date(2017, 4, 5); //2016/12/31--24:00

var today = new Date();
var svg = d3.select('#recruit-calendar').append('svg');
var tooltip = d3.select('#recruit-calendar').append('tooltip').attr('class', 'tooltip');

var isMobile = $(window).width() < 780 ? true : false;
var margin = {
	calendarX: isMobile ? 10 : 30,
	calendarY: isMobile ? 15 : 20,
	xaxisY: isMobile ? 30 : 40,
	circleR: 5
};

var deviceHeight = $(window).height();
var calendarWidth = void 0;
var calendarHeight = void 0;
var rectWidth = void 0;
var rectHeight = void 0;

var curSelectId = 'info';
$('.btn-section').click(function () {
	if (this.id === curSelectId) {
		;
	} else {
		$('#recruit-' + curSelectId).addClass('is-hidden');
		$('#recruit-' + this.id).removeClass('is-hidden');
		$('.btn-section').toggleClass('btn-recruit-disable');

		window.location.hash = '#recruit-' + this.id;

		curSelectId = this.id;
		$('html,body').scrollTop(0);
		console.log("switch to : " + '#recruit-' + this.id);
	}
});

// Info Code-------------

// same height all info cards
var sameHeightAllCards = function sameHeightAllCards() {

	var cardLen = $('.m-info-type .gap').length;
	var maxHeight = 0;
	for (var i = cardLen - 1; i >= 0; i--) {
		if ($('.m-info-type:nth-child(' + (i + 1) + ') .gap').height() > maxHeight) {
			maxHeight = $('.m-info-type:nth-child(' + (i + 1) + ') .gap').height();
		}
	}
	for (var _i = cardLen - 1; _i >= 0; _i--) {
		$('.m-info-type:nth-child(' + (_i + 1) + ') .gap').height(maxHeight);
	}
};
sameHeightAllCards();

// Calendar Code-------------
var calendarEvent = void 0; // read json
var startDay = d3.timeSunday(d3.timeMonth(today));
var endDay = d3.timeSunday(new Date(2016, today.getMonth() + 1));

// d3.json('https://raw.githubusercontent.com/TeachForTaiwan/tft-recruit/gh-pages/src/calendarEvent.json', function(error, data){
d3.json('../../src/calendarEvent.json', function (error, data) {

	if (error) alert('Parse calendar event ERROR!\n' + error);

	// @BUG : 不知道為什麼手機版需要在這裡重新讀取一次高度才行
	if (isMobile) deviceHeight = $(window).height();

	calendarWidth = $('#recruit-calendar').width();
	calendarHeight = deviceHeight - $('header').height() - $('main').height();
	rectWidth = (calendarWidth - margin.calendarX * 8) / 7;
	rectHeight = (calendarHeight - margin.calendarY * 7) / 5; // 4(間距) + 2(兩側)

	console.log($(window).height(), deviceHeight);

	svg.attr('width', function () {
		return calendarWidth;
	}).attr('height', function () {
		if (isMobile) calendarHeight += 100;

		return calendarHeight;
	});

	calendarEvent = data;
	drawCalendar(startDay, endDay);
});

$('.calendar-month').click(function () {
	var arr = this.id.split('-')[1];
	$('.calendar-month').removeClass('month-active');
	$('#' + this.id).addClass('month-active');

	switch (arr) {
		case 'December':
			startDay = d3.timeSunday(new Date(2016, 11));
			endDay = d3.timeSunday(new Date(2016, today.getMonth() + 1));
			break;
		case 'January':
			startDay = d3.timeSunday(new Date(2016, 12));
			endDay = d3.timeSunday(d3.timeWeek.offset(new Date(2017, 1), 1));
			break;
		case 'February':
			startDay = d3.timeSunday(new Date(2017, 1));
			endDay = d3.timeSunday(d3.timeWeek.offset(new Date(2017, 2), 1));
			break;
		case 'March':
			startDay = d3.timeSunday(new Date(2017, 2));
			endDay = d3.timeSunday(d3.timeWeek.offset(new Date(2017, 3), 1));
			break;
	}
	drawCalendar(startDay, endDay, 'c');
});

// TODO: 等開放之後再把時間加進來
// initializeClock('countdownDIV', deadline);
// ---------------------
function _format(time, option) {
	switch (option) {
		case 'd':
			return time.getDay(); // Sunday = 0
		case 'w':
			var formatW = d3.timeFormat('%W'); // 取得一年中的第幾週
			return formatW(time) - formatW(startDay);
		case 'a':
			var formata = d3.timeFormat('%a'); // 取得星期幾
			return formata(time);
		case 'm':
			var formatB = d3.timeFormat('%B'); // 取得幾月
			return formatB(time);
		default:
			return alert("Shit 轉換時間出錯了！");
	}
}

function _setCalendarBar() {
	$('.calendar-month').each(function (index, el) {
		var month = el.id.split("-")[1];
		if (month === _format(today, 'm')) $(el).addClass('month-active');
	});
}

function displayNone(time, opt) {
	if (_format(time, 'm') !== _format(opt, 'm')) return 'none';else return 'block';
}

function opacityHidden(time, opt) {
	if (_format(time, 'm') !== _format(opt, 'm')) return 0;else return 1;
}

function getRectX(time) {
	return _format(time, 'd') * (rectWidth + margin.calendarX) + margin.calendarX; // Add padding in section
}

function getRectY(time) {
	var getWeek = _format(time, 'w');
	if (_format(time, 'd') === 0) getWeek += 1;

	return (getWeek - 1) * (rectHeight + margin.calendarY) + margin.calendarY + margin.xaxisY / 2; // Add padding in section
}

/*
 * TODO: 能同時顯示兩筆資料（因為現在用d3跑，所以一筆綁一筆）
ex: 		
		"21":[{
				"title":"陽明校園擺攤",
				"showing": "台中場",
				"time": "14:00 - 16:00",
				"location": "客家文化中心 3F 媒體簡報室"
			},{
				"title":"交大講座",
				"showing": "台中場",
				"time": "14:00 - 16:00",
				"location": "客家文化中心 3F 媒體簡報室"
			}],
*/

function drawCalendar(startDay, endDay, option) {
	/*
  * 's' : start(default)
  * 'c' : change
  */
	option = option || 's';

	var calendarRange = d3.timeDays(startDay, endDay);

	// Mon, Tue...
	var x = d3.scaleTime().domain([startDay, d3.timeDay.offset(startDay, 6)]).range([margin.calendarX + rectWidth / 2, calendarWidth - margin.calendarX - rectWidth / 2]);

	var xAxis = d3.axisTop().scale(x).ticks(7).tickFormat(function (d) {
		return _format(d, 'a');
	});

	if (option === 's') {
		_init();
	} else if (option === 'c') {
		_change();
	}

	function _init() {

		var month = _format(today, 'm');
		var dayGrid = svg.selectAll("g").data(calendarRange).enter().append("g").attr('class', 'grid');

		// rect
		dayGrid.append('rect').attr('class', function (d) {
			if (calendarEvent[month][d.getDate()] !== undefined) return 'day rect-active';else return 'day';
		}).attr('width', rectWidth).attr('height', rectHeight).attr('x', function (d) {
			return getRectX(d);
		}).attr('y', function (d) {
			return getRectY(d);
		}).style('display', function (d) {
			return displayNone(d, today);
		}).on("mouseout", function (d) {
			tooltip.style("display", "none").style("opacity", "0");
		}).on("click", function (d, i) {
			if (isMobile) {
				var event = calendarEvent[month][d.getDate()];
				console.log(event);
				if (event) {
					$('#c-mobile-content').html(event.title + "&nbsp;" + event.date + "&nbsp;" + event.time);
					$('#c-mobile-location').html(event.location);
				} else {
					$('#c-mobile-content').html('這天還沒有活動喔！');
					$('#c-mobile-location').html('敬請期待 ^_^');
				}
			} else ;
		});

		// calendar-event
		dayGrid.append('text').attr('class', 'calendar-event').attr('data-date', function (d) {
			return d.getDate();
		}).attr('x', function (d) {
			return getRectX(d) + 23;
		}).attr('y', function (d) {
			// if(!Array.isArray(calendarEvent[month][d.getDate()]))
			// 	return getRectY(d) + 60 ;
			return getRectY(d) + 60;
		}).style('display', function (d) {
			return displayNone(d, today);
		}).text(function (d) {
			if (calendarEvent[month][d.getDate()] !== undefined) {
				$(this).addClass('calendar-active');
				return calendarEvent[month][d.getDate()].title;
			} else {
				$(this).removeClass('calendar-active');
			}
		}).on("mousemove", function (d, i) {
			var event = calendarEvent[month][d.getDate()];
			tooltip.style('left', d3.event.pageX - $('.tooltip').width() / 2 + 'px').style('top', d3.event.pageY + $('.tooltip').height() / 2 + "px").style("opacity", "1").style("display", "inline-block").html(event.showing + "&nbsp;" + event.time + "<br>" + event.location);
		});

		// circle
		dayGrid.append('circle').attr('cx', function (d, i) {
			var x = isMobile ? rectWidth / 2 - margin.circleR : 10;
			return getRectX(d) + x + margin.circleR;
		}).attr('cy', function (d) {
			var y = isMobile ? rectHeight / 2 + 20 : 60;
			return getRectY(d) + y - margin.circleR;
		}).attr('r', margin.circleR).style('display', function (d) {
			if (calendarEvent[month][d.getDate()] === undefined || displayNone(d, today) === 'none') return 'none';else return 'block';
		});

		// date
		dayGrid.append('text').attr('class', 'date').attr('x', function (d) {
			return getRectX(d) + 10;
		}).attr('y', function (d) {
			return getRectY(d) + 30;
		}).text(function (d) {
			return d.getDate();
		}).style('display', function (d) {
			return displayNone(d, today);
		});

		svg.append("g").attr("class", "xAxial").attr("transform", 'translate(0,' + margin.xaxisY + ')').call(xAxis);

		_setCalendarBar(startDay);
	}

	function _change() {
		// console.log(calendarRange);
		var monMiddle = calendarRange[15];

		var dayGrid = svg.selectAll(".grid").data(calendarRange);
		var di = 0,
		    ti = 0,
		    ci = 0,
		    datai = 0;
		var month = _format(monMiddle, 'm');
		// $('rect').off('click');
		// $('.calendar-event').off('mousemove');

		dayGrid.selectAll('rect').attr('id', function () {
			return 'date-' + calendarRange[datai++].getDate();
		}).attr('class', function () {
			if (calendarEvent[month][calendarRange[ci++].getDate()] !== undefined) return 'rect-active day';else return 'day';
		}).on("click", null).on("click", function (d, i) {
			if (isMobile) {
				var date = this.id.split('-')[1];
				var event = calendarEvent[month][date];
				console.log(event, date);
				console.log($(this));
				if (event) {
					$('#c-mobile-content').html(event.title + "&nbsp;" + event.date + "&nbsp;" + event.time);
					$('#c-mobile-location').html(event.location);
				} else {
					$('#c-mobile-content').html('這天還沒有活動喔！');
					$('#c-mobile-location').html('敬請期待 ^_^');
				}
			} else ;
		}).transition().duration(500).style('display', 'block').style('opacity', function () {
			// console.log(opacityHidden(calendarRange[di++], monMiddle));
			return opacityHidden(calendarRange[di++], monMiddle);
		});

		ci = 0, di = 0, datai = 0;
		dayGrid.selectAll('.calendar-event').attr('data-date', function () {
			return calendarRange[datai++].getDate();
		}).style('display', function () {
			return displayNone(calendarRange[di++], monMiddle);
		}).text(function () {
			// let date = $(this).data('date');
			if (calendarEvent[month][calendarRange[ci].getDate()] !== undefined) {
				$(this).addClass('calendar-active');
				return calendarEvent[month][calendarRange[ci++].getDate()].title;
			} else {
				$(this).removeClass('calendar-active');
			}

			ci++;
		}).on("mousemove", null).on("mousemove", function () {
			var date = $(this).data('date');
			var event = calendarEvent[month][date];

			tooltip.style('left', d3.event.pageX - $('.tooltip').width() / 2 + 'px').style('top', d3.event.pageY + $('.tooltip').height() / 2 + "px").style("opacity", "1").style("display", "inline-block").html(event.showing + "&nbsp;" + event.time + "<br>" + event.location);
		});

		di = 0, ci = 0, datai = 0;
		dayGrid.selectAll('.grid circle').attr('data-date', function () {
			return calendarRange[datai++].getDate();
		}).style('display', function () {
			var display = void 0;
			if (calendarEvent[month][calendarRange[ci].getDate()] === undefined || displayNone(calendarRange[di], monMiddle) === 'none') display = 'none';else display = 'block';

			ci++;
			di++;
			return display;
		});

		di = 0, ti = 0;
		dayGrid.selectAll('.date').text(function () {
			return calendarRange[ti++].getDate();
		}).style('display', function () {
			return displayNone(calendarRange[di++], monMiddle);
		});
	}
}

function initRecruitPage() {
	var hash = window.location.hash;

	if (hash.indexOf('calendar') > 0) {
		$('#recruit-info').addClass('is-hidden');
		$('#recruit-calendar').removeClass('is-hidden');
		$('.btn-section').toggleClass('btn-recruit-disable');
		curSelectId = 'calendar';
	}
}