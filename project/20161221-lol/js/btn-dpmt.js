var slider = function() {
    var slider = $('#J-slider');
    if (!slider.length) {
        return;
    }
    var wrap = $('#content'),
        backl = $('#back'),
        backr = $('#back-AVA'),
        golol = $('#btn-game-LOL'),
        goava = $('#btn-game-AVA'),
        content = slider.find('.J-slider-item'),
        heightarr = [],
        curindex = -1,
        duration = 300,
        isAnimating = false;

    function navigate(selected) {
        if (isAnimating || curindex == selected) {
            return;
        }

        isAnimating = true;

        if (curindex === 0) {
            backl.hide();
        } else if (curindex == 2) {
            backr.hide();
        }


        curindex = selected;

        affixNav.setCurpage(getCurPage());

        wrap.height(heightarr[selected]);

        slider.animate({
            left: -selected * 100 + '%'
        }, duration, function() {
            if (selected === 0) {
                backl.show();
            } else if (selected == 2) {
                backr.show();
            }
            // curindex = selected;
            isAnimating = false;
        });
    }

    function init() {
        content.each(function() {
            heightarr.push($(this).outerHeight());
        });

        curindex = 1;

        slider.css({
            left: -curindex * 100 + '%'
        });
        wrap.height(heightarr[curindex]);

        golol.click(function() {
            navigate(0);
        });

        goava.click(function() {
            navigate(2);
        });

        backl.click(function() {
            navigate(1);
        });

        backr.click(function() {
            navigate(1);
        });
    }

    function getCurPage() {
        if (curindex === 0) {
            return 0;
        } else if (curindex == 2) {
            return 1;
        } else {
            return -1;
        }
    }

    return {
        init: init,
        getCurPage: getCurPage
    };
}();

slider && slider.init();

// (function($) {
var scrollTop = 0,
    preScrollTop = -1,
    rootElem = !!window.WebKitCSSMatrix ? $('body') : $('html'),
    $win = $(window);

var affixNav = function() {
    var navWrapper = [$('#wrap-LOL'), $('#wrap-AVA')],
        nav = [$('#J-nav-0'), $('#J-nav-1')],
        affixClass = 'fixd',
        startpos = navWrapper[0].offset().top,
        isAffixed = [false, false],
        duration = 600,
        triggers = [navWrapper[0].find('.J-nav-a'), navWrapper[1].find('.J-nav-a')],
        triggersLen = [triggers[0].length, triggers[1].length],
        items = [navWrapper[0].find('.J-main-c'), navWrapper[1].find('.J-main-c')],
        itemSelectedClass = 'select',
        selected = [-1, -1],
        scrollTimerID = null,
        itemsOffset = [
            [],
            []
        ],
        curpage = -1;

    function setCurpage(idx) {
        if (curpage != -1) {
            nav[curpage].removeClass(affixClass);
            isAffixed[curpage] = false;
        }

        if (idx == -1) {
            return;
        }

        curpage = idx;
        setMenuPosY();
        setMenuSelected();
    }

    function setMenuPosY() {
        if (scrollTop >= startpos) {
            if (!isAffixed[curpage]) {
                isAffixed[curpage] = true;
            }
            nav[curpage].addClass(affixClass);
        } else if (isAffixed[curpage]) {
            isAffixed[curpage] = false;
            nav[curpage].removeClass(affixClass);
        }
    }

    function scrollToContent() {
        triggers[0].each(function(idx) {
            $(this).click(function() {
                return switchContent(0, idx);
            });
        });
        triggers[1].each(function(idx) {
            $(this).click(function() {
                return switchContent(1, idx);
            });
        });
    }

    function init() {
        var _offset = 0;
        for (var j = 0, k = triggersLen.length; j < k; j++) {
            var tl = triggersLen[j],
                ti = items[j];
            for (var i = 0; i < tl; i++) {
                var dis = ti.eq(i).offset().top;
                if (i) {
                    dis -= _offset;
                }
                itemsOffset[j].push(dis);
            }
        }
        scrollToContent();
    }

    function setMenuSelected() {
        if (scrollTimerID) {
            clearTimeout(scrollTimerID);
        }
        scrollTimerID = setTimeout(function() {
            var idx = 0,
                _len = triggersLen[curpage] - 1,
                _itemsOffset = itemsOffset[curpage],
                _selected = selected[curpage];
            for (var i = 0, j = _len + 1; i < j; i++) {
                if (scrollTop >= _itemsOffset[i]) {
                    idx = i;
                }
                if (i == _len && idx != _selected) {
                    switchTrigger(idx);
                }
            }
            scrollTimerID = null;
        }, 60);
    }

    function switchTrigger(idx) {
        triggers[curpage].eq(idx).addClass(itemSelectedClass);
        if (selected[curpage] != -1) {
            triggers[curpage].eq(selected[curpage]).removeClass(itemSelectedClass);
        }
        selected[curpage] = idx;
    }

    function switchContent(pidx, idx) {
        var pos = itemsOffset[pidx][idx];
        if (pos != scrollTop) {
            rootElem.stop(true).animate({
                scrollTop: pos
            }, duration);
            // console.log(pos)
        }
        return false;
    }
    return {
        init: init,
        setMenuPosY: setMenuPosY,
        setMenuSelected: setMenuSelected,
        setCurpage: setCurpage
    };
}();

$win.scroll(function() {
    scrollTop = $win.scrollTop();
});

affixNav.init();
setInterval(function() {
    if (preScrollTop != scrollTop && slider.getCurPage() != -1) {
        affixNav.setMenuPosY();
        affixNav.setMenuSelected();
        preScrollTop = scrollTop;
    }
}, 16);

// })(jQuery);