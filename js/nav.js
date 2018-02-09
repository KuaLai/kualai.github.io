var nav = ".btn";
var m = ".menu";
var bk = ".close";
var sp = "#nav-container";
var go = "nav a";
$(sp).click(function () {
    $(nav).addClass("show");
    $(m).addClass("show");
    $(sp).addClass("n");
    $(bk).fadeIn(400);
});
$(bk).click(function () {
    $(nav).removeClass("show");
    $(m).removeClass("show");
    $(sp).removeClass("n");
    $(bk).fadeOut(400);
});
$(go).click(function () {
    $(nav).removeClass("show");
    $(m).removeClass("show");
    $(sp).removeClass("n");
    $(bk).fadeOut(400);
});

