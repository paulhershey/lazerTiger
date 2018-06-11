'use strict';
(function() {
  jQuery(document).ready(function($) {
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
  });

})();
