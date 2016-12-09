'use strict';

var deadline = new Date(2016, 11, 31); //2016/12/31--24:00

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

initializeClock('countdownDIV', deadline);