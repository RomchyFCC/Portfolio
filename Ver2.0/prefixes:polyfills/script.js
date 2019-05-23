"use strict";

$(document).ready(function () {
  // variables
  var button = $('#stickyButton');
  var instagram = $('#instaSticky');
  var linked = $('#linkedSticky');
  var github = $('#gitSticky');
  var resume = $('#resumeSticky');
  var currentYear = new Date().getFullYear();
  var navHeight = $('.normal-nav').outerHeight(true);
  var animationDuration = 1000;
  var display = document.getElementById('projectsDisplay');
  var globalLimitForProjects;
  var elementLength;
  var twoElems = false;
  var oneElem = false;

  if (window.innerWidth < 1350) {
    if (window.innerWidth < 520) {
      if (window.innerWidth < 365) {
        globalLimitForProjects = -1800;
        elementLength = 300;
      } else {
        globalLimitForProjects = -2100;
        elementLength = 350;
      }
    } else {
      elementLength = 500;
      globalLimitForProjects = -3000;
    }
  } else {
    globalLimitForProjects = -2650;
    elementLength = 530;
    $('#dot7').addClass('hide');
    twoElems = true;
  }

  var wait = false;
  var dotInt;
  var clickedShare = false;
  var checked1 = false;
  var checked2 = false;
  var checked3 = false;
  var checked4 = false;
  var checked5 = false;
  var checked6 = false;
  var checked7 = false;
  var submitedBefore = false;
  var textarea = $('.form textarea');
  var inputEmail = $('input[name="email"]');
  var pMail = document.querySelector('.email');
  var pMsg = document.querySelector('.msg');
  $("#form").submit(function (event) {
    event.preventDefault();
    error = false;
    var email = inputEmail.val();

    if (email.length < 1) {
      error = true;
    } else {
      if (!validateEmail(email)) {
        error = true;
      }
    }

    if (error) {
      return;
    } else {
      $('submitText').addClass('hide');
      $('#submitImage').removeClass('hide');
      $('#button').attr('disabled', true);
      $('#button').css('cursor', 'wait');
      $.post("https://www.romanstruna.com/test-12x34/handlerequest.php", {
        email: inputEmail.val(),
        text: textarea.val()
      }, function (data) {
        var result = JSON.parse(data);

        if (result.result === "OK") {
          if (submitedBefore === false) {
            submitedBefore = true;
            $('#contactDiv').animate({
              'opacity': 0,
              'left': '-1000px'
            }, animationDuration / 4, function () {
              $('#contactDiv').addClass('hide');
              $('#contact2').removeClass('hide');
            });
            $('#contact2').animate({
              'opacity': 1,
              'left': 0
            }, animationDuration / 4);
            textarea.val('');
          } else {
            $('#contactDiv').animate({
              'opacity': 0,
              'left': '-1000px'
            }, animationDuration / 4, function () {
              $('#contactDiv').addClass('hide');
              $('#contact3').removeClass('hide');
            });
            $('#contact3').animate({
              'opacity': 1,
              'left': 0
            }, animationDuration / 4);
            textarea.val('');
          }

          $('submitText').removeClass('hide');
          $('#submitImage').addClass('hide');
          $('#button').css('cursor', 'not-allowed');
        } else {
          $('submitText').removeClass('hide');
          $('#submitImage').addClass('hide');
          $('#button').attr('disabled', false);
          $('#button').css('cursor', 'pointer');
        }
      });
    }
  }); /////////////////////////// event listeners ///////////////////////////
  // sticky button

  button.on('click', function () {
    instagram.toggleClass('instagram-sticky');
    linked.toggleClass('linkedin-sticky');
    resume.toggleClass('resume-sticky');
    github.toggleClass('github-sticky');

    if (instagram.hasClass('instagram-sticky')) {
      $('#shareButton').addClass('hide');
      $('#shareClose').removeClass('hide');
    } else {
      $('#shareButton').removeClass('hide');
      $('#shareClose').addClass('hide');
      clickedShare = true;
      $('#stickyFooter').addClass('hide');
    }
  }); // button

  $('#buttonNew').on('click', function () {
    $('#contact2').animate({
      'opacity': 0,
      'left': '1000px'
    }, animationDuration / 4, function () {
      $('#contact2').addClass('hide');
      $('#contactDiv').removeClass('hide');
    });
    $('#contactDiv').animate({
      'opacity': 1,
      'left': 0
    }, animationDuration / 4);
  }); // click listener to close the navbar

  $('body').on('click', function () {
    if ($('.flex-nav').css('right') === '0px') {
      $('#burger-container').removeClass('open');
      $('.flex-nav').removeClass('open');
      $('.normal-nav').removeClass('scroll2');
    }

    if (instagram.css('opacity') === "1") {
      $('#shareButton').removeClass('hide');
      $('#shareClose').addClass('hide');
      instagram.removeClass('instagram-sticky');
      linked.removeClass('linkedin-sticky');
      resume.removeClass('resume-sticky');
      github.removeClass('github-sticky');
    }
  }); // burger icon toggler

  $('#burger-container').on('click', function () {
    $('#burger-container').toggleClass('open');
    $('.flex-nav').toggleClass('open');
    $('.normal-nav').addClass('scroll');
    $('.normal-nav').toggleClass('scroll2');
    $('#shareClose').addClass('scroll-more');
    $('#stickyButton').addClass('scroll-more');
    $('#instaSticky').addClass('scroll-more');
    $('#linkedSticky').addClass('scroll-more');
    $('#gitSticky').addClass('scroll-more');
    $('#resumeSticky').addClass('scroll-more');

    if (window.scrollY < 250 && !$('#burger-container').hasClass('open')) {
      $('.normal-nav').removeClass('scroll');
      $('#shareClose').removeClass('scroll-more');
      $('#stickyButton').removeClass('scroll-more');
      $('#instaSticky').removeClass('scroll-more');
      $('#linkedSticky').removeClass('scroll-more');
      $('#gitSticky').removeClass('scroll-more');
      $('#resumeSticky').removeClass('scroll-more');
    }
  }); // scrolling switch for navigation buttons

  $('.linkTo').each(function (key, link) {
    return link.addEventListener('click', function (e) {
      e.preventDefault();

      switch (link.innerHTML) {
        case 'About me':
          $('html, body').animate({
            'scrollTop': $('#about').offset().top - navHeight
          }, animationDuration);
          break;

        case 'Projects':
          $('html, body').animate({
            'scrollTop': $('#projects').offset().top - navHeight
          }, animationDuration);
          break;

        case 'Contact':
          $('html, body').animate({
            'scrollTop': $('#contact').offset().top - navHeight
          }, animationDuration);
          break;

        default:
          if (link.getAttribute('data-pos') === 'about') {
            $('html, body').animate({
              'scrollTop': $('#about').offset().top - navHeight
            }, animationDuration);
          } else {
            $('html, body').animate({
              'scrollTop': 0
            }, animationDuration);
          }

      }
    });
  }); // arrows click event

  $('.arrow').on('click', function (e) {
    return prevNextProject(e);
  }); // dots click event

  $('.dot').on('click', function (e) {
    return swoop(e);
  }); // event listeners for input field in the contact section

  $('form').each(function (key, item) {
    return item.addEventListener('keyup', function (e) {
      return checkLength(e);
    });
  });
  $('form').each(function (key, item) {
    return item.addEventListener('focusin', function (e) {
      return swoosh(e);
    });
  });
  $('form').each(function (key, item) {
    return item.addEventListener('focusout', function (e) {
      return swooshRemove(e);
    });
  }); // navbar event listener

  window.addEventListener("scroll", debounce(checkNav, 10)); // event listeners for projects - mouse over

  $('#projectUno').on('mouseover', function () {
    return onhover('Uno');
  });
  $('#projectDos').on('mouseover', function () {
    return onhover('Dos');
  });
  $('#projectTres').on('mouseover', function () {
    return onhover('Tres');
  });
  $('#projectQuatro').on('mouseover', function () {
    return onhover('Quatro');
  });
  $('#projectCinco').on('mouseover', function () {
    return onhover('Cinco');
  });
  $('#projectSeis').on('mouseover', function () {
    return onhover('Seis');
  });
  $('#projectSiete').on('mouseover', function () {
    return onhover('Siete');
  });
  $('#projectOcho').on('mouseover', function () {
    return onhover('Ocho');
  }); // event listeners for projects - mouse leave

  $('#projectUno').on('mouseleave', function () {
    return onleave('Uno');
  });
  $('#projectDos').on('mouseleave', function () {
    return onleave('Dos');
  });
  $('#projectTres').on('mouseleave', function () {
    return onleave('Tres');
  });
  $('#projectQuatro').on('mouseleave', function () {
    return onleave('Quatro');
  });
  $('#projectCinco').on('mouseleave', function () {
    return onleave('Cinco');
  });
  $('#projectSeis').on('mouseleave', function () {
    return onleave('Seis');
  });
  $('#projectSiete').on('mouseleave', function () {
    return onleave('Siete');
  });
  $('#projectOcho').on('mouseleave', function () {
    return onleave('Ocho');
  }); //event for footer click

  $('#stickyFooter').on('click', function () {
    $('#stickyFooter').addClass('hide');
    clickedShare = true;
  }); // swipe events 

  $("#projectsDisplay").touchwipe({
    wipeLeft: function wipeLeft() {
      prevNextProjectSwipe('left');
    },
    wipeRight: function wipeRight() {
      prevNextProjectSwipe('right');
    },
    //wipeUp: function() { alert("up"); },
    //wipeDown: function() { alert("down"); },
    min_move_x: 20,
    min_move_y: 20,
    preventDefaultEvents: false
  }); // fade-in the title after load

  for (var k = 1; k <= 11; k++) {
    animate(k);
  } // fade-in the title after load


  for (var j = 1; j <= 20; j++) {
    animateSub(j);
  } // check current year and if it's above 2019, add copyright for that year


  if (currentYear > 2018) {
    $('.currentYear').html(' - ' + currentYear);
  } ////////////////////////////////////////
  //// Functions - alphabetical order ////
  ////////////////////////////////////////


  function animate(number) {
    $('#heroLetter' + number).fadeTo(400 * number, 1);
  }

  function animateSub(number) {
    $('#heroSubLetter' + number).fadeTo(200 * number, 1);
  }

  function checkFooter() {
    if (window.scrollY + window.outerHeight >= $(document).height() * 0.9 && clickedShare === false) {
      $('#stickyFooter').removeClass('hide');
    } else {
      $('#stickyFooter').addClass('hide');
    }
  } // function that checks the form input validity


  function checkLength(e) {
    var name = e.target.name;
    var length = e.target.value.length;
    var item = $('input[name=' + name + ']');
    var max = item.attr('maxlength');

    switch (name) {
      case 'comment':
        // set new textarea specific max value
        max = $('textarea[name=' + name + ']').attr('maxlength'); // update input counter

        $('.form .msg .tooltip').html(length + '/' + max); // check textarea input

        length < 3 ? $('#textareaMessage').css('color', 'darkorange') : $('#textareaMessage').css('color', '#fff');
        break;

      case 'email':
        // validate email input and update the counter
        !validateEmail(e.target.value) ? $('#inputEmail').css('color', 'darkorange') : $('#inputEmail').css('color', '#fff');
        $('.form .email .tooltip').html(length + '/' + max);
        break;
    } // check everything to let the user know if input is correct and they can proceed with submiting the information


    if (textarea.val().length > 2 && validateEmail(inputEmail.val())) {
      $('#button').css('cursor', 'pointer');
      $('#button').addClass('buttonClass');
      $('#button').attr('disabled', false);
    } else {
      $('#button').css('cursor', 'not-allowed');
      $('#button').removeClass('buttonClass');
      $('#button').attr('disabled', true);
    }
  } // function controlling navbar's opacity


  function checkNav() {
    if (window.scrollY >= 250 || $('#burger-container').hasClass('open')) {
      $('.normal-nav').addClass('scroll');
      $('#shareClose').addClass('scroll-more');
      $('#stickyButton').addClass('scroll-more');
      $('#instaSticky').addClass('scroll-more');
      $('#linkedSticky').addClass('scroll-more');
      $('#gitSticky').addClass('scroll-more');
      $('#resumeSticky').addClass('scroll-more');
    } else {
      $('.normal-nav').removeClass('scroll');
      $('#shareClose').removeClass('scroll-more');
      $('#stickyButton').removeClass('scroll-more');
      $('#instaSticky').removeClass('scroll-more');
      $('#linkedSticky').removeClass('scroll-more');
      $('#gitSticky').removeClass('scroll-more');
      $('#resumeSticky').removeClass('scroll-more');
    }

    checkFooter();
  } // courtesy of stack overflow
  // it prevents the overflow of the events such as scroll and resize


  function debounce(func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  } // function that creates an animation for elements when the user hovers over the element window


  function onhover(numberInSpanish) {
    switch (numberInSpanish) {
      case 'Uno':
        checked1 = true;
        break;

      case 'Dos':
        checked2 = true;
        break;

      case 'Tres':
        checked3 = true;
        break;

      case 'Quatro':
        checked4 = true;
        break;

      case 'Cinco':
        checked5 = true;
        break;

      case 'Seis':
        checked6 = true;
        break;

      case 'Siete':
        checked7 = true;
        break;

      default:
        break;
    }

    if (!$('#project' + numberInSpanish).hasClass('mouseover') && !wait) {
      //wait = true;
      $('#project' + numberInSpanish).addClass('mouseover');
      $('#project' + numberInSpanish + ' .element-image').animate({
        'opacity': 0.5
      }, animationDuration / 4);
      $('#project' + numberInSpanish + ' .info-box').animate({
        'z-index': 50,
        'opacity': 0.5
      }, animationDuration / 4);
      $('#project' + numberInSpanish + ' .info-box').addClass('display-content');
      $('#project' + numberInSpanish + ' .element-image').animate({
        'opacity': 1
      }, animationDuration / 4);
      $('#project' + numberInSpanish + ' .info-box').animate({
        'background': '#fff',
        'opacity': 1
      }, animationDuration / 4);
    }

    if (checked1 === true && checked2 === true && checked3 === true && checked4 === true && checked5 === true && checked6 === true && checked7 === true) {
      if (window.innerWidth < 1350) {
        oneElem = true;

        if (window.innerWidth < 520) {
          if (window.innerWidth < 365) {
            $('#projectsDisplay').css({
              'width': '2400px'
            });
            globalLimitForProjects = -2100;
          } else {
            $('#projectsDisplay').css({
              'width': '2800px'
            });
            globalLimitForProjects = -2450;
          }
        } else {
          $('#projectsDisplay').css({
            'width': '4000px'
          });
          globalLimitForProjects = -3500;
        }

        $('#dot8').removeClass('hide');
      } else {
        $('#dot7').addClass('dot8');
        $('#dot7').removeClass('hide');
        globalLimitForProjects = -3180;
        $('#projectsDisplay').css({
          'width': '4240px'
        });
        twoElems = false;
      }

      $('#projectOcho').removeClass('hide');
    }
  } // function that creates an animation for elements when the users mouse leaves the element window


  function onleave(numberInSpanish) {
    if ($('#project' + numberInSpanish).hasClass('mouseover')) {
      $('#project' + numberInSpanish).removeClass('mouseover');
      $('#project' + numberInSpanish + ' .element-image').animate({
        'opacity': 0.5
      }, animationDuration / 4);
      $('#project' + numberInSpanish + ' .info-box').animate({
        'z-index': 0,
        'opacity': 0.5
      }, animationDuration / 4);
      $('#project' + numberInSpanish + ' .info-box').removeClass('display-content');
      $('#project' + numberInSpanish + ' .element-image').animate({
        'opacity': 1
      }, animationDuration / 4);
      $('#project' + numberInSpanish + ' .info-box').animate({
        'background': '#0D0F49',
        'opacity': 1
      }, animationDuration / 4);
    }
  } // function that switches between projects on arrow click


  function prevNextProject(e) {
    if (display.style.left === '') {
      display.style.left = '0px';
    }

    if (e.target.id === 'leftArrow') {
      if (parseInt(display.style.left) < 0) {
        display.style.left = parseInt(display.style.left) + elementLength + 'px';
        dotInt = parseInt($('.picked-dot').attr('id').charAt(3)) - 1;
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');
        });
        $('#dot' + dotInt).addClass('picked-dot');
      } else if (parseInt(display.style.left) === 0) {
        display.style.left = globalLimitForProjects + 'px';
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');

          if (key === $('.dot').length - 1) {
            if (twoElems) {
              $('#dot' + (key - 1)).addClass('picked-dot');
            } else if (oneElem) {
              $('#dot' + (key + 1)).addClass('picked-dot');
            } else {
              $('#dot' + key).addClass('picked-dot');
            }
          }
        });
      }
    }

    if (e.target.id === 'rightArrow') {
      if (parseInt(display.style.left) > globalLimitForProjects) {
        display.style.left = parseInt(display.style.left) - elementLength + 'px';
        dotInt = parseInt($('.picked-dot').attr('id').charAt(3)) + 1;
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');
        });
        $('#dot' + dotInt).addClass('picked-dot');
      } else if (parseInt(display.style.left) === globalLimitForProjects) {
        display.style.left = '0';
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');
        });
        $('#dot1').addClass('picked-dot');
      }
    }
  }

  function prevNextProjectSwipe(swipe) {
    if (display.style.left === '') {
      display.style.left = '0px';
    }

    if (swipe === 'right') {
      if (parseInt(display.style.left) < 0) {
        display.style.left = parseInt(display.style.left) + elementLength + 'px';
        dotInt = parseInt($('.picked-dot').attr('id').charAt(3)) - 1;
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');
        });
        $('#dot' + dotInt).addClass('picked-dot');
      } else if (parseInt(display.style.left) === 0) {
        display.style.left = globalLimitForProjects + 'px';
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');

          if (key === $('.dot').length - 1) {
            if (twoElems) {
              $('#dot' + (key - 1)).addClass('picked-dot');
            } else if (oneElem) {
              $('#dot' + (key + 1)).addClass('picked-dot');
            } else {
              $('#dot' + key).addClass('picked-dot');
            }
          }
        });
      }
    }

    if (swipe === 'left') {
      if (parseInt(display.style.left) > globalLimitForProjects) {
        display.style.left = parseInt(display.style.left) - elementLength + 'px';
        dotInt = parseInt($('.picked-dot').attr('id').charAt(3)) + 1;
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');
        });
        $('#dot' + dotInt).addClass('picked-dot');
      } else if (parseInt(display.style.left) === globalLimitForProjects) {
        display.style.left = '0';
        $('.dot').each(function (key, anch) {
          anch.classList.remove('picked-dot');
        });
        $('#dot1').addClass('picked-dot');
      }
    }
  } // function for switching projects by clicking on the dots below


  function swoop(e) {
    $('.dot').each(function (key, anch) {
      anch.classList.remove('picked-dot');
    });
    e.target.classList.add('picked-dot');

    if (e.target.id == 'dot1') {
      display.style.left = "0";
    }

    if (e.target.id == 'dot2') {
      display.style.left = "-" + elementLength + "px";
    }

    if (e.target.id == 'dot3') {
      display.style.left = "-" + elementLength * 2 + "px";
    }

    if (e.target.id == 'dot4') {
      display.style.left = "-" + elementLength * 3 + "px";
    }

    if (e.target.id == 'dot5') {
      display.style.left = "-" + elementLength * 4 + "px";
    }

    if (e.target.id == 'dot6') {
      display.style.left = "-" + elementLength * 5 + "px";
    }

    if (e.target.id == 'dot7') {
      display.style.left = "-" + elementLength * 6 + "px";
    }

    if (e.target.id == 'dot8') {
      display.style.left = "-" + elementLength * 7 + "px";
    }
  } // adding swoosh class to paragraph element of the form


  function swoosh(e) {
    if (e.target.name === 'email') {
      pMail.classList.add('swoosh');
    }

    if (e.target.name === 'comment') {
      pMsg.classList.add('swoosh');
    }
  } // removing swoosh class from paragraph element of the form


  function swooshRemove(e) {
    if (e.target.value === '') {
      if (e.target.name === 'email') {
        pMail.classList.remove('swoosh');
      }

      if (e.target.name === 'comment') {
        pMsg.classList.remove('swoosh');
      }
    }
  } // courtesy of stack overflow
  // e-mail validator


  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
});