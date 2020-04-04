google.maps.event.addDomListener(window, 'load', initAutocomplete);

var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
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
}

function getSelectedLocation() {
  var place = autocomplete.getPlace();
  var lat = place.geometry.location.lat(),
    lng = place.geometry.location.lng();
  console.log(lat, lng);
  afterGettingLocation(lat, lng);
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

function afterGettingLocation() {
  // hit the api and get the shops
}
