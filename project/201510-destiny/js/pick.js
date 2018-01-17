$('.click').click(function() {
    $(this).find('.front').css("visibility", "hidden");
    $(this).addClass('flip');
    if ($("#count").html() > 0 && $(this).find('.front').css("visibility") != 'hidden') $("#count").html($("#count").html() - 1);
});
