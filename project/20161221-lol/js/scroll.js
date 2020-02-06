var root = $('#event1');
$('#btn_top').click(function() {
    this.targetPos = this.targetPos || $('#Top').offset().top;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-02').click(function() {
    this.targetPos = this.targetPos || $('#Racecards').offset().top;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-03').click(function() {
    this.targetPos = this.targetPos || $('#Reward').offset().top - 60;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-04').click(function() {
    this.targetPos = this.targetPos || $('#Database').offset().top - 60;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-05').click(function() {
    this.targetPos = this.targetPos || $('#Apply').offset().top - 60;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-06').click(function() {
    this.targetPos = this.targetPos || $('#QA').offset().top;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$("#event1").scroll(function() {
    if ($(this).scrollTop() > 43) {
        $("nav").addClass("fixd");
    } else if ($(this).scrollTop() < 43) {
        $("nav").removeClass("fixd");
    }
});

$("#event1").on('resize', function(e) {
    //console.log(e);
    $("#event1").trigger('scroll');

});

$("#event1").trigger('scroll');

$(document).ready(function() {
    var position_btn_top = $('[data-scrollspy="btn_top"]').position();

    $('[data-scrollspy="btn_top"]').scrollspy({
        container:"#event1",
        min: position_btn_top.top - 50,
        max: position_btn_top.top + $('[data-scrollspy="btn_top"]').height() - 50,
        onEnter: function(element, position) {
            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.addClass(className);
            console.log("enter:" + className);
            console.log($btn);


        },
        onLeave: function(element, position) {

            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.removeClass(className);
            console.log("leave" + className);

        }
    });
    var position_btn_racecards = $('[data-scrollspy="li-02"]').position();

    $('[data-scrollspy="li-02"]').scrollspy({
        container:"#event1",
        min: position_btn_racecards.top - 50,
        max: position_btn_racecards.top + $('[data-scrollspy="li-02"]').height() - 50,
        onEnter: function(element, position) {
            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.addClass(className);
            console.log("enter:" + className);
            console.log($btn);


        },
        onLeave: function(element, position) {

            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.removeClass(className);
            console.log("leave" + className);

        }
    });
    var position_btn_reward = $('[data-scrollspy="li-03"]').position();

    $('[data-scrollspy="li-03"]').scrollspy({
        container:"#event1",
        min: position_btn_reward.top - 50,
        max: position_btn_reward.top + $('[data-scrollspy="li-03"]').height() - 50,
        onEnter: function(element, position) {
            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.addClass(className);
            console.log("enter:" + className);
            console.log($btn);


        },
        onLeave: function(element, position) {

            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.removeClass(className);
            console.log("leave" + className);

        }
    });
    var position_btn_database = $('[data-scrollspy="li-04"]').position();

    $('[data-scrollspy="li-04"]').scrollspy({
        container:"#event1",
        min: position_btn_database.top - 50,
        max: position_btn_database.top + $('[data-scrollspy="li-04"]').height() - 50,
        onEnter: function(element, position) {
            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.addClass(className);
            console.log("enter:" + className);
            console.log($btn);


        },
        onLeave: function(element, position) {

            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.removeClass(className);
            console.log("leave" + className);

        }
    });
    var position_btn_apply = $('[data-scrollspy="li-05"]').position();

    $('[data-scrollspy="li-05"]').scrollspy({
        container:"#event1",
        min: position_btn_apply.top - 50,
        max: position_btn_apply.top + $('[data-scrollspy="li-05"]').height() - 200,
        onEnter: function(element, position) {
            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.addClass(className);
            console.log("enter:" + className);
            console.log($btn);


        },
        onLeave: function(element, position) {

            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.removeClass(className);
            console.log("leave" + className);

        }
    });
    var position_btn_QA = $('[data-scrollspy="li-06"]').position();

    $('[data-scrollspy="li-06"]').scrollspy({
        container:"#event1",
        min: position_btn_QA.top - 200,
        max: position_btn_QA.top + $('[data-scrollspy="li-06"]').height() - 50,
        onEnter: function(element, position) {
            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.addClass(className);
            console.log("enter:" + className);
            console.log($btn);


        },
        onLeave: function(element, position) {

            var $btn = $("#" + $(element).attr('data-scrollspy'));
            var className = $(element).attr('data-btn-class');
            $btn.removeClass(className);
            console.log("leave" + className);

        }
    });

});
