// Lab 1 in the course Web applications 1 at politecnio di Torino
"use strict"
const dayjs = require('dayjs');
const sqlite3 = require('sqlite3');

//Task 1
function Film(id, title, date, rating, favorite=false, user=1){
    this.id =id;
    this.title =title;
    this.favorite = favorite;
    this.user = user;
    if (date !== undefined) {this.date = dayjs(date);}
    if (rating !== undefined && rating !== null) {
        if(rating >= 1 && rating <= 5) {this.rating = rating;}
        else{throw("Rating must be between 1 and 5");}
    }
    this.print = function(){
        let formattedDate = "Not watched yet, ";
        let rating_string = "";
        if (this.date !== undefined) {
            formattedDate = `Watch date: ${this.date.format('MMMM D, YYYY')}, `;
        }if (this.rating) {rating_string = `Rating: ${this.rating}, `;}
        console.log(`ID: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, ${formattedDate}${rating_string}User: ${this.user}`);
    }
}

function FilmLibrary(...array_of_films){
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
        for(let i = 0; i < this.films.length; i++){
            //this.films[i].date = undefined;
            delete this.films[i].date
        }
    }
    this.getRated = function(){
        let rated_films = [];
        for(let i = 0; i < this.films.length; i++){
            if (this.films[i].rating !== undefined){
                rated_films.push(this.films[i]);
            }
        }
        rated_films.sort((a, b) => b.rating-a.rating);
        return rated_films;
    }
    //Queries: SELECT, FROM, INSERT, WHERE, UPDATE, DELETE, ORDER BY, LIMIT, CREATE TABLE
    this.getFilmsFromDB = function(database){
        let db = new sqlite3.Database(database, sqlite3.OPEN_READWRITE,
            (err) => {if (err) throw err;});
        db.serialize(() => {
            db.each(`SELECT * FROM films`, (err, row) => {
                if (err) {throw err;}
                let film = new Film(row.id, row.title, row.date, row.rating, row.favorite, row.user);
                this.addNewFilm(film);
            }, (err, count) => { // Add a completion callback to db.each
                if (err) throw err;
                db.close(); // Close the database after all rows have been processed
            });
        });
    }
}

let library = new FilmLibrary();
library.getFilmsFromDB("films.sqlite");

// library.sortByDate();
// library.deleteFilm(4);
// library.resetWatchedFilms();
// library.films = library.getRated();

setTimeout(() => {
    for (const film of library.films){
        film.print();
    }
}, 1000)