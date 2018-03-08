// variables
const triggers = document.querySelectorAll('input[type="radio"] ~ span');
const radio = document.querySelectorAll('input[type="radio"]');
const linkButton = document.querySelectorAll('.linkTo');
const currentYear = new Date().getFullYear();
const navHeight = $('.normal-nav').outerHeight(true);
const animationDuration = 1000;

const textarea = $('.form textarea');
const inputName = $('input[name="name"]');
const inputEmail = $('input[name="email"]');
const inputCompany = $('input[name="company"]');

const input = document.querySelectorAll('form');
const pName = document.querySelector('.name');
const pMail = document.querySelector('.email');
const pMsg = document.querySelector('.msg');
const pComp = document.querySelector('.company');

// element created for the form radio button
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

/////////////////////////// functions ///////////////////////////
// highlight function keeps the highlight span on the correct radio button, should be called on resize and anytime an object in body is moved
function highlightLink (e) {
  let linkCoords;
  if (this !== window) {
    linkCoords = this.getBoundingClientRect();
    radio.forEach(a => {
      a.checked = false;
      if (a.value === e.target.innerHTML) {
        a.checked = true;
      }
    })
  } else {
    if (radio[0].checked) linkCoords = triggers[0].getBoundingClientRect();
    if (radio[1].checked) linkCoords = triggers[1].getBoundingClientRect();
  }
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
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

// courtesy of stack overflow
// e-mail validator
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// function controlling navbar's opacity
function checkNav() {
  if (window.scrollY >= 250) {
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

    case 'name':

      // check name input and update the counter
      length < 2 ? item.css('border-bottom-color', 'red') : item.css('border-bottom-color', '#2196f3');
      $('.form .name .tooltip').html(length + '/' + max);
      break;

    case 'email':
      // validate email input and update the counter
      !validateEmail(e.target.value) ? item.css('border-bottom-color', 'red') : item.css('border-bottom-color', '#2196f3');
      $('.form .email .tooltip').html(length + '/' + max);
      break;

    case 'company':
      // update company counter
      $('.form .company .tooltip').html(length + '/' + max);
      break;
  }

  // check everything to let the user know if input is correct and they can proceed with submiting the information
  if (textarea.val().length > 2 && inputName.val().length > 1 && validateEmail(inputEmail.val())) {
    $('#button').css('background-color', '#2196f3');
  } else {
    $('#button').css('background-color', 'red');
  }
}

// adding swoosh class to paragraph element of the form
function swoosh (e) {
  if (e.target.name === 'name') {
    pName.classList.add('swoosh')
  }
  if (e.target.name === 'email') {
    pMail.classList.add('swoosh')
  }
  if (e.target.name === 'comment') {
    pMsg.classList.add('swoosh')
  }
  if (e.target.name === 'company') {
    pComp.classList.add('swoosh')
  }
}

// removing swoosh class from paragraph element of the form
function swooshRemove (e) {
  if (e.target.value === '') {
    if (e.target.name === 'name') {
      pName.classList.remove('swoosh')
    }
    if (e.target.name === 'email') {
      pMail.classList.remove('swoosh')
    }
    if (e.target.name === 'comment') {
      pMsg.classList.remove('swoosh')
    }
    if (e.target.name === 'company') {
      pComp.classList.remove('swoosh')
    }
  }
}

function submit (e) {
  if (textarea.val().length > 2 && inputName.val().length > 1 && validateEmail(inputEmail.val())) {
    inputName.val("");
    textarea.val("");
    inputEmail.val("");
    inputCompany.val("");
  } else {
    e.preventDefault()
    return;
  }
}

/////////////////////////// event listeners ///////////////////////////
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
  element.on('transitionend', () => {
    highlightLink();
  });
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

// event listeners for cleaner highlighting on radio buttons
window.addEventListener('resize', debounce(highlightLink));
triggers.forEach(a => a.addEventListener("click", highlightLink));
highlightLink();

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