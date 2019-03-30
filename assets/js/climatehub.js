// javascript functions

$(window).scroll(function () {
  if ($(document).scrollTop() >= 80) {
    $('#logo').addClass('shrink');
  } else if ($(document).scrollTop() < 80-64) {
    $('#logo').removeClass('shrink');
  }
});