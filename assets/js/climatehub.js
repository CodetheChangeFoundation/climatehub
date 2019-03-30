// javascript functions

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    $("#logo").addClass("shrink");
  } else {
    $("#logo").removeClass("shrink");
  }
}