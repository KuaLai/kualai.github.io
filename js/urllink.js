// // Simple log
// var log = function(msg) {

// };

// // Event handlers
// $.address.init(function(event) {
//     log('init: "' + event.value + '"');
//     $('a').address(function() {
//         return $(this).attr('href').replace(location.pathname, '');
//     });
// }).change(function(event) {
    

// });

var _showTab = 0;
var $defaultLi = $('nav li').eq(_showTab).addClass('select');
$('.wrap-page').eq($defaultLi.index()).siblings().hide();
$('nav li').click(function() {
    var $this = $(this),
        _index = $this.index();

    $this.addClass('select').siblings('.select').removeClass('select');
    $('.wrapper').find('.wrap-page').eq(_index).stop(false, true).fadeIn().siblings().hide();
    return false;
}).find('a').focus(function() {

 });
