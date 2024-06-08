import { FilmLibrary, Film } from "./scripts/lab11";

const SERVER_URL = "http://localhost:3000/films";

async function getFilms(filter) {
    let url = SERVER_URL;
    if (filter !== '') {
        url += `/filter?filter=${filter}`;
    }
    const response = await fetch(url, {credentials: 'include'});
    const filmArray = await response.json();
    let films = filmArray.map((film) => new Film(film.id, film.title, film.date, film.rating, film.favorite, film.userId));
    return new FilmLibrary(...films);
    }

async function getFilmById(filmId) {
    const response = await fetch(`${SERVER_URL}/${filmId}`, {credentials: 'include'});
    const film = await response.json();
    return new Film(film.id, film.title, film.date, film.rating, film.favorite, film.userId);
}

async function addFilm(film) {
    const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(film.filmToJSON()),
        credentials: 'include'
    });
    const json = await response.json();
    return json;
}

async function changeFilm(film) {
    const response = await fetch(`${SERVER_URL}/${film.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(film.filmToJSON()),
        credentials: 'include'
    });
    return await response.json();
}

async function deleteFilm(filmId) {
    const response = await fetch(`${SERVER_URL}/${filmId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    return await response.json();
}
async function changeFavorite(filmId, favorite) {
    const response = await fetch(`${SERVER_URL}/${filmId}/favorite`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({favorite}),
        credentials: 'include'
    });
    return await response.json();
}

async function changeRating(filmId, rating) {
    const response = await fetch(`${SERVER_URL}/${filmId}/rating`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({rating}),
        credentials: 'include'
    });
    return await response.json();
}

const API = {getFilms, getFilmById, addFilm, changeFilm, deleteFilm, changeFavorite, changeRating};
export default API;