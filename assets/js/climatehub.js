// javascript functions


$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('.navbar-brand').addClass('shrink');
    $('.active').addClass('shrink');
  } else if ($(document).scrollTop() <= 50) {
    $('.navbar-brand').removeClass('shrink');
    $('.active').removeClass('shrink');
  }
});
