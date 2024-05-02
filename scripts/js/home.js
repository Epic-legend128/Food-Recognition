$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
        $('header').addClass('visible').removeClass('hidden');
    } else {
        $('header').addClass('hidden').removeClass('visible');
    }
});