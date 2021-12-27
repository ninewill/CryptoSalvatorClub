$(function () {
    const $window = $(window);
    const $html = $('html');
    const $menu = $('#menu');
    const $content = $('#content');
    const languageType = $html.attr('lang');

    let screenWidth = $window.outerWidth();
    let screenHeight = $window.outerHeight();
    let scrollTop = $window.scrollTop();

    /*
     * ==========================================================================
     * 把語言選擇連結複製到 MENU 選單
     * ==========================================================================
     */

    function cloneOtherLink() {
        let $container = $menu.children('ul');

        // 複製語言選擇連結
        let $language = $('.language-btn');

        $language.each(function () {
            let dom = $(this).clone();
            $container.append(dom);
        });

        $container.find('.language-btn').wrap('<li class="bring-item"></li>');
    }

    cloneOtherLink();

    /*
     * ==========================================================================
     * 手機版 MENU 選單開啟/收合
     * ==========================================================================
     */

    const $menuSwotchBtn = $('.menu-mobile-btn');

    function ctrlMenu(width) {
        if (width <= 1024) {
            if ($menuSwotchBtn.hasClass('is-open')) {
                $menu.stop(true, true).slideDown();
            } else {
                $menu.stop(true, true).slideUp();
            }
        } else {
            $menu.attr('style', '');
        }
    }

    $menuSwotchBtn.on('click', function () {
        $(this).toggleClass('is-open');
        ctrlMenu(screenWidth);
    });

    ctrlMenu(screenWidth);

    /*
     * ==========================================================================
     * MENU 區塊的滾動定位
     * ==========================================================================
     */

    function fixedHeader(width, value) {
        let fixedValue = screenHeight - $menu.innerHeight();

        if (width > 1024) {
            if (value > fixedValue) {
                if ($menu.hasClass('is-fixed') === false) {
                    $menu.addClass('is-fixed');
                }
            } else {
                if ($menu.hasClass('is-fixed')) {
                    $menu.removeClass('is-fixed');
                }
            }
        } else {
            $menu.removeClass('is-fixed');
        }
    }

    /*
     * ==========================================================================
     * 單頁式網站的按鈕連結功能
     * ==========================================================================
     */

    let $anchorBtn = $('.anchor-btn');

    function setAnchorBtn() {
        if ($anchorBtn.length) {
            $anchorBtn.on('click', function () {
                let $this = $(this);
                let targetName = $this.attr('href');
                let $target = $(targetName.slice(targetName.indexOf('#')));
                let padding = 0;

                if (screenWidth > 1024) {
                    padding = $menu.innerHeight();
                } else {
                    padding = 50;
                    $menuSwotchBtn.removeClass('is-open');
                    ctrlMenu(screenWidth);
                }

                let scrollValue = $target.offset().top - padding;

                $('html, body').animate({
                    scrollTop: scrollValue
                }, 800, function () {
                    $target.trigger('focus');
                });

                return false;
            });
        }
    }

    setAnchorBtn();

    /*
     * ==========================================================================
     * 單頁式網站的滾動選單切換 current 功能
     * ==========================================================================
     */

    const openAnchorScroll = $menu.hasClass('anchor-scroll');

    function setAnchorScroll(scrollTop) {
        if (openAnchorScroll) {
            $('.section').each(function () {
                let $this = $(this);

                if (scrollTop >= $this.offset().top - $menu.innerHeight()) {
                    let id = $this.attr('id');
                    $('.anchor-btn').removeClass('current');
                    $(`.anchor-btn[href="#${id}"]`).addClass('current');
                }

                if (scrollTop >= $(document).innerHeight() - $window.innerHeight()) {
                    $('.anchor-btn').removeClass('current');
                    $('.anchor-btn').last().addClass('current');
                }
            });
        }
    }

    setAnchorScroll(scrollTop);

    /*
     * ==========================================================================
     * 分享按鈕
     * ==========================================================================
     */

    const $share = $('.share');
    const $shareBtn = $share.find('.share-btn');

    function ctrlShareList() {
        let $shareList = $share.find('.share-list');
        if ($shareBtn.hasClass('is-open') === true) {
            $shareList.stop(true, true).fadeIn();
        } else {
            $shareList.stop(true, true).fadeOut();
        }
    }

    $share.on('mouseenter', function () {
        $shareBtn.addClass('is-open');
        ctrlShareList();
    }).on('mouseleave', function () {
        $shareBtn.removeClass('is-open');
        ctrlShareList();
    });

    $shareBtn.on('focus', function () {
        $shareBtn.addClass('is-open');
        ctrlShareList();
    });

    $('.share-list > li a').last().on('blur', function () {
        $shareBtn.removeClass('is-open');
        ctrlShareList();
    });

    ctrlShareList();

    /*
     * ==========================================================================
     * TOP 按鈕
     * ==========================================================================
     */

    const $floatBtn = $('.floatbtn');
    const $topBtn = $floatBtn.find('.top-btn');

    $topBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800, function () {
            // $('#u').trigger('focus');
            $('.firstGoTo-btn').trigger('focus');
        });
        return false;
    });

    function topButtonShower(value) {
        if (!$floatBtn.is(':animated')) {
            if (value > 1) {
                $floatBtn.stop(true, true).fadeIn();
            } else {
                $floatBtn.stop(true, true).fadeOut();
            }
        }
    }

    topButtonShower(scrollTop);

    /*
     * ==========================================================================
     * 內頁的字級縮放
     * ==========================================================================
     */

    let fontsize = {
        plusBtn: $('.fontsize-btn-plus'),
        decBtn: $('.fontsize-btn-dec'),
        value: 2,
        size: ['1.125', '1.2', '1.25', '1.3', '1.35', '1.4']
    };

    function ctrlFontsize(width) {
        if (fontsize.value <= 0) {
            fontsize.value = 0;
        }

        if (fontsize.value > fontsize.size.length - 1) {
            fontsize.value = fontsize.size.length - 1;
        }

        if (width > 1024) {
            $content.css({
                fontSize: `${fontsize.size[fontsize.value]}rem`
            });
        } else {
            $content.attr('style', '');
            fontsize.value = 2;
        }
    }

    fontsize.plusBtn.on('click', function () {
        fontsize.value = fontsize.value + 1;
        ctrlFontsize(screenWidth);
    });

    fontsize.decBtn.on('click', function () {
        fontsize.value = fontsize.value - 1;
        ctrlFontsize(screenWidth);
    });

    ctrlFontsize(screenWidth);

    /*
     * ==========================================================================
     * 相簿（鍵盤操作相簿說明）
     * ==========================================================================
     */

    function ctrlAlbumInstruction(btn) {
        if (btn.hasClass('is-open')) {
            btn.next('.instruction-menu').stop(true, true).slideDown();
        } else {
            btn.next('.instruction-menu').stop(true, true).slideUp();
        }
    }

    $('.instruction-keypress .instruction-btn').on('click', function () {
        let $this = $(this);
        $this.toggleClass('is-open');
        ctrlAlbumInstruction($this);
    });

    /*
     * ==========================================================================
     * 相簿（Light Gallery）
     * ==========================================================================
     */

    let $albumList = $('.album-list');

    $albumList.each(function (index) {
        $(this).attr('data-index', index);
    });

    function checkAlbumHash() {
        let hash = window.location.hash.substr(1);
        if (hash.indexOf('lg') > -1) {
            let andIndex = hash.indexOf('&');
            let str = hash.substring(0, andIndex);
            let val = str.substring(str.indexOf('lg') + 3, andIndex);

            $(`.album-list[data-index="${val}"]`).find('.lazyload').each(function () {
                let $image = $(this);
                let src = $image.data('src');
                $image.attr('src', src);
            });
        }
    }

    function setAlbum() {
        if ($albumList.children('li').length) {
            $albumList.each(function () {
                let $album = $(this);
                let index = $album.data('index');

                $album.find('.album-item').attr('tabindex', '-1');

                $album.lightGallery({
                    download: false,
                    actualSize: false,
                    fullScreen: false,
                    galleryId: index
                });

                $album.on('onBeforeOpen.lg', function (e) {
                    $(this).find('.lazyload').each(function () {
                        let $image = $(this);
                        let src = $image.data('src');
                        $image.attr('src', src);
                    });
                });

                $album.on('onAfterOpen.lg', function (e) {
                    let language = {
                        zoomIn: '放大',
                        zoomOut: '縮小',
                        close: '關閉（ESC）',
                        prev: '上一張',
                        next: '下一張'
                    }

                    if (languageType === 'en') {
                        language.zoomIn = 'Zoom In';
                        language.zoomOut = 'Zoom Out';
                        language.close = 'Close (ESC)';
                        language.prev = 'Previous';
                        language.next = 'Next';
                    }

                    if (languageType === 'ja') {
                        language.zoomIn = 'ズームイン';
                        language.zoomOut = 'ズームアウトする';
                        language.close = '閉じる（ESC）';
                        language.prev = '前のページ';
                        language.next = '次のページ';
                    }

                    $('#lg-zoom-in').attr('title', language.zoomIn);
                    $('#lg-zoom-out').attr('title', language.zoomOut);
                    $('.lg-close').attr('title', language.close);
                    $('.lg-next').attr('title', language.next);
                    $('.lg-prev').attr('title', language.prev);
                });
            });
        }
    }

    checkAlbumHash();
    setAlbum();

    $('.exhibit-image').each(function () {
        let $this = $(this);
        if ($this.children('.album-list').length) {
            $this.addClass('has-icon');
            $this.children('.album-preview').attr('tabindex', '0');
        }
    });

    $('.album-preview').on('click', function () {
        let $this = $(this);
        let $album = $this.siblings('.album-list');
        let index = $album.children('li').length;
        $album.children('li').eq(index - 1).trigger('click');
    });

    /*
     * ==========================================================================
     * 表格（Footable）
     * ==========================================================================
     */

    function setFootable() {
        let $footable = $('.footable');
        if ($footable.length) {
            $footable.footable({
                calculateWidthOverride: function () {
                    return {
                        width: $window.width()
                    };
                }
            });
        }
    }

    setFootable();

    /*
     * ==========================================================================
     * 表格（Swipetable，手機版有左右滾動條的那種）
     * ==========================================================================
     */

    const $swipeTable = $('.swipeTable');

    function ctrlSwipeTableNotice(width) {
        if ($swipeTable && width <= 1024) {
            $swipeTable.each(function() {
                let $table = $(this);
                let $innerWrap = $table.parent('.swipeTable__innerwrap');
                let $notice = $innerWrap.siblings('.swipeTable__notice');

                if ($table.width() > $innerWrap.width()) {
                    $notice.addClass('is-open');
                } else {
                    $notice.removeClass('is-open');
                }
            });
        }
    }

    function setSwipeTable() {
        $swipeTable.each(function() {
            let $table = $(this);
            let notice = $table.data('notice');
            $table.wrap(`<div class="swipeTable__outerwrap"><div class="swipeTable__innerwrap"></div></div>`);
            $table.parent('.swipeTable__innerwrap').before(`<p class="swipeTable__notice">${notice}</p>`);
        });
    }

    setSwipeTable();

    /*
     * ==========================================================================
     * 輪播
     * ==========================================================================
     */

    let carousel = {
        className: '.carousel',
        collection: []
    };

    const $carousel = $(carousel.className);

    function setCarousel() {
        $carousel.each(function (index) {
            let $this = $(this);
            let nameArray = [];

            $this.addClass(`carousel-${index + 1}`);

            function setBulletTitle(swiperIndex) {
                $(`.carousel-${swiperIndex}`).find('.swiper-pagination-bullet').each(function () {
                    let $this = $(this);
                    let bulletIndex = $this.index();
                    let titleText = `移動至 ${nameArray[bulletIndex]}`;

                    if (languageType === 'en') {
                        titleText = `Go To "${nameArray[bulletIndex]}"`;
                    }

                    if (languageType === 'ja') {
                        titleText = `${nameArray[bulletIndex]} に移動`;
                    }

                    $this.attr({
                        'aria-label': titleText,
                        'title': titleText
                    });
                });
            }

            let swiper = new Swiper(`.carousel-${index + 1}`, {
                slidesPerView: 1,
                spaceBetween: 30,
                autoHeight: true,
                loop: false,
                navigation: {
                    nextEl: '.carousel-btn-next',
                    prevEl: '.carousel-btn-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                keyboard: {
                    enabled: true,
                },
                on: {
                    init: function () {
                        $(`.carousel-${index + 1} .swiper-slide`).each(function () {
                            nameArray.push($(this).find('.exhibit-title').text());
                        });
                    },
                    slideChangeTransitionEnd: function () {
                        $(`.carousel-${index + 1}`).find('.swiper-slide a').attr('tabindex', '-1');
                        $(`.carousel-${index + 1}`).find('.swiper-slide-active a, .swiper-slide-next a').attr('tabindex', '');
                    },
                    slideChange: function () {
                        setBulletTitle(index + 1);
                    }
                }
            });

            setBulletTitle(index + 1);

            carousel.collection.push(swiper);
        });
    }

    function ctrlCarousel(width) {
        if ($carousel.length) {
            if (width > 1024) {
                if ($carousel.hasClass('swiper-container-initialized') === false) {
                    setCarousel();
                }
            } else {
                if ($carousel.hasClass('swiper-container-initialized')) {
                    if (carousel.collection.length) {
                        carousel.collection.forEach(function (element, index) {
                            $(`${carousel.className}-${index + 1}`).removeClass(`${carousel.className}-${index + 1}`);
                            element.destroy();
                        });
                        carousel.collection.length = 0;
                    }
                }
            }
        }
    }

    ctrlCarousel(screenWidth);

    /*
     * ==========================================================================
     * 無障礙跳過此子選單列按鈕
     * ==========================================================================
     */

    $('.skiptoolbar').on('click', function () {
        let $anchor = $('#content-anchor');
        let value = $anchor.offset().top - $menu.innerHeight();

        $('html, body').animate({
            scrollTop: value
        }, 800, function () {
            $anchor.trigger('focus');
        });
    });

    /*
     * ==========================================================================
     * 分離 click 事件和 focus 事件
     * ==========================================================================
     */

    $('a, button').on('mousedown', function (e) {
        e.preventDefault();
    });

    /*
     * ==========================================================================
     * Debounce
     * ==========================================================================
     */

    function debounce(fn, delay) {
        let timer;
        return function () {
            let context = this;
            let args = arguments;

            clearTimeout(timer);

            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    /*
     * ==========================================================================
     * 瀏覽器 Resize 事件
     * ==========================================================================
     */

    $window.on('resize', debounce(function () {
        screenWidth = $window.outerWidth();
        ctrlMenu(screenWidth);
        fixedHeader(screenWidth, scrollTop);
        ctrlFontsize(screenWidth);
        ctrlCarousel(screenWidth);
    }, 400)).trigger('resize');

    /*
     * ==========================================================================
     * 瀏覽器 Scroll 事件
     * ==========================================================================
     */

    $window.on('scroll', function () {
        scrollTop = $window.scrollTop();
        fixedHeader(screenWidth, scrollTop);
        topButtonShower(scrollTop);
        setAnchorScroll(scrollTop);
        ctrlSwipeTableNotice(screenWidth);
    });

    /*
     * ==========================================================================
     * 瀏覽器 Load 事件
     * ==========================================================================
     */

    $window.on('load', function () {
        fixedHeader(screenWidth, scrollTop);
    });

});