//const dayjs = require('dayjs');

export function Film(id, title, date, rating, favorite=false, user=1){
    this.id =id;
    this.title =title;
    this.favorite = Boolean(favorite);
    this.user = user;
    this.date = "Not seen";
    this.rating = "Not rated";
    if (Number.isInteger(id) === false) {throw new Error("ID must be an integer");}
    if (Number.isInteger(user) === false) {throw new Error("User ID must be an integer");}
    if (date !== undefined && date !== null) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(date) && dayjs(date).isValid()) {
            this.date = dayjs(date);
        } else {
            throw new Error("Invalid date format or invalid date. Expected format: YYYY-MM-DD");
        }
    }
    if (rating !== undefined && rating !== null) {
        if(rating >= 1 && rating <= 5 && Number.isInteger(rating)) {this.rating = rating;}
        else{throw("Rating must be an integer between 1 and 5");}
    }
    this.print = function(){
        let formattedDate = "Not watched yet, ";
        let rating_string = "";
        if (this.date !== undefined && this.date !== null && this.date !== "Not seen") {
            formattedDate = `Watch date: ${this.date.format('MMMM D, YYYY')}, `;
        }if (this.rating) {rating_string = `Rating: ${this.rating}, `;}
        console.log(`ID: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, ${formattedDate}${rating_string}User: ${this.user}`);
    }
    this.filmToJSON = function(){
        let formattedDate = "Not seen";
        if (this.date !== undefined && this.date !== null) {
            formattedDate = this.date.format('YYYY-MM-DD');
        }
        return {
            "id": this.id,
            "title": this.title,
            "watchDate": formattedDate,
            "rating": this.rating,
            "favorite": this.favorite,
            "userId": this.user
        }
    }
}

export function FilmLibrary(...array_of_films){
    this.films = [].concat(array_of_films);
    this.addNewFilm = function(film){
        this.films.push(film);
    }
    this.sortByDate = function(){
        this.films.sort((a, b) => {
            if (a.date === undefined) {return 1;}
            if (b.date === undefined) {return -1;}
            return a.date - b.date;
        });
    }
    this.deleteFilm = function(id){
        let index = this.films.findIndex(film => film.id === id);
        if (index !== -1) {this.films.splice(index, 1);}
    }
    this.resetWatchedFilms = function(){
        this.films.forEach(film => delete film.date);
    }
    this.getRated = function(){
        let rated_films = this.films.filter(film => film.rating !== undefined);
        rated_films.sort((a, b) => b.rating-a.rating);
        return rated_films;
    }
    this.getFavorites = function(){
        return this.films.filter(film => film.favorite === true);
    }
    this.getTopRated = function(){
        return this.films.filter(film => film.rating >= 4);
    }
    this.getWatchedLastMonth = function(){
        let last_month = dayjs().subtract(1, 'month');
        return this.films.filter(film => film.date >= last_month);
    }
    this.getNotWatched = function(){
        return this.films.filter(film => film.date === "Not seen");
    }
}

let film1 = new Film(1, "The Godfather", "2024-03-30", 4, true, 2);
let film2 = new Film(2, "The Shawshank Redemption", "2024-04-20", 3);
let film3 = new Film(3, "The Dark Knight", undefined, 5, true, 3);
let film4 = new Film(4, "The Godfather: Part II", "2023-12-25", 5, undefined, 2);

export let library = new FilmLibrary();
library.addNewFilm(film1);
library.addNewFilm(film2);
library.addNewFilm(film3);
library.addNewFilm(film4);
