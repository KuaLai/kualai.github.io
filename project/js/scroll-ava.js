var root = $('#event2');
$('#btn_top_a').click(function() {
    this.targetPos = this.targetPos || $('#page_top').offset().top;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-02-a').click(function() {
    this.targetPos = this.targetPos || $('#page_Racecards').offset().top;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-03-a').click(function() {
    this.targetPos = this.targetPos || $('#page_Reward').offset().top - 60;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-04-a').click(function() {
    this.targetPos = this.targetPos || $('#page_Database').offset().top - 60;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-05-a').click(function() {
    this.targetPos = this.targetPos || $('#page_Apply').offset().top - 60;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});

$('#li-06-a').click(function() {
    this.targetPos = this.targetPos || $('#page_QA').offset().top;
    root.stop(true, false).animate({
        'scrollTop': this.targetPos
    }, 500);
    return false;
});


$("#event2").scroll(function() {
    if ($(this).scrollTop() > 43) {
        $("nav").addClass("fixd");
    } else if ($(this).scrollTop() < 43) {
        $("nav").removeClass("fixd");
    }
});

$("#event2").on('resize', function(e) {
    //console.log(e);
    $("#event2").trigger('scroll');

});

$("#event2").trigger('scroll');

$(document).ready(function() {

    var position_btn_top_a = $('[data-scrollspy="btn_top_a"]').position();

    $('[data-scrollspy="btn_top_a"]').scrollspy({
        container:"#event2",
        min: position_btn_top_a.top - 50,
        max: position_btn_top_a.top + $('[data-scrollspy="btn_top_a"]').height() - 50,
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
    var position_btn_racecards_a = $('[data-scrollspy="li-02-a"]').position();

    $('[data-scrollspy="li-02-a"]').scrollspy({
        container:"#event2",
        min: position_btn_racecards_a.top - 50,
        max: position_btn_racecards_a.top + $('[data-scrollspy="li-02-a"]').height() - 50,
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
    var position_btn_reward_a = $('[data-scrollspy="li-03-a"]').position();

    $('[data-scrollspy="li-03-a"]').scrollspy({
        container:"#event2",
        min: position_btn_reward_a.top - 50,
        max: position_btn_reward_a.top + $('[data-scrollspy="li-03-a"]').height() - 50,
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
    var position_btn_database_a = $('[data-scrollspy="li-04-a"]').position();

    $('[data-scrollspy="li-04-a"]').scrollspy({
        container:"#event2",
        min: position_btn_database_a.top - 50,
        max: position_btn_database_a.top + $('[data-scrollspy="li-04-a"]').height() - 50,
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
    var position_btn_apply_a = $('[data-scrollspy="li-05-a"]').position();

    $('[data-scrollspy="li-05-a"]').scrollspy({
        container:"#event2",
        min: position_btn_apply_a.top - 50,
        max: position_btn_apply_a.top + $('[data-scrollspy="li-05-a"]').height() - 200,
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
    var position_btn_QA_a = $('[data-scrollspy="li-06-a"]').position();

    $('[data-scrollspy="li-06-a"]').scrollspy({
        container:"#event2",
        min: position_btn_QA_a.top - 200,
        max: position_btn_QA_a.top + $('[data-scrollspy="li-06-a"]').height() - 50,
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