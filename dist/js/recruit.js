'use strict';

var deadline = new Date(2017, 4, 5); //2016/12/31--24:00

var today = new Date();
var curSelectId = 'info';

// TODO: 等開放之後再把時間加進來
// initializeClock('countdownDIV', deadline);

sameHeightAllCards(); // set all info-box same height 

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

$('.calendar-month').click(function () {
	var arr = this.id.split('-')[1];
	var rangeArray = void 0;

	$('.calendar-month').removeClass('month-active');
	$('#' + this.id).addClass('month-active');
});

var vm = new Vue({
	delimiters: ['${', '}'],
	el: '#recruit-calendar',
	data: {
		calendarDatas: ['載入中'],
		show: true
	},

	mounted: function mounted() {
		this.$nextTick(function () {
			var month = today.getMonth();
			this.calendarDatas = calendarData[getCalendarEname(month)];
		});
	},

	methods: {
		tooltipIn: function tooltipIn(activity, e) {
			$('.tooltip').css({
				opacity: 1,
				zIndex: 1000,
				left: e.pageX - 80,
				top: e.pageY + document.documentElement.scrollTop + 20
			});

			$('.tooltip').html(activity.showing + '&nbsp;' + activity.time + '<br>' + activity.location);
		},
		tooltipOut: function tooltipOut(e) {
			$('.tooltip').css({
				opacity: 0,
				zIndex: -1
			});
		},
		setData: function setData(month) {
			this.calendarDatas = calendarData[month];
		},
		showMobileContent: function showMobileContent(data) {
			var events = data.activities;

			$('.mobile-content').empty();
			if (events.length == '0') {
				$('.mobile-content').append('<p>請點選有紅色框框的事件</p>');
				$('.mobile-content').append('<p>日曆出現詳細資訊</p>');
			} else {
				events.forEach(function (value, index) {
					$('.mobile-content').append('<p>' + (index + 1) + '. ' + value.title + ' ' + value.date + ' ' + value.time + '</p>');
					$('.mobile-content').append('<p> 備註：' + ' ' + value.location + '</p>');

					if (index == 1) {
						$('.mobile-content').css('bottom', '-8em');
						$('#recruit-calendar').css('marginBottom', '8em');
					}
				});
			}

			if ($(window).width() < 800) {
				$('hrml,body').animate({
					scrollTop: $(window).height()
				});
			}
		}
	}
});

function getCalendarEname(month) {
	var monthEname = '';
	switch (month) {
		case 11:
			monthEname = 'december';
			break;
		case 0:
			monthEname = 'january';
			break;
		case 1:
			monthEname = 'february';
			break;
		case 2:
			monthEname = 'march';
			break;
		default:
			alert('選取時間出錯了，shit!');
	}

	initialCalendarMonth(monthEname);
	return monthEname;
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

function initialCalendarMonth(monthEname) {
	$('.calendar-month').each(function (index, el) {
		var month = el.id.split("-")[1];
		if (month === monthEname) $(el).addClass('month-active');
	});
}

function sameHeightAllCards() {

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
}