export function populateFilmTable(films){
    const tableBody = document.getElementById("film-table-body");
    tableBody.innerHTML = '';

    films.forEach(film => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    titleCell.textContent = film.title;
    row.appendChild(titleCell);

    const favoriteCell = document.createElement('td');
    const favoriteInput = document.createElement('input');
    favoriteInput.type = 'checkbox';
    favoriteInput.id = 'favorite';
    favoriteInput.name = 'favorite';
    favoriteInput.checked = film.favorite;
    const favoriteLabel = document.createElement('label');
    favoriteLabel.setAttribute('for', 'favorite');
    favoriteLabel.textContent = 'Favorite';
    favoriteCell.appendChild(favoriteInput);
    favoriteCell.appendChild(favoriteLabel);
    row.appendChild(favoriteCell);

    const dateCell = document.createElement('td');
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    dateDiv.dataset.date = film.date;
    dateCell.appendChild(dateDiv);
    row.appendChild(dateCell);

    const ratingCell = document.createElement('td');
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('stars');
    ratingDiv.dataset.rating = film.rating;
    ratingCell.appendChild(ratingDiv);
    row.appendChild(ratingCell);

    const optionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.classList.add('btn', 'btn-primary');
    const editIcon = document.createElement('i');
    editIcon.classList.add('bi', 'bi-pen', 'editButton');
    editButton.appendChild(editIcon);
    editButton.dataset.filmId = film.id;
    optionsCell.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('btn', 'btn-danger', 'deleteButton');
    deleteButton.dataset.filmId = film.id;
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('bi', 'bi-trash');
    deleteButton.appendChild(deleteIcon);
    optionsCell.appendChild(deleteButton);
    row.appendChild(optionsCell);

    tableBody.appendChild(row);

    });

    $(document).ready(function() {
        $('.date').each(function() {
            let date = dayjs($(this).data('date'));
            if (date === undefined || date === null || date === '' || !date.isValid()){
                $(this).text('Not seen');
            }else{
                var formattedDate = date.format('MMMM D, YYYY');
                $(this).text(formattedDate);
            }
        });
    });

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
}