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

const textarea = $('.form textarea');
const inputEmail = $('input[name="email"]');

const input = document.querySelectorAll('form');
const pMail = document.querySelector('.email');
const pMsg = document.querySelector('.msg');

/////////////////////////// functions ///////////////////////////
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

// courtesy of stack overflow
// e-mail validator
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// function controlling navbar's opacity
function checkNav() {
  if (window.scrollY >= 250 || $('#burger-container').hasClass('open')) {
    $('.normal-nav').addClass('scroll');
  } else {
    $('.normal-nav').removeClass('scroll');
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
      length < 3 ? textarea.css('border-bottom-color', 'red') : textarea.css('border-bottom-color', '#2196f3');
      break;

    case 'email':
      // validate email input and update the counter
      !validateEmail(e.target.value) ? item.css('border-bottom-color', 'red') : item.css('border-bottom-color', '#2196f3');
      $('.form .email .tooltip').html(length + '/' + max);
      break;
  }

  // check everything to let the user know if input is correct and they can proceed with submiting the information
  if (textarea.val().length > 2 && validateEmail(inputEmail.val())) {
    $('#button').css('background-color', '#2196f3');
  } else {
    $('#button').css('background-color', 'red');
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

function submit (e) {
  if (textarea.val().length < 3 && !validateEmail(inputEmail.val())) {
    e.preventDefault()
    return;
  }
}

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
  }
})

// submit button
$('#button').on('click', e => {submit(e)});

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
  if (window.scrollY < 250 && !$('#burger-container').hasClass('open')) {
    $('.normal-nav').removeClass('scroll');
  }
});

// toggler for projects display
$('.collapse').on('click', e => {
  let element;
  // checks which element is clicked
  // it's made like this because new elements will be added 
  if (e.target.nodeName === 'I') {
    element = $(e.target.parentNode.parentNode.nextElementSibling.parentNode);
  } else if (e.target.nodeName === 'P') {
    element = $(e.target.parentNode.nextElementSibling.parentNode);
  } else {
    return;
  }
  if(element.css('height') >= '31px') {
    element.css('height', '30px');
  } else {
    element.css('height', '400px');
  }
});

// scrolling switch for navigation buttons
linkButton.forEach(link => link.addEventListener('click', (e) => {
  e.preventDefault();
  switch(link.innerHTML) {
    case 'about':
      $('html, body').animate({'scrollTop': $('#'+link.innerHTML).offset().top - navHeight}, animationDuration);
      break;
    case 'projects':
      $('html, body').animate({'scrollTop': $('#'+link.innerHTML).offset().top - navHeight}, animationDuration);
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

// event listeners for input field in the contact section
input.forEach(item => item.addEventListener('keyup', e => checkLength(e)));
input.forEach(item => item.addEventListener('focusin', e => swoosh(e)));
input.forEach(item => item.addEventListener('focusout', e => swooshRemove(e)));

// navbar event listener
window.addEventListener("scroll", debounce(checkNav, 10));

$(document).ready(() => {

  // fade-in the title after load
  $('.title').fadeTo(animationDuration + 1000, 1);
  
  // check current year and if it's above 2019, add copyright for that year
  if (currentYear > 2018) {
    $('.currentYear').html(' - ' + currentYear);
  }
});