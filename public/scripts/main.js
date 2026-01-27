/*
    Forty by HTML5 UP (Refactored / Skel-free)
    html5up.net | @ajlkn
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $banner = $('#banner');

    /**
     * Applies parallax scrolling to an element's background image.
     */
    $.fn._parallax = function(intensity) {
        var $this = $(this);

        if (this.length == 0 || intensity === 0)
            return $this;

        if (this.length > 1) {
            for (var i=0; i < this.length; i++)
                $(this[i])._parallax(intensity);
            return $this;
        }

        if (!intensity) intensity = 0.25;

        $this.each(function() {
            var $t = $(this),
                on, off;

            on = function() {
                $t.css('background-position', 'center 100%, center 100%, center 0px');
                $window.on('scroll._parallax', function() {
                    var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);
                    $t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');
                });
            };

            off = function() {
                $t.css('background-position', '');
                $window.off('scroll._parallax');
            };

            // Replacement for skel.on('change') using native Media Query Listener
            var mql = window.matchMedia('(max-width: 980px)');
            var handleBreakpoint = function(e) {
                if (e.matches) off(); // Disable parallax on medium/small screens
                else on();
            };

            mql.addEventListener('change', handleBreakpoint);
            handleBreakpoint(mql); // Initial check
        });

        $window.on('load._parallax resize._parallax', function() {
            $window.trigger('scroll');
        });

        return $(this);
    };

    $(function() {

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        window.setTimeout(function() {
            $body.removeClass('is-loading');
        }, 200);

        // Clear transitioning state on unload/hide.
        $window.on('unload pagehide', function() {
            window.setTimeout(function() {
                $('.is-transitioning').removeClass('is-transitioning');
            }, 250);
        });

        // Scrolly (Smooth Scroll).
        if ($.fn.scrolly) {
            $('.scrolly').scrolly({
                offset: function() {
                    return $header.height() - 2;
                }
            });
        }

        // Tiles.
        var $tiles = $('.tiles > article');

        $tiles.each(function() {
            var $this = $(this),
                $image = $this.find('.image'), 
                $img = $image.find('img'),
                $link = $this.find('.link'),
                x;

            // Set background image from the <img> tag
            $this.css('background-image', 'url(' + $img.attr('src') + ')');

            // Set background position if data-position exists
            if (x = $img.data('position'))
                $this.css('background-position', x);

            // Hide original image element
            $image.hide();

            // Link logic
            if ($link.length > 0) {
                var $primaryLink = $link.clone()
                    .text('')
                    .addClass('primary')
                    .appendTo($this);
                
                $primaryLink.attr('aria-label', $link.text());

                $link = $link.add($primaryLink);

                $link.on('click', function(event) {
                    var href = $(this).attr('href');

                    event.stopPropagation();
                    event.preventDefault();

                    $this.addClass('is-transitioning');
                    $wrapper.addClass('is-transitioning');

                    window.setTimeout(function() {
                        if ($(this).attr('target') == '_blank')
                            window.open(href);
                        else
                            location.href = href;
                    }, 500);
                });
            }
        });

        // Header Alt/Reveal logic (requires Scrollex)
        if ($banner.length > 0 && $header.hasClass('alt') && $.fn.scrollex) {
            $window.on('resize', function() {
                $window.trigger('scroll');
            });

            $window.on('load', function() {
                $banner.scrollex({
                    bottom: $header.height() + 10,
                    terminate: function() { $header.removeClass('alt'); },
                    enter: function() { $header.addClass('alt'); },
                    leave: function() { $header.removeClass('alt'); $header.addClass('reveal'); }
                });

                window.setTimeout(function() {
                    $window.triggerHandler('scroll');
                }, 100);
            });
        }

        // Banner Parallax.
        $banner.each(function() {
            var $this = $(this),
                $image = $this.find('.image'), 
                $img = $image.find('img');

            $this._parallax(0.275);

            if ($image.length > 0) {
                $this.css('background-image', 'url(' + $img.attr('src') + ')');
                $image.hide();
            }
        });

        // Menu.
        var $menu = $('#menu'),
            $menuInner;

        $menu.wrapInner('<div class="inner"></div>');
        $menuInner = $menu.children('.inner');
        $menu._locked = false;

        $menu._lock = function() {
            if ($menu._locked) return false;
            $menu._locked = true;
            window.setTimeout(function() { $menu._locked = false; }, 350);
            return true;
        };

        $menu._show = function() { if ($menu._lock()) $body.addClass('is-menu-visible'); };
        $menu._hide = function() { if ($menu._lock()) $body.removeClass('is-menu-visible'); };
        $menu._toggle = function() { if ($menu._lock()) $body.toggleClass('is-menu-visible'); };

        $menuInner
            .on('click', function(event) { event.stopPropagation(); })
            .on('click', 'a', function(event) {
                var href = $(this).attr('href');
                event.preventDefault();
                event.stopPropagation();
                $menu._hide();
                window.setTimeout(function() { window.location.href = href; }, 250);
            });

        $menu
            .appendTo($body)
            .on('click', function(event) {
                event.stopPropagation();
                event.preventDefault();
                $body.removeClass('is-menu-visible');
            })
            .append('<a class="close" href="#menu">Close</a>');

        $body
            .on('click', 'a[href="#menu"]', function(event) {
                event.stopPropagation();
                event.preventDefault();
                $menu._toggle();
            })
            .on('keydown', function(event) {
                if (event.keyCode == 27) $menu._hide();
            });

    });

})(jQuery);