
(function ($) {

    "use strict";

    var $WIN = $(window);

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function () {

        $WIN.on('load', function () {

            // force page scroll position to top at page refresh
            $('html, body').animate({scrollTop: 0}, 'normal');

            // will fade out the whole preloader DIV that covers the website.
            $("#preloader").delay(50).fadeOut('slow');

        });
    };


    /* Mobile Menu
     * ---------------------------------------------------- */
    var ssMobileMenu = function () {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('#header-nav-wrap');

        toggleButton.on('click', function (event) {
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $(window).resize(function () {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        $('#header-nav-wrap').find('a').on("click", function () {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle();
            }
        });

    };

    /* Initialize
      * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();

    })();

})(jQuery);