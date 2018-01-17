(function() {
    var affixNav = function() {
        var navWrapper = $('.rocker');
        if (!navWrapper.length) {
            return;
        }
        // var isAffixed = false,
        var duration = 600,
            timer = null,
            topbarh = 80,
            memuOffset = 400,
            menuh = navWrapper.outerHeight(),
            //menut = parseInt(navWrapper.css('top')),
            $win = $(window);


        function setMenuPosY() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            timer = setTimeout(function() {
                var scrollTop = $win.scrollTop();
                memuOffset = ($win.height() - menuh) / 2;
                if (navWrapper.queue('fx').length) {
                    navWrapper.stop(true);
                }
                navWrapper.animate({
                    top: scrollTop + memuOffset
                }, duration);
            },0);
        };

        function getWinHeight() {
            memuOffset = ($win.height() - menuh) / 2 - topbarh
        }

        function init() {
            getWinHeight();
            var scrollTop = $win.scrollTop();
            navWrapper.css({
                top: scrollTop + memuOffset
            });
            $win.scroll(setMenuPosY);
            $win.resize(getWinHeight);
        }
        return {
            init: init
        };
    }();

    var leeluobg = function() {
        var wrap = $('#J-llbg');
        if (!wrap.length) {
            return;
        }
        var items = wrap.find('.J-llbgi'),
            itemclass = 'e2-llbg__item--active',
            itemlen = items.length,
            selected = -1,
            delay = 0;

        function showBg(idx) {
            if (selected > -1) {
                items.eq(selected).removeClass(itemclass);
            }
            items.eq(idx).addClass(itemclass);
            selected = idx;
        }

        function carousel() {
            showBg((selected + 1 + itemlen) % itemlen);
            setTimeout(carousel, delay);
        }

        function init() {
            showBg(0);
            setTimeout(carousel, delay);
        }

        return {
            init: init
        };
    }();

    var bounceWords = function() {
        var words = $('#J-words');
        if (!words.length) {
            return;
        }
        var srctop = parseInt(words.css('top')),
            destop = srctop + 10,
            duration = 200;

        function bounce() {
            words.animate({
                top: destop
            }, duration, function() {
                words.animate({
                    top: srctop
                }, duration, bounce);
            });
        }

        return {
            bounce: bounce
        };
    }();

    var Flash = function(elem, src, opts) {
        this.elem = document.getElementById(elem);
        if (!this.elem || !src) {
            return;
        }
        this.src = src;

        this.opts = opts || {};
        this.opts.wmode = this.opts.wmode || 'transparent';
        this.opts.width = this.opts.width || '100%';
        this.opts.height = this.opts.height || '100%';
        this.init();
    };

    Flash.prototype = {
        init: function() {
            this.elem.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.opts.width + '" height="' + this.opts.height + '"> <param name="movie" value="' + this.src + '" /> <param name="quality" value="high" /> <param name="wmode" value="' + this.opts.wmode + '" /><!--[if !IE]>--> <object type="application/x-shockwave-flash" data="' + this.src + '" width="' + this.opts.width + '" height="' + this.opts.height + '"> <!--<![endif]--> <param name="quality" value="high" /> <param name="wmode" value="' + this.opts.wmode + '" /><!--[if !IE]>--> </object> <!--<![endif]--> </object>';
        }
    };
    var carouselVideoImg = function() {
        var wrapper = $('#J-videow');
        if (!wrapper.length) {
            return;
        }
        var bgs = wrapper.find('.J-videoi'),
            bglen = bgs.length,
            selected = 0,
            duration = 1000,
            delay = 0;

        function switchBG(index) {
            bgs.eq(selected).css('zIndex', 0)
            bgs.eq(index).css({
                zIndex: 1,
                visibility: 'visible',
                opacity: 0
            }).animate({
                opacity: 1
            }, {
                duration: duration,
                complete: function() {
                    bgs.eq(selected).css({
                        visibility: 'hidden'
                    })
                    selected = index;
                    startInterval();
                }
            });
        }

        function startInterval() {
            setTimeout(function() {
                switchBG((selected + 1 + bglen) % bglen);
            }, delay)
        }

        return {
            init: function() {
                bgs.eq(selected).css({
                    visibility: 'visible',
                    zIndex: 1
                })
                startInterval();
            }
        }
    }();

    var indexvideo = function() {
        var trigger = $('#J-videot');
        if (!trigger.length) {
            return;
        }
        var src = 'https://www.youtube.com/embed/az_tKZywNEg?autoplay=1';
        function init() {
            PopMgr.setConfig({
                width: 856,
                height: 515,
                pdtop: 26,
                pdleft: 26,
                pdbottom: 26,
                pdright: 26
            });
            PopMgr.attachBox({
                iframe: src
            });
            trigger.click(function() {
                PopMgr.attachBox({
                    iframe: src
                });
            })
        }
        return {
            init: init
        };
    }();

    leeluobg && leeluobg.init();
    bounceWords && bounceWords.bounce();
    affixNav && affixNav.init();
    new Flash('J-swfbg', 'swf/bgf.swf', {
        width: '1920',
        height: '1000'
    });
    carouselVideoImg && carouselVideoImg.init();
    indexvideo && indexvideo.init();
})();
