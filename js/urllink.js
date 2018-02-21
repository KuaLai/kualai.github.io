
var _showTab = 0;
var $defaultLi = $("nav li").eq(_showTab).addClass("select");
var hash = window.location.hash; 
var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');   
var a = $(".wrap-bg01");
var w = $(".wrap-bg02");
var d = $(".wrap-bg03");

$(".wrap-page").eq($defaultLi.index()).siblings().hide();
$("nav li").click(function() {
    var $this = $(this),
      _index = $this.index();
    var btn_value = $(this).attr('data-url');
    $this.addClass("select").siblings(".select").removeClass("select");
    $(".wrapper").find(".wrap-page").eq(_index).stop(false, true).fadeIn().siblings().hide();
    location.hash = btn_value;
    return false;
    
  }).find("a").focus(function() {});

// $('[data-url]').click(function() {
//     var btn_value = $(this).attr('data-url');
//     $('[data-id]').hide();
//     $('[data-id="' + btn_value + '"]').fadeIn(400);
// });

function scrollHd($a){
    $body.animate({
        scrollTop: $a
    }, 600);
}

function locaurl(){
    if(hash == "#about"){
        d.hide();
        w.hide();
        a.fadeIn();
        scrollHd(280);
        $("nav li").removeClass("select");
        $("nav li:nth-child(1)").addClass("select");
    }
    else if(hash == "#webs"){
        d.hide();
        a.hide();
        w.fadeIn();
        scrollHd(380);
        $("nav li").removeClass("select");
        $("nav li:nth-child(2)").addClass("select");
    }
    else if(hash == "#design"){
        a.hide();
        w.hide();
        d.fadeIn();
        scrollHd(380);
        $("nav li").removeClass("select");
        $("nav li:nth-child(3)").addClass("select");
    }
}

window.addEventListener('hashchange',function(event){
    if(location.hash == "#about"){
        d.hide();
        w.hide();
        a.fadeIn();
        scrollHd(280);
    }
    else if(location.hash == "#webs"){
        d.hide();
        a.hide();
        w.fadeIn();
        scrollHd(380);
    }
    else if(location.hash == "#design"){
        a.hide();
        w.hide();
        d.fadeIn();
        scrollHd(380);
    }
})

locaurl();