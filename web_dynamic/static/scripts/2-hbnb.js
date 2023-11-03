$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status/',
    // url: 'https://hellosalut.stefanbohacek.dev/?lang=fr',
    success: function () {
      $('DIV#api_status').addClass('available')
      alert('YES');
    }
  });
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
});
