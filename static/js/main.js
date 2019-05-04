// Making Variable for the popup
var infoWindow;

// Initialize and adding the map with Geolocation Popup Note that "initMap is the main call-back function for google api key"
function initMap() {

  // My location ( Arab Open University)
  const loc = { lat: 21.592422, lng: 39.145728 };
  // Centered map on "My Location"
  const map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 14,
    center: loc
  });
  
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  // Specify just the place data fields that you need.
  autocomplete.setFields(['place_id', 'geometry', 'name']);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  var marker = new google.maps.Marker({map: map});

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();

    var place = autocomplete.getPlace();

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });

    marker.setVisible(true);

    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-id'].textContent = place.place_id;
    infowindowContent.children['place-address'].textContent =
        place.formatted_address;
    infowindow.open(map, marker);
  });

  // Creating a popup for the geolocation
  infoWindow = new google.maps.InfoWindow;

  // Making Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  // Traffic Layer 
  var traffic = new google.maps.TrafficLayer();
  traffic.setMap(map);

  // Error Handling for the Geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
}

// Smooth Scrolling
$('#navbar a, .btn').on('click', function(event) {
  if (this.hash !==''){
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 100
      },
      500
    );
  }
});

// See Through Navbar While Scrolling
window.addEventListener('scroll', function() {
  if (window.scrollY > 150) {
    document.querySelector('#navbar').style.opacity = 0.8;
  } else {
    document.querySelector('#navbar').style.opacity = 1;
  }
}); 

