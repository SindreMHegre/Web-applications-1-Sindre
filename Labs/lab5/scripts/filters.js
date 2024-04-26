import { library } from './lab5.js'
import { populateFilmTable } from './populate_films.js';

populateFilmTable(library.films);
addDeleteButtonListeners();

const allFilter = document.getElementById('allFilter');
const favoriteFilter = document.getElementById('favoriteFilter');
const topRatedFilter = document.getElementById('topRatedFilter');
const lastMonthFilter = document.getElementById('lastMonthFilter');
const notWatchedFilter = document.getElementById('notWatchedFilter');
const filters = [allFilter, favoriteFilter, topRatedFilter, lastMonthFilter, notWatchedFilter];
const removeSelected = function(){
    filters.forEach(filter => {
        filter.classList.remove('selected');
    });
}

allFilter.addEventListener('click', function(){
    populateFilmTable(library.films);
    removeSelected();
    allFilter.classList.add('selected');
    addDeleteButtonListeners();
});

favoriteFilter.addEventListener('click', function(){
    const favoriteFilms = library.getFavorites();
    populateFilmTable(favoriteFilms);
    removeSelected();
    favoriteFilter.classList.add('selected');
    addDeleteButtonListeners();
});

topRatedFilter.addEventListener('click', function(){
    const topRatedFilms = library.getTopRated();
    populateFilmTable(topRatedFilms);
    removeSelected();
    topRatedFilter.classList.add('selected');
    addDeleteButtonListeners();
});

lastMonthFilter.addEventListener('click', function(){
    const watchedLastMonthFilms = library.getWatchedLastMonth();
    populateFilmTable(watchedLastMonthFilms);
    removeSelected();
    lastMonthFilter.classList.add('selected');
    addDeleteButtonListeners();
});

notWatchedFilter.addEventListener('click', function(){
    const notWatchedFilms = library.getNotWatched();
    populateFilmTable(notWatchedFilms);
    removeSelected();
    notWatchedFilter.classList.add('selected');
    addDeleteButtonListeners();
});
function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', function(){
            const film = library.films.find(film => film.id === parseInt(deleteButton.dataset.filmId));
            library.deleteFilm(film.id);
            populateFilmTable(library.films);
            addDeleteButtonListeners();
        });
    });
}