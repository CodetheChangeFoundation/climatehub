// javascript functions

// navbar
$(window).scroll(function () {
  if ($(document).scrollTop() >= 80) {
    $('#logo').addClass('shrink');
  } else if ($(document).scrollTop() < 80-64) {
    $('#logo').removeClass('shrink');
  }
});

/*projects page carousel*/
$(document).ready(function () {
  $("#projects-carousel").on("slide.bs.carousel", function (e) {
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

// engagements page
$('.partner-image').on('click', function() {
  $('.collapse.show').collapse('toggle');
});

$('.close-icon').on('click', function() {
  $('.collapse.show').collapse('toggle');
});

// google maps
if ($('.acf-map').length) {
  (function ($) {
    function render_map($el) {
      var $markers = $el.find('.marker');
      var args = {
        zoom: 16,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map($el[0], args);
      map.markers = [];

      $markers.each(function () {
        add_marker($(this), map);
      });
      
      center_map(map);
    }

    var infowindow = new google.maps.InfoWindow({
      content: ''
    });

    function add_marker($marker, map) {
      var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
      var marker = new google.maps.Marker({
        position: latlng,
        map: map
      });

      map.markers.push(marker);

      if ($marker.html()) {
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent($marker.html());
          infowindow.open(map, marker);
        });

        google.maps.event.addListener(map, 'click', function (event) {
          if (infowindow) {
            infowindow.close();
          }
        });
      }
    }

    function center_map(map) {
      var bounds = new google.maps.LatLngBounds();
      
      $.each(map.markers, function (i, marker) {
        var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        bounds.extend(latlng);
      });

      if (map.markers.length == 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(16);
      } else {
        map.fitBounds(bounds);
      }
    }

    $(document).ready(function () {
      $('.acf-map').each(function () {
        render_map($(this));
      });
    });
  })(jQuery);
}
