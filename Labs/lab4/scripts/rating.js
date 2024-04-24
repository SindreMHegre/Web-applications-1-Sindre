$(document).ready(function() {
    $('.stars').each(function() {
      var rating = $(this).data('rating');
      if (rating === undefined) {
        rating = 0;
      }
      for (var i = 0; i < 5; i++) {
        if (i < rating) {
          $(this).append('<i class="bi bi-star-fill"></i>');
        } else {
          $(this).append('<i class="bi bi-star"></i>');
        }
      }
    });
  });