(function ($, window, document, undefined) {
    'use strict';

    /**
     * Sample - a sample JS module file for our project
     */

    strath.animate = {

        intro_screen: function () {

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



        }

    };

}($ || jQuery, window, window.document));
