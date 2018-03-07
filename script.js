const triggers = document.querySelectorAll('input[type="radio"] ~ span');
const radio = document.querySelectorAll('input[type="radio"]');
const highlight = document.createElement('span');
const linkButton = document.querySelectorAll('.linkTo');
highlight.classList.add('highlight');
document.body.append(highlight);

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

triggers.forEach(a => a.addEventListener("click", highlightLink));
window.addEventListener('resize', debounce(highlightLink));
highlightLink();

$('body').on('click', () => {
  if ($('.flex-nav').css('right') === '0px'){
    $('#burger-container').removeClass('open');
    $('.flex-nav').removeClass('open');
  }
});
$('#burger-container').on('click', () => {
  $('#burger-container').toggleClass('open');
  $('.flex-nav').toggleClass('open');
});

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

$(document).ready(() => {
  $('.title').fadeTo(2000, 1);
});

// courtesy of stack overflow
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

function checkNav() {
  if (window.scrollY >= 200) {
    $('.normal-nav').addClass('scroll');
  } else {
    $('.normal-nav').removeClass('scroll');
  }
}

linkButton.forEach(link => link.addEventListener('click', (e) => {
  e.preventDefault();
  switch(link.innerHTML) {
    case 'about':
      $('html, body').animate({'scrollTop': $('#'+link.innerHTML).offset().top - 75}, 1000);
      break;
    case 'projects':
      $('html, body').animate({'scrollTop': $('#'+link.innerHTML).offset().top - 75}, 1000);
      break;
    case 'contact': 
      $('html, body').animate({'scrollTop': $('#'+link.innerHTML).offset().top - 75}, 1000);
      break;
    default:
      if(link.getAttribute('data-pos') === 'about') {
        $('html, body').animate({'scrollTop': $('#about').offset().top - 75}, 1000);
      } else {
        $('html, body').animate({'scrollTop': 0}, 1000);
      }
      break;
  }
}))

window.addEventListener("scroll", debounce(checkNav, 40));