$('[data-btn-name]').click(function() {
    var btn_value = $(this).attr('data-btn-name');
    //$('[data-name]').hide();
    $('.zoneMask').fadeIn(400).animate({ "margin-top": "0px" }, 400);
    $('[data-name="' + btn_value + '"]').show();
    $('.wrap-bg03').show();
});

$('.zoneBtn').click(function() {
    $('.zoneMask').animate({ "margin-top": "-1000px" }, 400).fadeOut(400);
    $('.zoneEvents__main').fadeOut(400);
    $('.wrap-bg03').fadeOut(400);
});

$('[data-btn-info]').click(function() {
    var btn_value1 = $(this).attr('data-btn-info');
    //$('[data-name]').hide();
    $('.zoneMask').fadeIn(400).css({ "margin-top": "0px" });
    $('[data-name="' + btn_value1 + '"]').show();
});


$('.btn_cancel').click(function() {
    $('.zoneMask').fadeOut(400).css({ "margin-top": "-1000px" });
    $('.zoneInfo__main').fadeOut(400);
});



$('#Ip_confirm').click(function() {
    $('.zoneMask').fadeOut(400).css({ "margin-top": "-1000px" });
    $('.zoneInfo__main').fadeOut(400);
    $('.spaceCapsule__outset').addClass("start");
    $('.rocket__pro').addClass("go");
    $('.rocket__basis').addClass("go");
    $('.rocket-main').removeClass("rocket-reset");
    $('.spaceStation__clock').fadeIn();

    counter.start();
    $("html, body").animate({ scrollTop: $('#Star01').offset().top - 200 }, 1000);
});


var _showTab = 0;
var $defaultLi = $('.zoneEvents__tabs li').eq(_showTab).addClass('select');
$('.zoneTc').eq($defaultLi.index()).siblings().hide();
$('.zoneEvents__tabs li').click(function() {
    var $this = $(this),
        _index = $this.index();


    $this.addClass('select').siblings('.select').removeClass('select');

    //找目前滑鼠指到的上一層區塊再往下找開區塊的 .zoneTc
    $this.closest(".zoneEvents__a01").find('.zoneTc').eq(_index).stop(false, true).fadeIn().siblings().hide();


    return false;
}).find('a').focus(function() {
    //this.blur();
});


var $defaultLi01 = $('.zoneEvents__tabs li').eq(_showTab).addClass('select');
$('.zoneCn').eq($defaultLi01.index()).siblings().hide();
$('.zoneEvents__tabs li').click(function() {
    var $this = $(this),
        _index = $this.index();


    $this.addClass('select').siblings('.select').removeClass('select');

    //找目前滑鼠指到的上一層區塊再往下找開區塊的 .zoneTc
    $this.closest(".zoneEvents__a04").find('.zoneCn').eq(_index).stop(false, true).fadeIn().siblings().hide();


    return false;
}).find('a').focus(function() {
    //this.blur();
});



$(window).scroll(function() {
    if ($(this).scrollTop() > 7000) {
        $('#menu-ss').removeClass("m01");
        $('.go .rocket-fire').removeClass("go");
        $('.rocket-shawdow').removeClass("zoomOut");
        $('.go .rocker').css({
            'margin-top': '-100px'
        });
    } else if ($(this).scrollTop() < 7900) {
        $('#menu-ss').addClass("m01");
        $('.go .rocket-fire').addClass("go");
        $('.rocket-shawdow').addClass("zoomOut");
         $('.go .rocker').css({
            'margin-top': '0px'
        });
    } if ($(this).scrollTop() < 500) {
        $('.rocket-main').addClass("zoomOut");
    } else if ($(this).scrollTop() > 700) {
        $('.rocket-main').removeClass("zoomOut");       
    }
});
