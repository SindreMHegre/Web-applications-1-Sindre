import { FilmLibrary, Film } from "./scripts/lab10";

const SERVER_URL = "http://localhost:3000/films";

async function getFilms(filter) {
    let url = SERVER_URL;
    if (filter !== '') {
        url += `/filter?filter=${filter}`;
    }
    const response = await fetch(url);
    const filmArray = await response.json();
    let films = filmArray.map((film) => new Film(film.id, film.title, film.date, film.rating, film.favorite, film.userId));
    return new FilmLibrary(...films);
    }

async function getFilmById(filmId) {
    const response = await fetch(`${SERVER_URL}/${filmId}`);
    const film = await response.json();
    return new Film(film.id, film.title, film.date, film.rating, film.favorite, film.userId);
}

async function addFilm(film) {
    const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(film.filmToJSON())
    });
    const json = await response.json();
    return json;
}

async function changeFilm(film) {
    const response = await fetch(`${SERVER_URL}/${film.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(film.filmToJSON())
    });
    return await response.json();
}

async function deleteFilm(filmId) {
    const response = await fetch(`${SERVER_URL}/${filmId}`, {
        method: 'DELETE'
    });
    return await response.json();
}
async function changeFavorite(filmId, favorite) {
    const response = await fetch(`${SERVER_URL}/${filmId}/favorite`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({favorite})
    });
    return await response.json();
}

async function changeRating(filmId, rating) {
    const response = await fetch(`${SERVER_URL}/${filmId}/rating`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({rating})
    });
    return await response.json();
}

const API = {getFilms, getFilmById, addFilm, changeFilm, deleteFilm, changeFavorite, changeRating};
export default API;