// javascript functions

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("logo").style.height = "4rem";
    document.getElementById("logo").style.padding = "0.2rem 0";
    // $("#bs4navbar ul li").attr("style", "top:-14.5px;");
  } else {
    document.getElementById("logo").style.height = "8rem";
    document.getElementById("logo").style.padding = "1rem 0";
    // $("#bs4navbar ul li").attr("style", "top:-46.5px;");
  }
}