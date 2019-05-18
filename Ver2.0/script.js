$(document).ready(() => {
  // variables
  const linkButton = document.querySelectorAll('.linkTo');
  const button = $('#stickyButton');
  const instagram = $('#instaSticky');
  const linked = $('#linkedSticky');
  const github = $('#gitSticky');
  const resume = $('#resumeSticky');
  const currentYear = new Date().getFullYear();
  const navHeight = $('.normal-nav').outerHeight(true);
  const animationDuration = 1000;
  const anchor = document.querySelectorAll(".dot");
  const display = document.getElementById('projectsDisplay');
  var globalLimitForProjects;
  if (window.innerWidth < 1335) {
    globalLimitForProjects = -3000;
  } else {
    globalLimitForProjects = -2500;
    $('#dot7').addClass('hide');
  }
  
  var dotInt;
  var clickedShare = false;
  var checked1 = false;
  var checked2 = false;
  var checked3 = false;
  var checked4 = false;
  var checked5 = false;
  var checked6 = false;
  var checked7 = false;

  const textarea = $('.form textarea');
  const inputEmail = $('input[name="email"]');

  const input = document.querySelectorAll('form');
  const pMail = document.querySelector('.email');
  const pMsg = document.querySelector('.msg');

  $("form[name='formTwo']").submit(function(event) {
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
      $.post("https://www.romanstruna.com/handlerequest.php",
      {
        email: inputEmail.val(),
        text: textarea.val(),
      },
      function(data, status){
        var result = JSON.parse(data);
        console.log(result);
        if (result.status === "OK") {
          $('submitText').removeClass('hide');
          $('#submitImage').addClass('hide');
          $('#button').attr('disabled', false);
          $('#button').css('cursor', 'pointer');
        } else {
          $('submitText').removeClass('hide');
          $('#submitImage').addClass('hide');
          $('#button').attr('disabled', false);
          $('#button').css('cursor', 'pointer');
        }
      });
    }
  });

  /////////////////////////// event listeners ///////////////////////////
  // sticky button
  button.on('click', function() {
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
  })

  // button
  $('#buttonNew').on('click', function() {
    $('contact').removeClass('hide');
    $('contact2').addClass('hide');
  });

  // click listener to close the navbar
  $('body').on('click', () => {
    if ($('.flex-nav').css('right') === '0px'){
      $('#burger-container').removeClass('open');
      $('.flex-nav').removeClass('open');
    }
  });

  // burger icon toggler
  $('#burger-container').on('click', () => {
    $('#burger-container').toggleClass('open');
    $('.flex-nav').toggleClass('open');
    $('.normal-nav').addClass('scroll');
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
  });

  // scrolling switch for navigation buttons
  linkButton.forEach(link => link.addEventListener('click', (e) => {
    e.preventDefault();
    switch(link.innerHTML) {
      case 'who am i?':
        $('html, body').animate({'scrollTop': $('#about').offset().top - navHeight}, animationDuration);
        break;
      case 'what i do?':
        $('html, body').animate({'scrollTop': $('#projects').offset().top - navHeight}, animationDuration);
        break;
      case 'contact': 
        $('html, body').animate({'scrollTop': $('#'+link.innerHTML).offset().top - navHeight}, animationDuration);
        break;
      default:
        if(link.getAttribute('data-pos') === 'about') {
          $('html, body').animate({'scrollTop': $('#about').offset().top - navHeight}, animationDuration);
        } else {
          $('html, body').animate({'scrollTop': 0}, animationDuration);
        }
    }
  }));

  // arrows click event
  $('.arrow').on('click', e => prevNextProject(e));

  // dots click event
  $('.dot').on('click', e => swoop(e));

  // event listeners for input field in the contact section
  input.forEach(item => item.addEventListener('keyup', e => checkLength(e)));
  input.forEach(item => item.addEventListener('focusin', e => swoosh(e)));
  input.forEach(item => item.addEventListener('focusout', e => swooshRemove(e)));

  // navbar event listener
  window.addEventListener("scroll", debounce(checkNav, 10));

  // event listeners for projects - mouse over
  $('#projectUno').on('mouseover', () => onhover('Uno'));
  $('#projectDos').on('mouseover', () => onhover('Dos'));
  $('#projectTres').on('mouseover', () => onhover('Tres'));
  $('#projectQuatro').on('mouseover', () => onhover('Quatro'));
  $('#projectCinco').on('mouseover', () => onhover('Cinco'));
  $('#projectSeis').on('mouseover', () => onhover('Seis'));
  $('#projectSiete').on('mouseover', () => onhover('Siete'));
  $('#projectOcho').on('mouseover', () => onhover('Ocho'));

  // event listeners for projects - mouse leave
  $('#projectUno').on('mouseleave', () => onleave('Uno'));
  $('#projectDos').on('mouseleave', () => onleave('Dos'));
  $('#projectTres').on('mouseleave', () => onleave('Tres'));
  $('#projectQuatro').on('mouseleave', () => onleave('Quatro'));
  $('#projectCinco').on('mouseleave', () => onleave('Cinco'));
  $('#projectSeis').on('mouseleave', () => onleave('Seis'));
  $('#projectSiete').on('mouseleave', () => onleave('Siete'));
  $('#projectOcho').on('mouseleave', () => onleave('Ocho'));

  //event for footer click
  $('#stickyFooter').on('click', function() {
    $('#stickyFooter').addClass('hide');
    clickedShare = true;
  });

  // swipe events 
  $("#projectsDisplay").touchwipe({
    wipeLeft: function() { alert("left"); },
    wipeRight: function() { alert("right"); },
    wipeUp: function() { alert("up"); },
    wipeDown: function() { alert("down"); },
    min_move_x: 20,
    min_move_y: 20,
    preventDefaultEvents: true
  });
  // fade-in the title after load
  for (var k = 1; k <= 11; k++) {
    animate(k);
  }

  // fade-in the title after load
  for (var j = 1; j <= 20; j++) {
    animateSub(j);
  }
  
  // check current year and if it's above 2019, add copyright for that year
  if (currentYear > 2018) {
    $('.currentYear').html(' - ' + currentYear);
  }

  ////////////////////////////////////////
  //// Functions - alphabetical order ////
  ////////////////////////////////////////
  function animate(number) {
    $('#heroLetter'+number).fadeTo(400*number, 1)
  }

  function animateSub(number) {
    $('#heroSubLetter'+number).fadeTo(200*number, 1)
  }

  function checkFooter() {
    if (window.scrollY + window.outerHeight >= $(document).height() * 0.9 && clickedShare === false) {
      $('#stickyFooter').removeClass('hide');
    } else {
      $('#stickyFooter').addClass('hide');
    }
  }

  // function that checks the form input validity
  function checkLength(e) {
    const name = e.target.name;
    const length = e.target.value.length;
    const item = $('input[name='+name+']');
    let max = item.attr('maxlength');
    switch (name) {
      case 'comment':

        // set new textarea specific max value
        max = $('textarea[name='+name+']').attr('maxlength');

        // update input counter
        $('.form .msg .tooltip').html(length + '/' + max);

        // check textarea input
        length < 3 ? $('#textareaMessage').css('color', 'darkorange') : $('#textareaMessage').css('color', '#fff');
        break;

      case 'email':
        // validate email input and update the counter
        !validateEmail(e.target.value) ? $('#inputEmail').css('color', 'darkorange') : $('#inputEmail').css('color', '#fff');
        $('.form .email .tooltip').html(length + '/' + max);
        break;
    }

    // check everything to let the user know if input is correct and they can proceed with submiting the information
    if (textarea.val().length > 2 && validateEmail(inputEmail.val())) {
      $('#button').css('cursor', 'pointer');
      $('#button').addClass('buttonClass');
      $('#button').attr('disabled', false);
    } else {
      $('#button').css('cursor', 'not-allowed');
      $('#button').removeClass('buttonClass');
      $('#button').attr('disabled', true);
    }
  }

  // function controlling navbar's opacity
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
  }

  // courtesy of stack overflow
  // it prevents the overflow of the events such as scroll and resize
  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // function that creates an animation for elements when the user hovers over the element window
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
    if(!$('#project'+numberInSpanish).hasClass('mouseover') && ($('#project'+numberInSpanish+' .element-image').css('top') === '0px' || $('#project'+numberInSpanish+' .info-box').css('top') === '0px')) {
      $('#project'+numberInSpanish).addClass('mouseover');
      $('#project'+numberInSpanish+' .element-image').animate({'top': '-300px', 'z-index': 0}, animationDuration/4);
      $('#project'+numberInSpanish+' .info-box').animate({'top': '300px', 'z-index': 50}, animationDuration/4);
      $('#project'+numberInSpanish+' .info-box').addClass('display-content');
      $('#project'+numberInSpanish+' .element-image').animate({'top': 0}, animationDuration/4);
      $('#project'+numberInSpanish+' .info-box').animate({'top': 0, 'background': '#fff'}, animationDuration/4);
    }
    if (checked1 === true && checked2 === true && checked3 === true && checked4 === true && checked5 === true && checked6 === true && checked7 === true) {
      $('#projectsDisplay').css({'width': '4000px'});
      $('#projectOcho').removeClass('hide');
      
      if (window.innerWidth < 1335) {
        globalLimitForProjects = -3500;
        $('#dot8').removeClass('hide');
      } else {
        $('#dot7').addClass('dot8');
        $('#dot7').removeClass('hide');
        globalLimitForProjects = -3000;
      }
      
    }
  }

  // function that creates an animation for elements when the users mouse leaves the element window
  function onleave(numberInSpanish) {
    if($('#project'+numberInSpanish).hasClass('mouseover')) {
      $('#project'+numberInSpanish).removeClass('mouseover');
      $('#project'+numberInSpanish+' .element-image').animate({'top': '-300px', 'z-index': 50}, animationDuration/4);
      $('#project'+numberInSpanish+' .info-box').animate({'top': '300px', 'z-index': 0}, animationDuration/4);
      $('#project'+numberInSpanish+' .info-box').removeClass('display-content');
      $('#project'+numberInSpanish+' .element-image').animate({'top': 0}, animationDuration/4);
      $('#project'+numberInSpanish+' .info-box').animate({'top': 0, 'background': '#0D0F49'}, animationDuration/4);
    }
  }

  // function that switches between projects on arrow click
  function prevNextProject(e) {
    if (display.style.left === '') {
      display.style.left = '0px';
    }
    if (e.target.id === 'leftArrow') {
      if (parseInt(display.style.left) < 0) {
        display.style.left = (parseInt(display.style.left) + 500)+'px';
        dotInt = parseInt($('.picked-dot').attr('id').charAt(3))-1;
        anchor.forEach(anch => {
          anch.classList.remove('picked-dot');
        });
        $('#dot'+dotInt).addClass('picked-dot')
      }
    }
    if (e.target.id === 'rightArrow') {
      if (parseInt(display.style.left) > globalLimitForProjects) {
        display.style.left = (parseInt(display.style.left) - 500)+'px';
        dotInt = parseInt($('.picked-dot').attr('id').charAt(3))+1;
        anchor.forEach(anch => {
          anch.classList.remove('picked-dot');
        });
        $('#dot'+dotInt).addClass('picked-dot')
      }
    }
  }
  // function for switching projects by clicking on the dots below
  function swoop(e) {
    anchor.forEach(anch => {
      anch.classList.remove('picked-dot');
    });

    e.target.classList.add('picked-dot');
    if (e.target.id == 'dot1') {
      display.style.left = "0";
    }
    if (e.target.id == 'dot2') {
      display.style.left = "-500px";
    }
    if (e.target.id == 'dot3') {
      display.style.left = "-1000px";
    }
    if (e.target.id == 'dot4') {
      display.style.left = "-1500px";
    }
    if (e.target.id == 'dot5') {
      display.style.left = "-2000px";
    }
    if (e.target.id == 'dot6') {
      display.style.left = "-2500px";
    }
    if (e.target.id == 'dot7') {
      display.style.left = "-3000px";
    }
    if (e.target.id == 'dot8') {
      display.style.left = "-3500px";
    }
  }

  // adding swoosh class to paragraph element of the form
  function swoosh (e) {
    if (e.target.name === 'email') {
      pMail.classList.add('swoosh')
    }
    if (e.target.name === 'comment') {
      pMsg.classList.add('swoosh')
    }
  }

  // removing swoosh class from paragraph element of the form
  function swooshRemove (e) {
    if (e.target.value === '') {
      if (e.target.name === 'email') {
        pMail.classList.remove('swoosh')
      }
      if (e.target.name === 'comment') {
        pMsg.classList.remove('swoosh')
      }
    }
  }

  // courtesy of stack overflow
  // e-mail validator
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
});