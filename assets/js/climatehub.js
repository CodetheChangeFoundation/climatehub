// javascript functions

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("logo").style.height = "4rem";
    document.getElementById("logo").style.padding = "0.2rem 0";
  } else {
    document.getElementById("logo").style.height = "8rem";
    document.getElementById("logo").style.padding = "1rem 0";
  }
}