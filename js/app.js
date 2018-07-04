'use strict';
(function() {
  jQuery(document).ready(function($) {

    initScrollToThis();
    responsiveVideos();

    var $messages = $('div[data-type="message"]');
    var $form = $('#mc-embedded-subscribe-form');

    $('.cd-form .cd-email').keyup(function(event) {

      if (event.which != 13) {
        $messages.removeClass('slide-in is-visible');

        $('.cd-form').removeClass('is-submitted').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      }

      var emailInput = $(this),
        insertedEmail = emailInput.val(),
        atPosition = insertedEmail.indexOf("@"),
        dotPosition = insertedEmail.lastIndexOf(".");

      if (atPosition < 1 || dotPosition < atPosition + 2) {
        $('.cd-form').removeClass('is-active').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      } else {
        $('.cd-form').addClass('is-active');
      }
    });

    $('.cd-form .cd-email').on('focus', function() {
      $messages.removeClass('slide-in is-visible');
      $('.cd-form').removeClass('is-submitted').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });

    //you should replace this part with your ajax function
    $('.cd-submit').on('click', function(event) {
      if ($('.cd-form').hasClass('is-active')) {
        event.preventDefault();

        //show the loading bar and the corrisponding message
        $('.cd-form').addClass('is-submitted').find('.cd-loading').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          registerForm($form);
        });

        //if transitions are not supported - show messages
        if ($('html').hasClass('no-csstransitions')) {
          registerForm($form);
        }
      }
    });

    function registerForm($form) {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        dataType: 'jsonp',
        cache: false,
        error: function(err) {
          $('.cd-response-error').addClass('is-visible');
        },
        success: function(data) {
          if (data.result === 'success') {
            console.log(data.msg)
            $('.cd-response-success').addClass('slide-in');
          } else {
            console.log(data.msg)
            $('.cd-response-notification').addClass('is-visible');
          }
        }
      });
    }

    if (!Modernizr.input.placeholder) {
      $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
          input.val(input.attr('placeholder'));
        }
      }).blur();
      $('[placeholder]').parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
          }
        })
      });
    }

    // Button Hovers
    $('.btn').on('mouseenter', function(e) {
  		var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
  		$(this).find('span').css({top:relY, left:relX})
    }).on('mouseout', function(e) {
  		var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
      $(this).find('span').css({top:relY, left:relX})
    });
    $("[href='#']").click(function(){return false});
  });

  // Scroll to animate
  function initScrollToThis() {
    $('[data-scroll]').on('click', function(evt) {
      if (this.hash !== '') {
        evt.preventDefault();
        var $target = this.getAttribute('href');
        $('html, body').animate({
          scrollTop: $($target).offset().top
        }, 1000);
        return false
      }
    });
  }

  function responsiveVideos() {
    // Cycle through all videos on the page
    $('video').each(function(index) {
      // Gather their data-source
      var videoSrc = $(this).data('source');

      if (!videoSrc) { return false }
      // Add video source on large screens and up
      // Smaller devices won't download assets
      if ($(window).width() > 1024 ) {
        $(this).append("<source type='video/mp4' src='"+ videoSrc +".mp4.mp4'>");
        $(this).append("<source type='video/webm' src='"+ videoSrc +".webmhd.webm'>");
        $(this).append("<source type='video/ogg' src='"+ videoSrc +".oggtheora.ogv'>");
      }
    });
  }
})();
