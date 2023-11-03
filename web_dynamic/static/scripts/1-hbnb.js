$(document).ready(function () {
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
