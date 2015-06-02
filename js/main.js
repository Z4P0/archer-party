/*!
 * monte v0.0.8 (http://www.luisrosar.io/lab/monte)
 * Copyright 2014-2015 luis rosario {zapo}
 * Licensed under MIT (https://github.com/aztec8/monte/blob/master/LICENSE)
 */

(function ($, window, document, undefined) {

    'use strict';


    window.monte = {


        tag: 'M O N T E',

        settings: {},

        modules: {},

        responses: {
            'umbrella': [
                "Cherrio, __name__, see you at..."
            ],
            'millenium_falcon': [
                "That's no moon __name__, it's ...",
                "Help us __name__, you're our only hope. Join the Rebel Alliance at..."
            ],
            'elevator': [
                "Hang on __name__, we're going up! See you at ...",
                "Hold on tight __name__, we're going up! See you at ..."
            ]
        },

        center_content: function (query_string) {
            var $ele = $(query_string);
            var difference = ($(window).height() - $ele.height()) / 2;
            $ele.css({
                'padding-top': difference+'px',
                'padding-bottom': difference+'px'
            });

        },

        choose_ride: function (reveal_modal_id, data_reveal_id, anchor_tag) {

            monte.settings.ride = $(anchor_tag).data('ride');
            $(reveal_modal_id).foundation('reveal', 'close');

            // change classes
            var $old_choice = $('.ride-choice');
            if ($old_choice.length) {
                $old_choice.removeClass('ride-choice');
            }
            $(data_reveal_id).parent().addClass('ride-choice')

            console.log(
                monte.settings
            );

            monte.confirmation_page();
        },


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


            // do some animation setup
            TweenMax.to('#choose-your-ride', 0.2, {
                height: 0
            });

            TweenMax.to('#confirmation', 0.2, {
                height: 0
            });



            // setup event listeners for chooing a ride
            $('#choose-mary-poppins').on('click', function () {
                monte.choose_ride('#mary-poppins-modal', '[data-reveal-id="mary-poppins-modal"]', '#choose-mary-poppins');
            });
            $('#choose-millenium-falcon').on('click', function () {
                monte.choose_ride('#millenium-falcon-modal', '[data-reveal-id="millenium-falcon-modal"]', '#choose-millenium-falcon');
            });
            $('#choose-elevator').on('click', function () {
                monte.choose_ride('#elevator-modal', '[data-reveal-id="elevator-modal"]', '#choose-elevator');
            });




            /*
                READY?
                FIGHT!

                intro rsvp-form, choose your ride, confirmation
            */
            this.intro_page();


        },



        // 1 - the intro
        intro_page: function () {


            // greensock ftw
            // ----------------------------------------
            var timeline = new TimelineMax,
                // mySplitText = new SplitText("#intro-text", {type:"words,chars"}),
                mySplitText = new SplitText("#intro-text"),
                chars = mySplitText.chars; //an array of all the divs that wrap each character


            // the intro text
            TweenMax.set("#intro-text", {
                perspective:400
            });

            timeline
                .from('#space-video', 2.5, {
                    opacity: 0,
                    delay: 0.25
                })
                .staggerFrom(chars, 0.8, {
                    opacity:0,
                    scale:0,
                    y:80,
                    rotationX:180,
                    transformOrigin:"0% 50% -50",
                    ease: Back.easeOut,
                    delay: '-=1'
                }, 0.1, "+=0")
                .from('#intro-text', 1, {
                    y: '85%'
                })
                .staggerFrom('.intro-text', 2, {
                    scale: 0.75,
                    opacity: 0,
                    ease: Elastic.easeOut
                }, 0.2);


            $('#intro-text').on('click', function () {
                timeline.restart();
            });




            // the custom shite
            // 1.
            // people have to click "RSVP" in order to see the page
            var $main = $('#main');
            // hide the page. they have to click RSVP to see the rest
            $main.css('position', 'fixed');

            $('#rsvp-btn').on('click', function () {
                $main.removeAttr('style');
                monte.rsvp_form();
            });

        },


        // 2 - the rsvp form
        rsvp_form: function () {

            this.center_content('#rsvp-form');

            $('#name').focus();
            $('#name').on('change', function () {
                monte.settings.name = $(this).val().split(' ')[0];
            });

            $('#company').on('change', function () {
                monte.settings.company = $(this).val();
            });

            $('#email').on('change', function () {
                monte.settings.email = $(this).val();
            });


            $('#choose-your-ride-btn').on('click', function () {
                if (monte.settings.name === '' || monte.settings.name === 'undefined' || monte.settings.name === undefined) {
                    alert('Please add your name');
                } else {
                    monte.choose_your_ride();
                }
            });
        },


        choose_your_ride: function () {

            TweenMax.to('#choose-your-ride', 0.2, {
                height: $('.how-will-you-get-there').height() + $('.choose-your-ride').height()
            });

        },



        confirmation_page: function () {

            // get the random bit of text based on the ride they chose
            var selected_ride_responses = this.responses[this.settings.ride];
            $('#thank-you-text').html(selected_ride_responses[Math.floor(Math.random() * selected_ride_responses.length)].replace('__name__', monte.settings.name));


            TweenMax.to('#confirmation', 0.2, {
                height: $(window).height()
            });

            TweenMax.to(window, 3, {
                scrollTo:{
                    y:$('#confirmation').offset().top
                },
                ease:Power2.easeOut,
                delay: 0.5
            });




            // var render_canvas = true;
            var render_canvas = false;
            function animate(){

                // render the stage
                renderer.render(stage);

                requestAnimationFrame(animate);
            }

            if (render_canvas) {

                var renderer = PIXI.autoDetectRenderer(800, 600, {
                    transparent: true,
                    view: document.querySelector('#space-canvas')
                });

                // document.body.appendChild(renderer.view);

                // create the root of the scene graph
                var stage = new PIXI.Container();

                // // create a video texture from a path
                // var texture = PIXI.Texture.fromVideo('misc/space-loop.mp4');
                // on mobile show an image / prevent massive file download
                // on tablet < show video
                var texture;
                if (Foundation.utils.is_small_only()) {
                    texture = PIXI.Texture.fromImage('images/freedom.jpg');
                } else {
                    texture = PIXI.Texture.fromVideo('misc/space-loop.mp4');
                }

                // create a new Sprite using the video texture (yes it's that easy)
                var videoSprite = new PIXI.Sprite(texture);

                videoSprite.width = renderer.width;
                videoSprite.height = renderer.height;

                stage.addChild(videoSprite);

                animate();

            }


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
                                urls: [mp3s[Math.floor(Math.random() * mp3s.length)]]
                            }).play();
                        }
                    });

                } else {
                    // play new sound. stop other one
                    monte.sound.unload();
                    monte.sound = new Howl({
                        urls: [mp3s[Math.floor(Math.random() * mp3s.length)]]
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

//# sourceMappingURL=main.js.map