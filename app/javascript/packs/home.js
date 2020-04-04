google.maps.event.addDomListener(window, 'load', initAutocomplete);

var placeSearch, autocomplete;

var componentForm = {
  locality: 'long_name',
  administrative_area_level_1: 'long_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), {
      types: ['establishment']
    });

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component', 'geometry']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', getSelectedLocation);

  if (document.getElementById('shop_latitude')) {
    autocomplete.addListener('place_changed', getPlaceData);
  }
}

function getSelectedLocation() {
  var place = autocomplete.getPlace();
  var lat = place.geometry.location.lat(),
    lng = place.geometry.location.lng();

  var shop_lat = document.getElementById('shop_latitude');
  var shop_lng = document.getElementById('shop_longitude');

  if (shop_lat && shop_lng) {
    shop_lat.value = lat;
    shop_lng.value = lng;
  }

  afterGettingLocation(lat, lng);
}

function getPlaceData() {
  var place = autocomplete.getPlace();
  console.log(place);

  for (var component in componentForm) {
    console.log(component);
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

$(document).on('click', '#getLocation', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      afterGettingLocation(geolocation.lat, geolocation.lng);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    }, function (error) {
      console.log(error);
    });
  }
});

function afterGettingLocation(lat, long) {
  if(document.getElementById('nearby_stores')) {
    $.get("/nearby?lat="+lat+"&long="+long, function (data, status) {
      document.getElementById('nearby_stores').innerHTML = data;
    });
  }
}
