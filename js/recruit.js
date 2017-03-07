const today = new Date();
let curSelectId = 'info';

sameHeightAllCards(); // set all info-box same height 

let vm = new Vue({
	delimiters: ['${', '}'],
	el: '#recruit-calendar',
	data: {
		calendarDatas: ['載入中'],
		show: true
	},

	mounted: function(){
		this.$nextTick(function () {
			let month = today.getMonth();
			this.calendarDatas = calendarData[ getCalendarEname(month) ];
	  })
	},

	methods:{
		tooltipIn: function(activity, e){
			$('.tooltip').css({
				opacity: 1,
				zIndex: 1000,
				left: e.pageX - 80,
				top: e.pageY + document.documentElement.scrollTop + 20
			})

			$('.tooltip').html(
				activity.showing + '&nbsp;' +
				activity.time + '<br>' +
				activity.location
			);
		},
		tooltipOut: function(e){		
			$('.tooltip').css({
				opacity: 0,
				zIndex: -1
			})
		},
		setData: function(month){
			this.calendarDatas = calendarData[month];
		},
		showMobileContent: function(data){
			let events = data.activities;

			$('.mobile-content').empty();
			if(events.length == '0'){
				$('.mobile-content').append('<p>請點選有黃色框框的事件</p>');
				$('.mobile-content').append('<p>日曆出現詳細資訊</p>'); 
			}else{
				events.forEach(function(value, index){
					$('.mobile-content').append('<p>' + (index+1) + '. ' + value.title + ' ' + value.date + ' ' + value.time + '</p>');
					$('.mobile-content').append('<p> 備註：' + ' ' + value.location + '</p>');
					
					if(index == 1){
						$('.mobile-content').css('bottom', '-8em');
						$('#recruit-calendar').css('marginBottom', '8em');
					}
				})
			}

			if($(window).width() < 800){
				$('hrml,body').animate({
	  			scrollTop: $(window).height()
	  		})
			}
		}
	}
})


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


$('.calendar-month').click(function(){
	let arr = this.id.split('-')[1];
	let rangeArray ;

	$('.calendar-month').removeClass('month-active');
	$('#' + this.id).addClass('month-active');

})

function getCalendarEname(month){
	let monthEname = '';
	switch(month){
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

function initialCalendarMonth(monthEname){
	$('.calendar-month').each(function(index, el){
		let month = el.id.split("-")[1];
		if(month === monthEname)
			$(el).addClass('month-active');
	})
}

function sameHeightAllCards(){

	const cardLen = $('.m-info-type .gap').length;
	let maxHeight = 0;
	for (let i = cardLen - 1; i >= 0; i--) {
		if($(`.m-info-type:nth-child(${i+1}) .gap`).height()>maxHeight){
			maxHeight = $(`.m-info-type:nth-child(${i+1}) .gap`).height();
		}
	}
	for (let i = cardLen - 1; i >= 0; i--) {
		$(`.m-info-type:nth-child(${i+1}) .gap`).height(maxHeight);
	}	
}
