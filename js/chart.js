$(document).scroll(function () {
    var offset = $('.school__item').offset().top - $(window).scrollTop();

    if (offset <= 600) {
		$('.chart01').easyPieChart({
			animate: 2000,
			lineWidth: 5,
			size: 150,
			easing: 'easeOutBounce',
			barColor: '#f96a6a',
			scaleColor: '#f96a6a',
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		});
		$('.chart02').easyPieChart({
			animate: 5000,
			lineWidth: 5,
			size: 150,
			easing: 'easeOutBounce',
			barColor: '#6c9ff6',
			scaleColor: '#6c9ff6',
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		});
    }
    else {
    }

})