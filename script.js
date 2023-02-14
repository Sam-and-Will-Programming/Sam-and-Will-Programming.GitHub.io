/*global $, console, alert*/
$(document).ready(function () {
    "use strict";
    // Set Background Equal Window Height
    $('.header').height($(window).height());
    $(window).resize(function () {
        $('.header').height($(window).height());
    });

    // Centering
    $('.header .info').css({
        paddingTop: ($(window).height() - $(' .header .info').height()) / 2
    });


    // Smooth Scroll
    $('nav ul li a').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('target')).offset().top
        }, 1000);
    });

    // Fixed
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 5) {
            $('header').addClass('fixed');
            $('h3').css('color', '#FFF');
        } else {
            $('header').removeClass('fixed');
            $('h3').css('color', '#58CA7E');
        }
    });

    // Wrap inner Fixed Class
    $('header').wrapInner('<div class="inner"></div>');

    // Smooth Scroll Top Gallery Section
    $('.a-gallery').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.gallery').offset().top
        }, 1500);
    });

    $('.a-blog').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.blog').offset().top
        }, 1500);
    });

    // Go To Top
    if ($(this).scrollTop() >= $('.about').offset().top) {
        $('.top').fadeIn();
    } else {
        $('.top').fadeOut();
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() >= $('.about').offset().top) {
            $('.top').fadeIn();
        } else {
            $('.top').fadeOut();
        }
    });
    $('.top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    // View More Gallery
    $('.gallery .ga-more').click(function (e) {
        e.preventDefault();
        $('.gallery .hidden').fadeIn(1000).removeClass('hidden');
        $(this).hide();
    });


    // My Own Slider
    $('.bxslider').bxSlider({
        auto: true
    });


    // Trigger Count To 
  $(window).scroll(function () {
    if (($(this).scrollTop() >= $('.count').offset().top) - 100) {
      $('.timer').countTo();
    }
  });
    
    


    // Accordion
    $('.faq .faq-box > button').click(function () {
        $(this).next().fadeToggle(500);
        $('.faq .faq-box > p').not($(this).next()).fadeOut(100);
    });


});
