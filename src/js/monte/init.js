(function ($, window, document, undefined) {

    'use strict';


    window.monte = {


        tag: 'M O N T E',

        settings: {},

        modules: {},



        init: function() {

            console.log(this.tag);

            // initialize all modules
            for (var module in this.modules) {
                this.modules[module].init();
            }


            // add smooth scroll
            this.utils.smooth_scroll();


            // konami /* play sound effect */
            var easter_egg = new Konami(this.utils.konami);


            // 0. details
            var $window = $(window);
            console.log($window.height());
            $.each([$('.header'), $('#confirmation')], function (i, ele) {
                $(ele).css('min-height', $window.height());
            });


            // the custom shite
            // 1.
            // people have to click "RSVP" in order to see the page
            var $main = $('#main');
            // hide the page. they have to click RSVP to see the rest
            $main.css('position', 'fixed');

            $('#rsvp-btn').on('click', function () {
                $main.removeAttr('style');
            });

            // greensock ftw
            // ----------------------------------------
            var timeline = new TimelineMax,
                // mySplitText = new SplitText("#intro-text", {type:"words,chars"}),
                mySplitText = new SplitText("#intro-text"),
                chars = mySplitText.chars; //an array of all the divs that wrap each character

            TweenMax.set("#intro-text", {perspective:400});

            timeline.staggerFrom(chars, 0.8, {
                opacity:0,
                scale:0,
                y:80,
                rotationX:180,
                transformOrigin:"0% 50% -50",
                ease:Back.easeOut
            }, 0.1, "+=0");

            $('#intro-text').on('click', function () {
                timeline.restart();
            });

        },



        utils: {

            drupal_test: function () {
                var drupal_land = false;
                // recon to see if we're in Drupal-land
                if (typeof Drupal !== 'undefined') {
                    drupal_land = true;
                }

                return drupal_land;
            },

            smooth_scroll: function () {
                // smooth scroll - original source below
                // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
                $('a[href*=#]:not([href=#])').click(function() {
                    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: target.offset().top
                            }, 1000);

                            return false;
                        }
                    }
                });
            },

            konami: function () {

                // file urls
                var howlerjs_url = 'js/vendor/howler.min.js';
                var mp3s = [
                    'misc/internet.mp3',
                    'misc/mario.mp3',
                    'misc/seinfeld.mp3'
                ];
                // file paths are different for Drupal
                if (monte.settings.in_drupal_environment) {
                    for (var i = 0; i < mp3s.length; i++) {
                        mp3s[i] = monte.settings.drupal_theme_path + mp3s[i];
                    }
                    howlerjs_url = monte.settings.drupal_theme_path + howlerjs_url;
                }

                // load Howler
                if (window.Howl === undefined) {
                    $.ajax({
                        url: howlerjs_url,
                        dataType: 'script',
                        success: function () {
                            monte.sound = new Howl({
                                urls: [mp3s[Math.floor(Math.random() * 3)]]
                            }).play();
                        }
                    });

                } else {
                    // play new sound. stop other one
                    monte.sound.unload();
                    monte.sound = new Howl({
                        urls: [mp3s[Math.floor(Math.random() * 3)]]
                    }).play();

                }

            }
        }

    };



    // initialize the things
    $(document).ready(function () {
        $(document).foundation();
        monte.init();
    });

}($ || jQuery, window, window.document));
