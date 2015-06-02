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


            var render_canvas = true;
            // var render_canvas = false;
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
