// javascript functions

$(window).scroll(function () {
  if ($(document).scrollTop() >= 80) {
    $('#logo').addClass('shrink');
  } else if ($(document).scrollTop() < 80-64) {
    $('#logo').removeClass('shrink');
  }
});

// google maps
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