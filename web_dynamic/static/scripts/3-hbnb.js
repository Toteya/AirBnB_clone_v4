$(document).ready(function () {
  // Update list of amenities based on checkboxes
  let amenityIds = [];
  $('input.amenity').on('click', function () {
    const val = $(this).attr('data-name');
    if (!(amenityIds.includes(val))) {
      amenityIds.push(val);
    } else {
      amenityIds = amenityIds.filter(id => id !== val);
    }
    let str = '';
    for (const id of amenityIds) {
      str = str + id + ', ';
    }
    $('div.amenities > h4').text(str);
  });
  // Check if API status is available
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status/',
    success: function () {
      $('DIV#api_status').addClass('available');
    }
  });
  // Update Places from API
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: function (places) {
      for (const place of places) {
        const article = $('<article></article>');
        // title
        const titleBox = $('<div></div>');
        const name = $('<h2></h2>');
        const price = $('<div></div>');
        titleBox.addClass('title_box');
        name.text(place.name);
        price.addClass('price_by_night');
        price.text(place.price_by_night);
        titleBox.append(name, price);
        article.append(titleBox);
        // information
        const maxGuest = $('<div></div>');
        const numRooms = $('<div></div>');
        const numBathrooms = $('<div></div>');
        let str;
        maxGuest.addClass('max_guest');
        str = place.max_guest === 1 ? 'Guest' : 'Guests';
        maxGuest.text(place.max_guest + ' ' + str);

        numRooms.addClass('number_rooms');
        str = place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms';
        numRooms.text(place.number_rooms + ' ' + str);

        numBathrooms.addClass('number_bathrooms');
        str = place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms';
        numRooms.text(place.number_bathrooms + ' ' + str);
        article.append(maxGuest, numRooms, numBathrooms);
        // Description
        const description = $('<div></div>');
        description.addClass('description');
        description.text(place.description);
        article.append(description);
        // Add article element to section
        $('section.places').append(article);
      }
      // alert($('places').text());
    }
  });
});
