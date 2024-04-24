$(document).ready(function() {
    $('.date').each(function() {
        if ($(this).data('date') === undefined || $(this).data('date') === null || $(this).data('date') === ''){
            $(this).text('Not seen');
            return;
        }
        var date = $(this).data('date');
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        $(this).text(new Date(date).toLocaleDateString('en-US', options));
    });
});