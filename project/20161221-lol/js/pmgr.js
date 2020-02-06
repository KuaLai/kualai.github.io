(function($, window, document, undefined) {
	var PopMgr = function() {
		var storedInstance = null,
			PopConfig = {
				fitoffset: 50,
				esckey: true,
				ns: 'popns',
				width: 1000,
				height: 720,
				pdtop: 0,
				pdright: 10,
				pdbottom: 10,
				pdleft: 10,
			},
			PopBox = function() {
				document.body.insertAdjacentHTML('beforeend', '<div id="pop-wrap" class="pop-wrap"> <div id="pop-inner" class="pop-inner"> <div id="pop-gctrl" class="pop-gctrl"> <div id="pop-prev" class="pop-prev"></div> <div id="pop-next" class="pop-next"></div> </div> <div id="pop-close" class="pop-close"></div> <a id="pop-expand" class="pop-expand" href="" target="_blank"></a> <div id="pop-loader" class="pop-loader"></div> <div id="pop-content" class="pop-content"></div></div> </div> <div id="pop-masklayer" class="pop-masklayer"></div>');

				this.masklayer = $('#pop-masklayer');
				this.wrap = $('#pop-wrap');
				this.inner = $('#pop-inner');
				this.close = $('#pop-close');
				this.content = $('#pop-content');
				this.expand = document.getElementById('pop-expand');
				this.loader = document.getElementById('pop-loader');
				this.groupctrl = $('#pop-gctrl');
				this.gprev = $('#pop-prev');
				this.gnext = $('#pop-next');
				this.doc = $(document);
				this.win = $(window);
				this.isIE6 = !window.XMLHttpRequest;

				this.data = null;
				this.isVisible = false;
				this.scrollTimer = null;
				this.resizeTimer = null;
				this.group = {};

				this.defaultrh = PopConfig.height + PopConfig.pdtop + PopConfig.pdbottom;
				this.defaultmt = this.isIE6 ? (this.winh - this.defaultrh) / 2 + this.win.scrollTop() : -this.defaultrh / 2;
				this.defaultpos = 'fixed';

				this.inner.css({
					width: PopConfig.width,
					height: PopConfig.height,
					marginTop: this.defaultmt,
					padding: PopConfig.pdtop + 'px ' + PopConfig.pdright + 'px ' + PopConfig.pdbottom + 'px ' + PopConfig.pdleft + 'px'
				});

				this._attachClose();
				this._attachGroupCtrl();
			};

		PopBox.prototype = {
			_animatePop: function() {
				var that = this;
				this.loader.style.visibility = 'hidden';
				this.inner.css({
					width: this.actualw,
					height: this.actualh,
					marginTop: this.actualmt
				});
				this.content.css('visibility', 'visible');
				if (that.data.callback) {
					that.data.callback();
				}
			},
			_parseSrc: function() {
				var data = this.data;
				if (data.group) {
					this._purgeData();

					this.groupctrl.css('visibility', 'visible');

					if (!this.group.hasOwnProperty('src')) {
						this.group.src = data.group;
						this.group.len = data.group.length;
						this.group.type = data.gtype;
					}
					this.group.gidx = data.gidx;
					if (this.group.type == 'img') {
						data = {
							img: this.group.src[this.group.gidx],
							fit: true
						};
					} else {
						data = {
							iframe: this.group.src[this.group.gidx]
						}
					}
				}
				if (data.inline) {
					var inline = data.inline instanceof $ ? data.inline : $(data.inline);

					if (data.fit) {
						var $inline = inline.clone(true);

						$inline.css({
							position: 'absolute',
							visibility: 'hidden',
							zIndex: -1,
							left: -99999,
							top: 0
						})

						$('body').append($inline);
						this.actualw = $inline.outerWidth();
						this.actualh = $inline.outerHeight();
						this._setPopPos();
						$inline.remove();
					}

					this.inline = [inline.parent(), inline];
					this.content.append(inline);

					this._animatePop();
				} else if (data.iframe) {
					if (!this.iframe) {
						this.iframe = document.createElement('iframe');
						this.iframe.width = '100%';
						this.iframe.height = '100%';
						this.iframe.frameBorder = 0;
						this.iframe.allowTransparency = 'true';
					}
					if (data.fit) {
						var actualrw = this.actualw + PopConfig.pdright + PopConfig.pdleft,
							actualrh = this.actualh + PopConfig.pdtop + PopConfig.pdbottom;
						this._makePopFit(actualrw, actualrh);
						this._setPopPos();
					}

					this.iframe.name = PopConfig.ns + (new Date()).getTime();
					this.iframe.src = data.iframe;
					this.content.html(this.iframe);
					this._animatePop();
				} else if (data.img) {
					if (!data.img.match(/^(http|https|ftp|file):\/\//i)) {
						this.baseurl = this.baseurl || this._getBaseURL();
						data.img = this.baseurl + data.img;
					}
					this.img = new Image();
					var that = this;
					this.img.onload = function() {
						that.actualw = this.width;
						that.actualh = this.height;
						that.content.html(that.img);
						var actualrw = that.actualw + PopConfig.pdright + PopConfig.pdleft,
							actualrh = that.actualh + PopConfig.pdtop + PopConfig.pdbottom;
						if (data.fit) {
							that._makePopFit(actualrw, actualrh);
							if (that.actualrw != actualrw || that.actualrh != actualrh) {
								that.expand.href = data.img;
								that.expand.style.visibility = 'visible';
							}
						}
						that._setPopPos();
						that.img.width = that.actualw;
						that.img.height = that.actualh;
						that._animatePop();
						that.img.onload = null;
					};
					this.img.onerror = function() {
						data.inline = '<div class="pop-error">圖片加載失敗，請稍後重試</div>';
						data.fit = true;
						that._parseSrc();

					}
					this.img.src = data.img;
				}
			},
			_setPopPos: function() {
				this.actualrw = this.actualw + PopConfig.pdright + PopConfig.pdleft,
				this.actualrh = this.actualh + PopConfig.pdtop + PopConfig.pdbottom;
				if (this.data.pos == 'absolute') {
					this.actualmt = this.data.top;
				} else if (this.isIE6) {
					this.actualmt = (this.winh - this.actualrh) / 2 + this.win.scrollTop();
				} else {
					this.actualmt = -this.actualrh / 2;
				}
			},
			_makePopFit: function(orgw, orgh) {
				this.winw = this.win.width();
				this.winh = this.win.height();
				if (orgw <= this.winw && orgh <= this.winh) {

				} else {
					var fitflag = 1;
					while (fitflag) {
						if (orgw > this.winw) {
							orgh = (orgh / orgw) * (this.winw - PopConfig.fitoffset);
							orgw = (this.winw - PopConfig.fitoffset);
						} else if (orgh > this.winh) {
							orgw = (orgw / orgh) * (this.winh - PopConfig.fitoffset);
							orgh = this.winh - PopConfig.fitoffset;
						} else {
							fitflag = 0;
						};
					};
				}

				this.actualrw = orgw;
				this.actualrh = orgh;
				this.actualw = parseInt(this.actualrw - (PopConfig.pdright + PopConfig.pdleft));
				this.actualh = parseInt(this.actualrh - (PopConfig.pdtop + PopConfig.pdbottom));
			},
			showPop: function() {
				var data = this.data;

				if (!this.isVisible) {
					this.actualw = data.width || PopConfig.width;
					this.actualh = data.height || PopConfig.height;
					this.actualrh = data.height ? (data.height + PopConfig.pdtop + PopConfig.pdbottom) : this.defaultrh;

					this.inner.css('margin', data.left != undefined ? '0 0 0 ' + data.left : '0 auto');

					data.pos = data.pos || this.defaultpos;

					if (!this.isIE6) {
						if (data.pos == this.defaultpos) {
							var topobj = {};

							if (data.top == undefined) {
								this.actualmt = -this.actualrh / 2;
								topobj = {
									top: '50%',
									marginTop: this.actualmt
								}
							} else {
								this.actualmt = 0;
								topobj = {
									top: 0,
									marginTop: data.top
								}
							}
							this.inner.css(topobj);
						} else {
							this._enhanceResize(data.top);
						}
						this.wrap.css('position', data.pos);
					} else {
						this._enhanceResize(data.top);
						if (data.pos == this.defaultpos) {
							this._bindResizeScrollFn();
						}
					}
					var that = this;

					this.masklayer.fadeTo(400, 0.8, function() {
						that.wrap.show();
						that._parseSrc();
					});
					this.isVisible = true;
				} else {
					this.loader.style.visibility = 'visible';
					this.content.css('visibility', 'hidden');
					this.expand.style.visibility = 'hidden';
					this._parseSrc();
				}

			},
			_attachGroupCtrl: function() {
				var that = this;
				this.gprev.click(function() {
					var group = that.group;
					that.data.group = group;
					that.data.gidx = group.gidx > 0 ? group.gidx - 1 : group.len - 1;
					that.showPop();
					return false;
				})
				this.gnext.click(function() {
					var group = that.group;
					that.data.group = group;
					that.data.gidx = group.gidx < group.len - 1 ? group.gidx + 1 : 0;
					that.showPop();
					return false;
				})
			},
			_attachClose: function() {
				var that = this;
				this.close.click(function() {
					that.closePop();
				})
				this.wrap.click(function(e) {
					if (e.target === this) {
						that.closePop();
					}
				})
				this.masklayer.click(function(e) {
					if (e.target === this) {
						that.closePop();
					}
				})
				this.doc.on('keydown.' + PopConfig.ns, function(e) {
					if (PopConfig.esckey && e.keyCode == 27) {
						that.closePop();
					}
				})
			},
			_purgePop: function() {
				if (this.group.hasOwnProperty('src')) {
					this.group = {};
				}
				this.isVisible = false;

				if (this.isIE6) {
					this._unbindResizeScrollFn()
				}
				this.wrap.hide();
				this.groupctrl.css('visibility', 'hidden')
				this.loader.style.visibility = 'visible';
				this.expand.style.visibility = 'hidden';

				this.content.css('visibility', 'hidden');

				if (this.actualw != PopConfig.width) {
					this.inner.css('width', PopConfig.width);
				}

				if (this.actualh != PopConfig.height) {
					this.inner.css({
						'height': PopConfig.height,
						'marginTop': this.defaultmt
					});
				}

				if (!this.isIE6 && this.defaultpos != this.data.pos) {
					this.wrap.height('100%');
				}
				this.data = null;
				this.masklayer.fadeOut();
			},
			_purgeData: function() {
				if (this.img) {
					this.img.onload = null;
					this.img.onerror = null;
					this.img = null;
				} else if (this.iframe && this.iframe.src != '') {
					this.iframe.src = '';
				} else if (this.inline) {
					this.inline[0].append(this.inline[1]);
					this.inline = null;
				}
				this.content[0].innerHTML = '';
			},
			closePop: function() {
				if (this.isVisible && !this.masklayer.queue('fx').length) {
					this._purgeData();
					this._purgePop();
				}
			},
			_enhanceResize: function(mt) {
				var winh = this.win.height(),
					winst = this.win.scrollTop(),
					maxh = Math.max(winh, this.doc.height());
				if (this.isIE6 && winh != this.winh) {
					this.winh = winh;
					this.masklayer.height(maxh);
				}
				this.winh = winh;
				this.wrap.height(maxh);

				if (mt != undefined) {
					// this.actualmt = mt + winst;
					this.actualmt = mt;
				} else {
					this.actualmt = (winh - this.actualrh) / 2 + winst;
				}
				this.inner.css({
					marginTop: this.actualmt,
					top: 0
				});
			},
			_bindResizeScrollFn: function() {
				var that = this;
				this.win.on('resize.' + PopConfig.ns, function() {
					if (that.resizeTimer) {
						clearTimeout(that.resizeTimer);
						that.resizeTimer = null;
					}
					that.resizeTimer = setTimeout(function() {

						that._enhanceResize();
						that.resizeTimer = null;
					}, 200)
				}).on('scroll.' + PopConfig.ns, function() {
					if (that.scrollTimer) {
						clearTimeout(that.scrollTimer);
						that.scrollTimer = null;
					}
					that.scrollTimer = setTimeout(function() {
						that._enhanceResize();
						that.scrollTimer = null;
					}, 200)
				})
			},
			_unbindResizeScrollFn: function() {
				this.win.off('resize.' + PopConfig.ns).off('scroll.' + PopConfig.ns);
			},
			_getBaseURL: function() {
				var baseurl = location.href,
					lastindex = baseurl.lastIndexOf('/');
				return baseurl.substring(0, lastindex + 1);
			}
		};
		return {
			getPopBox: function() {
				if (!storedInstance) storedInstance = new PopBox();
				return storedInstance;
			},
			attachBox: function(data) {
				this.getPopBox().data = data;
				this.getPopBox().showPop();
			},
			setConfig: function(conf) {
				$.extend(PopConfig, conf);
			}
		}
	}();

	if (typeof define === "function" && define.amd) {
		define(function() {
			return PopMgr;
		});
	} else {
		window.PopMgr = PopMgr;
	}
})(jQuery, window, document);