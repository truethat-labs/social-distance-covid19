$(document).ready(function () {
  $('.count').prop('disabled', true);
  $(document).on('click', '.plus', function () {
    var max = parseInt($('.count').attr('max'));
    if (parseInt($('.count').val()) < max) {
      var count = parseInt($('.count').val()) + 1;
      $('.count').val(count);
      updateCounter(count);
    }
  });
  $(document).on('click', '.minus', function () {
    $('.count').val(parseInt($('.count').val()) - 1);
    if ($('.count').val() == -1) {
      $('.count').val(0);
    }
    var count = $('.count').val();
    updateCounter(count)
  });

  $(document).on('change', '#shop_open_status_toggle', function () {
    var status = $('#shop_open_status_toggle').is(':checked');
    $.ajax({
      url: '/update_current.json',
      type: 'PUT',
      data: "shop[open]="+status,
      success: function (data) {
        console.log(data);
      }
    });
  });
});

function updateCounter(count) {
  $.ajax({
    url: '/update_current.json',
    type: 'PUT',
    data: "shop[in_store]=" + count,
    success: function (data) {
      console.log(data);
    }
  });
}
