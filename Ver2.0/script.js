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
      length < 3 ? $('#textareaMessage').css('color', 'red') : $('#textareaMessage').css('color', '#fff');
      break;

    case 'email':
      // validate email input and update the counter
      !validateEmail(e.target.value) ? $('#inputEmail').css('color', 'red') : $('#inputEmail').css('color', '#fff');
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
$("form[name='formTwo']").submit(function(event) {
  event.preventDefault();
  error = false;

  var email = inputEmail.val();
  if (email.length < 1) {
    error = true;
  } else {
    var regex = new RegExp(/^([\w-\.]*[a-zA-Z0-9_]+@([\w-]+\.)+[\w-]{2,4})?$/);
    if (!regex.test(email)) {
      error = true;
    }
  }
  if (textarea.val().length < 3 && !validateEmail(inputEmail.val())) {
    return;
  } else {
    $('submitText').addClass('hide');
    $('#submitImage').removeClass('hide');
    $('#button').attr('disabled', true);
    event.preventDefault();
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
      } else {
        $('submitText').removeClass('hide');
        $('#submitImage').addClass('hide');
        $('#button').attr('disabled', false);
      }
    });
  }
});
/////////////////////////// event listeners ///////////////////////////
/* function swoosh(e) {
	e.preventDefault();
	const anchor = document.querySelectorAll(".display-pick a");
	anchor.forEach(anch => {
		anch.classList.remove("fas");
		anch.classList.add("far");
	});

	e.target.classList.add("fas");
	if (e.target.id == 1) {
		display.style.left = "0";
	}
	if (e.target.id == 2) {
		display.style.left = "-960px";
	}
	if (e.target.id == 3) {
		display.style.left = "-1920px";
	}
} */
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



  // fade-in the title after load
  for (var k = 1; k <= 11; k++) {
    animate(k);
  }
  function animate(number) {
    $('#heroLetter'+number).fadeTo(400*number, 1)
  }
    // fade-in the title after load
    for (var j = 1; j <= 20; j++) {
      animateSub(j);
    }
    function animateSub(number) {
      $('#heroSubLetter'+number).fadeTo(200*number, 1)
    }
  
  // check current year and if it's above 2019, add copyright for that year
  if (currentYear > 2018) {
    $('.currentYear').html(' - ' + currentYear);
  }
});