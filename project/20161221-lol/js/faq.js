var faq = function() {
    var wrap = $('.J-faq');

    if (!wrap.length) {
        return;
    }

    var li = wrap.find('.J-faq-li'),
        answers = wrap.find('.J-faq-a'),
        select = wrap.find('.q-title'),
        selected = -1;

    function init() {
        li.each(function(index) {
            $(this).click(function() {
                if(selected != -1){
                    answers.eq(selected).hide();
                    select.eq(selected).removeClass('select');
                }

                if(selected != index){
                    answers.eq(index).show();
                    selected = index;
                    select.eq(selected).addClass('select');
                }else{
                    selected = -1;
                }
            });
        });
    }

    return {
        init: init
    };
}();

faq && faq.init();