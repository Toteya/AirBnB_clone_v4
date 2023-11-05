$(document).ready(function () {
  let stateIds = [];
  let cityIds = [];
  let locationNames = [];
  let amenityIds = [];
  let amenityNames = [];
  // Update list of amenities based on checkboxes
  $('input.amenity').on('click', function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (!(amenityIds.includes(id))) {
      amenityIds.push(id);
      amenityNames.push(name);
    } else {
      amenityIds = amenityIds.filter(val => val !== id);
      amenityNames = amenityNames.filter(val => val !== name);
    }
    let str = '';
    for (const item of amenityNames) {
      str = str + item + ',&nbsp;';
    }
    $('div.amenities > h4').html(str);
  });
  // Update list of checked states
  $('input.state').on('click', function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (!(stateIds.includes(id))) {
      stateIds.push(id);
      locationNames.push(name);
    } else {
      stateIds = stateIds.filter(val => val !== id);
      locationNames = locationNames.filter(val => val !== name);
    }
    updateLocationsList();
  });
  // Update list of checked cities
  $('input.cities').on('click', function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (!(cityIds.includes(id))) {
      cityIds.push(id);
      locationNames.push(name);
    } else {
      cityIds = cityIds.filter(val => val !== id);
      locationNames = locationNames.filter(val => val !== name);
    }
    updateLocationsList();
  });
  function updateLocationsList () {
    let str = '';
    for (const item of locationNames) {
      str = str + item + ',&nbsp;';
    }
    $('div.locations > h4').html(str);
  }
  // Check if API status is available
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status/',
    success: function () {
      $('DIV#api_status').addClass('available');
    }
  });

  // Retrieve all Places from API
  placesPostRequest();

  // Filter Places Search based on selected Amenity
  $(':button').on('click', function () {
    const payload = { states: stateIds, cities: cityIds, amenities: amenityIds };
    const jsonData = JSON.stringify(payload);
    placesPostRequest(jsonData);
  });

  function placesPostRequest (data = '{}') {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data,
      contentType: 'application/json',
      success: function (places) {
        $('section.places').empty();
        for (const place of places) {
          const article = $('<article></article>');
          // title
          const titleBox = $('<div></div>');
          const name = $('<h2></h2>');
          const price = $('<div></div>');
          titleBox.addClass('title_box');
          name.text(place.name);
          price.addClass('price_by_night');
          price.text('$' + place.price_by_night);
          titleBox.append(name, price);
          article.append(titleBox);
          // information
          const information = $('<div></div>');
          const maxGuest = $('<div></div>');
          const numRooms = $('<div></div>');
          const numBathrooms = $('<div></div>');
          let str;
          information.addClass('information');
          maxGuest.addClass('max_guest');
          str = place.max_guest === 1 ? 'Guest' : 'Guests';
          maxGuest.text(place.max_guest + ' ' + str);

          numRooms.addClass('number_rooms');
          str = place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms';
          numRooms.text(place.number_rooms + ' ' + str);

          numBathrooms.addClass('number_bathrooms');
          str = place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms';
          numRooms.text(place.number_bathrooms + ' ' + str);
          information.append(maxGuest, numRooms, numBathrooms);
          article.append(information);
          // Description
          const description = $('<div></div>');
          description.addClass('description');
          description.html(place.description);
          article.append(description);
          // Add article element to section
          $('section.places').append(article);
        }
        // alert($('places').text());
      }
    });
  }
});
