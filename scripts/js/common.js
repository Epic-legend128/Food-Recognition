const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

$(document).ready(function() {
    setTimeout(function() {
      $('.video-title').fadeOut();
    }, 5000);
});

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
        $('header').addClass('visible').removeClass('hidden');
    } else {
        $('header').addClass('hidden').removeClass('visible');
    }
});