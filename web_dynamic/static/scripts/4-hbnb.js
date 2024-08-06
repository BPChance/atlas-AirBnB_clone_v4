$(document).ready(function () {
    let selectedAmenities = {};
  
    $('input[type="checkbox"]').change(function () {
      if (this.checked) {
        selectedAmenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete selectedAmenities[$(this).data('id')];
      }
  
      let amenitiesList = Object.values(selectedAmenities).join(', ');
      $('.amenities h4').text(amenitiesList);
    });
  
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    function fetchPlaces(data) {
      $('section.places').empty();
      data.forEach(function (place) {
        $('section.places').append(`
          <article>
            <div class="title">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest}</div>
              <div class="number_rooms">${place.number_rooms}</div>
              <div class="number_bathrooms">${place.number_bathrooms}</div>
            </div>
            <div class="description">${place.description}</div>
          </article>
        `);
      });
    }
  
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: fetchPlaces
    });
  
    $('button').click(function () {
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
        success: fetchPlaces
      });
    });
  });
  