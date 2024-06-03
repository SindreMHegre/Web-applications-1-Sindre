import { FilmLibrary, Film } from "./scripts/lab9";

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

const API = {getFilms};
export default API;