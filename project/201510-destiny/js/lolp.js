(function() {
	PopMgr.setConfig({
		// width: 1556,
		// height: 708,
		// pdtop: 0,
		// pdright: 0,
		// pdbottom: 0,
		// pdleft: 0
		//width: 1920,
		height: 900		
	});

	var popEventsContent = function() {
		var wrap = $('#J-evts-w,#J-evts-01,#J-evts-02,#J-evts-03,#J-evts-04');
		if (!wrap.length) {
			return;
		}
		var triggers = wrap.find('.J-evts-t'),
			contents = $('#J-evts-cw').find('.J-evts-c');
		function init() {
			triggers.each(function(index) {
				var content = contents.eq(index),
					href = $(this).data('href');
				$(this).click(function() {
					PopMgr.attachBox({
						//inline: content,//$('#inline1').html(),
						iframe: href,
						top:0
					});
				})
			})
		}

		return{
			init: init
		};
	}();

	popEventsContent && popEventsContent.init();
})(jQuery);