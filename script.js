// variables
const triggers = document.querySelectorAll('input[type="radio"] ~ span');
const radio = document.querySelectorAll('input[type="radio"]');
const linkButton = document.querySelectorAll('.linkTo');
const currentYear = new Date().getFullYear();
const navHeight = $('.normal-nav').outerHeight(true);
const animationDuration = 1000;

const input = document.querySelectorAll('form')
const pName = document.querySelector('.name')
const pMail = document.querySelector('.email')
const pMsg = document.querySelector('.msg')
const pComp = document.querySelector('.company')

// element created for the form radio button
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

// functions
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

// function controlling navbar's opacity
function checkNav() {
  if (window.scrollY >= 250) {
    $('.normal-nav').addClass('scroll');
  } else {
    $('.normal-nav').removeClass('scroll');
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

// event listeners
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
  let element = $(e.target.parentNode.nextElementSibling.parentNode);
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

/*function submit (e) {
  e.preventDefault()
  let name = nameIn.value
  let mail = mailIn.value
  let message = msgIn.value
  alert('This is a front end only project so you will shortly be redirected to e-mail me!')
  window.location.replace(`mailto:d-nice_100@hotmail.com?subject=Portfolio%20contact%20-%20${name}&body=Name:%20${name}%0D%0AE-mail:%20${mail}%0D%0AGreetings,%0D%0A${message}`)
}*/

window.addEventListener('resize', debounce(highlightLink));
window.addEventListener("scroll", checkNav);
triggers.forEach(a => a.addEventListener("click", highlightLink));
input.forEach(item => item.addEventListener('keyup', (e) => {
  swoosh(e);
  swooshRemove(e);
}));
highlightLink();

$(document).ready(() => {
  // fade in title after load
  $('.title').fadeTo(animationDuration + 1000, 1);
  if (currentYear > 2018) {
    $('.currentYear').html(' - ' + currentYear);
  }
});