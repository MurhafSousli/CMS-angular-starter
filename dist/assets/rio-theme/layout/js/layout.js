// FNC for detecting for click outside of any elements ============== 
$.fn.clickOff = function (callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;

    parent.click(function () {
        clicked = true;
    });

    $(document).click(function (event) {
        if (!clicked) {
            callback(parent, event);
        }
        if (destroy) {
        }
        ;
        clicked = false;
    });
};

/** 
 * PrimeNG Rio Layout
 */
var Rio = {
    init: function () {
        this.menuWrapper = $('#layout-menu-cover');
        this.menu = this.menuWrapper.find('ul.rio-menu');
        this.menulinks = this.menuWrapper.find('ul.layout-menu').find('a.menulink');
        this.topMenu = $('#top-menu');
        this.topMenuButton = $('#show-top-menu');
        this.mobileMenuButton = $('#mobile-menu-button');
        this.expandedMenuitems = this.expandedMenuitems || [];
        this.mobile = this.isMobile();

        this.bindEvents();
        
        this.initRipple();
    },
    bindEvents: function () {
        var $this = this;

        if (this.mobile) {
            this.menuWrapper.css('overflow-y', 'auto');
        }
        else {
            this.menuWrapper.perfectScrollbar({suppressScrollX: true});
        }

        this.menulinks.on('click', function (e) {
            var menuitemLink = $(this),
                    menuitem = menuitemLink.parent();

            if (menuitem.hasClass('active-menu-parent')) {
                menuitem.removeClass('active-menu-parent');
                menuitemLink.removeClass('active-menu active-menu-restore').next('ul').removeClass('active-menu active-menu-restore');
            }
            else {
                var activeSibling = menuitem.siblings('.active-menu-parent');
                if (activeSibling.length) {
                    activeSibling.removeClass('active-menu-parent');

                    activeSibling.find('ul.active-menu,a.active-menu').removeClass('active-menu active-menu-restore');
                    activeSibling.find('li.active-menu-parent').each(function () {
                        var menuitem = $(this);
                        menuitem.removeClass('active-menu-parent');
                    });
                }

                menuitem.addClass('active-menu-parent');
                menuitemLink.addClass('active-menu').next('ul').addClass('active-menu');
            }

            if (menuitemLink.next().is('ul')) {
                e.preventDefault();
            }

            if (!$this.mobile) {
                $this.menuWrapper.perfectScrollbar("update");
            }
        });

        this.mobileMenuButton.on('click', function () {
            if (parseInt($this.menuWrapper.css('marginLeft')) < 0) {
                $(this).addClass('MenuClose');
                $this.menuWrapper.addClass('showmenu');
                $this.topMenu.removeClass('showmenu');
                $this.topMenuButton.removeClass('showmenu');
            }
            else {
                $(this).removeClass('MenuClose');
                $this.menuWrapper.removeClass('showmenu');
            }
        });

        this.topMenuButton.on('click', function () {
            if ($this.topMenu.is(':hidden')) {
                $(this).addClass('MenuClose');
                $this.topMenu.addClass('showmenu');
                $this.mobileMenuButton.removeClass('MenuClose');
                $this.menuWrapper.removeClass('showmenu');
            }
            else {
                $(this).removeClass('MenuClose');
                $this.topMenu.removeClass('showmenu');
            }
        });

        this.topMenu.find('li a').on('click', function (e) {
            var link = $(this);
            link.parent().parent().find('li').each(function () {
                var item = $(this);
                item.find('.active-menu').removeClass('active-menu');
            });
            link.addClass('active-menu');
            link.next().addClass('active-menu');
        });
    },
    isMobile: function () {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent));
    },
    initRipple: function() {
        // escape from ripple effect for IE 9
        if($.browser.msie && parseInt($.browser.version, 10) === 9) {
            return;
        }
       
        var ink, d, x, y;
        $(".ripplelink").click(function(e){
            if($(this).find(".ink").length === 0){
                $(this).prepend("<span class='ink'></span>");
            }
                 
            ink = $(this).find(".ink");
            ink.removeClass("animate");
             
            if(!ink.height() && !ink.width()){
                d = Math.max($(this).outerWidth(), $(this).outerHeight());
                ink.css({height: d, width: d});
            }
             
            x = e.pageX - $(this).offset().left - ink.width()/2;
            y = e.pageY - $(this).offset().top - ink.height()/2;
             
            ink.css({top: y+'px', left: x+'px'}).addClass("animate");
        });
    }
};