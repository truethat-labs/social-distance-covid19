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

$(window).on('load', function () {
  if (document.getElementById('nearby_stores')) {
    var nearby = document.getElementById('nearby_stores');
    if (nearby.innerHTML.length < 10) {
      whenNone();
    }
  }
});

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
      if (data.length < 10) {
        $('#location').val(JSON.stringify({
          lat: lat,
          lng: long
        }));
        whenNone();
      } else {
        document.getElementById('nearby_stores').innerHTML = data;
      }
    });
  }
}

function whenNone() {
  // var location = JSON.parse($('#location').val());
  // var pyrmont = new google.maps.LatLng(location.lat, location.lng);

  // map = new google.maps.Map(document.getElementById('map'), {
  //   center: pyrmont,
  //   zoom: 15
  // });

  // var request = {
  //   location: pyrmont,
  //   radius: 500,
  //   rankby: 'distance',
  //   types: ['grocery_or_supermarket']
  // };

  // service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var data = [];
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      var card = `<div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${results[i].name}</h5>
                      <p class="shop_status" style="font-size: 14px;">
                        <span class="text-danger">Unregistered</span>
                      </p>
                      <p><i>${results[i].vicinity}</i></p>
                      <div>
                        <a href="https://www.google.com/maps/place/?q=place_id:${results[i].place_id}" target="_blank" class="btn btn-outline-primary">Open in maps</a>
                      </div>
                    </div>
                  </div>`;
      data.push(card);
    }
    document.getElementById('nearby_stores').innerHTML = data.join('');
  }
}
