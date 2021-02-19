$.fn.isOnScreen = function (shift) {
  if (!shift) {
    shift = 0;
  }
  var viewport = {};
  viewport.top = $(window).scrollTop();
  viewport.bottom = viewport.top + $(window).height();
  var bounds = {};
  bounds.top = this.offset().top + shift;
  bounds.bottom = bounds.top + this.outerHeight() - shift;
  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

function viewport() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return {width: e[a + 'Width'], height: e[a + 'Height']};
};
var toForm = function () {
  $('.pre_toform').click(function (e) {
    e.preventDefault();
    var a = $('.js_submit');
    var b = a.closest('form');
    if ($('form#order_form').length) {
      a = $('#order_form .js_submit');
      b = a.closest('form#order_form');
    }
    if (b.length && a.is(':visible')) {
      $("html,body").animate({scrollTop: b.last().offset().top}, 1000);
    }
    return false;
  });
};

var _bxInnit = function (elem, opt) {
  var defaultOptions = {
    view: 'all'
  }
  var currentOpt = $.extend(defaultOptions, opt);
  var init = {
    breakPoint: 1024,
    sliderActive: false,
    initBreakpoint: null,
    resizeBreakpointMore: null,
    resizeBreakpointLess: null,
    windowWidht: window.innerWidth
  }


  var flag = false;

  var slider;


  var sliderClone = $(elem).clone();


  var options = opt;

  function createSlider() {
    slider = $(elem).bxSlider(options);
    return true;
  }

  if (flag) {
    createSlider();
    init.sliderActive = true;
  }


  function createBreakpoints() {
    switch (currentOpt.view) {
      case 'mobile':
        init.initBreakpoint = init.windowWidht < init.breakPoint;
        init.resizeBreakpointMore = init.windowWidht >= init.breakPoint;
        init.resizeBreakpointLess = init.windowWidht < init.breakPoint;
        break;

      case 'desktop':
        init.initBreakpoint = init.windowWidht >= init.breakPoint;
        init.resizeBreakpointMore = init.windowWidht < init.breakPoint;
        init.resizeBreakpointLess = init.windowWidht >= init.breakPoint;
        init.resizeBreakpointLess;
        break;

      case 'all':
        init.initBreakpoint = true;
        init.resizeBreakpointMore = false;
        init.resizeBreakpointLess = false;
        break;
    }
  }

  createBreakpoints();


  if (init.initBreakpoint) {
    createSlider();
    init.sliderActive = true;
  }

  $(window).resize(function () {
    init.windowWidht = window.innerWidth;

    createBreakpoints();

    if (init.resizeBreakpointMore) {
      if (init.sliderActive) {
        slider.destroySlider();
        init.sliderActive = false;
        slider.replaceWith(sliderClone.clone());
      }
    }

    if (init.resizeBreakpointLess) {
      if (!init.sliderActive) {
        createSlider();
        init.sliderActive = true;
      }
    }
  });

  var a, b;
  a = 1;
  b = 0;

  $(window).on('scroll', function () {
    if (init.sliderActive == true) {
      if (slider.isOnScreen()) {
        b = 1;
      } else {
        b = 0;
      }

      if (a == b) {
        slider.startAuto();
      } else {
        slider.stopAuto();
      }
    }
  });
}

function headerSliderRotate() {

  var viewportSize = viewport().width;

  //--------- Header slider ------------

  if (viewportSize > 992) {
    $('.header__product--item').on('click', function () {
      var $this = $(this);
      $this.siblings().removeClass('now');
      $this.addClass('now');
    });
  }
};


function parallaxOnScroll() {

  $(window).scroll(function () {

    var scrolled = $(window).scrollTop();

    $('.parallax').each(function (index, elem) {

      var $this = $(this);

      var initY = $this.offset().top,
        $height = $this.height(),
        endY = index + $this.height();

      // Check if the element is in the viewport.

      var visible = $this.isOnScreen();

      if (visible) {
        var diff = scrolled - initY;

        if ($this.hasClass('parallax-big')) {
          var ratio = Math.round((diff / $height) * 250);
          $(this).css('transform', 'translateY(' + parseInt(-(ratio * 0.9)) + 'px)');

        } else {
          var ratio = Math.round((diff / $height) * 50);
          $(this).css('transform', 'translateY(' + parseInt(-(ratio * 0.9)) + 'px)');
        }
      }
    })
  })
}

var _beforeAfter = function () {
  document.querySelectorAll('.cocoen').forEach(function (element) {
    new Cocoen(element);
  });
};

$(function () {

  headerSliderRotate();
  _beforeAfter();
  toForm();
  parallaxOnScroll();
  $(document).load($(window).bind("resize", headerSliderRotate));


  //----------------------------------------------------
  //              слайдеры
  //----------------------------------------------------


  _bxInnit('#reviews-slider', {
    view: 'mobile',
    adaptiveHeight: true,
    swipeThreshold: 40,
    controls: false,
    pager: true,
    auto: true,
    pause: 7000,
    autoHover: true,
  })

  $('#mobile-photo-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    centerMode: true,
    centerPadding: '10px',
    variableWidth: true
  });
  $('#desktop-photo-slider').slick({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    cssEase: 'linear'
  });

  $('#s-safety__list').slick({
        fade: false,
        autoplay: true,
        arrows: true,
        slidesToShow: 5,
        dots: false,
        infinite: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 1
            }
        }]
    });

  // $(window).width() >= 1024 ? slider.slick(settings) : false;

  // $(window).on('resize', function () {

    // if ($(window).width() <= 1023) {

      // if (slider.hasClass('slick-initialized')) {
        // slider.slick('unslick');
      // }

    // } else if (!slider.hasClass('slick-initialized')) {
      // slider.slick(settings);
    // }

  // })

});