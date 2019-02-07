// javascript functions
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('.navbar-brand').addClass('shrink');
    $('.active').addClass('shrink');
  } else {
    $('.navbar-brand').removeClass('shrink');
    $('.active').removeClass('shrink');
  }
});

/*projects page carousel*/
$(document).ready(function() {
  $("#projects-carousel").on("slide.bs.carousel", function(e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $(".carousel-item")
            .eq(i)
            .appendTo(".carousel-inner");
        } else {
          $(".carousel-item")
            .eq(0)
            .appendTo($(this).find(".carousel-inner"));
        }
      }
    }
  });
});
