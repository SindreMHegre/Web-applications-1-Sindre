// Lab 1 in the course Web applications 1 at politecnio di Torino
"use strict"
const dayjs = require('dayjs');
const sqlite3 = require('sqlite3');

//Task 1
function Film(id, title, date, rating, favorite=false, user=1){
    this.id =id;
    this.title =title;
    this.favorite = Boolean(favorite);
    this.user = user;
    if (date !== undefined && date !== null) {this.date = dayjs(date);}
    if (rating !== undefined && rating !== null) {
        if(rating >= 1 && rating <= 5) {this.rating = rating;}
        else{throw("Rating must be between 1 and 5");}
    }
    this.print = function(){
        let formattedDate = "Not watched yet, ";
        let rating_string = "";
        if (this.date !== undefined && this.date !== null) {
            formattedDate = `Watch date: ${this.date.format('MMMM D, YYYY')}, `;
        }if (this.rating) {rating_string = `Rating: ${this.rating}, `;}
        console.log(`ID: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, ${formattedDate}${rating_string}User: ${this.user}`);
    }
}

function FilmLibrary(...array_of_films){
    this.films = [].concat(array_of_films);
    this.db = new sqlite3.Database("films.sqlite", sqlite3.OPEN_READWRITE, (err) => {if (err) throw err;});
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
    //Queries: SELECT, FROM, INSERT, WHERE, UPDATE, DELETE, ORDER BY, LIMIT, CREATE TABLE
    this.getFilms = function(){
        const films = new Promise ((resolve, reject) => {
            let film_array = [];
            this.db.each(`SELECT * FROM films`, (err, row) => {
                if (err) reject(err);
                else {
                    const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                    film_array.push(film);}
            }, (err) => {
                if (err) reject(err);
                else resolve (film_array);
            });
        })
        return films;
    }
    this.getFavorites = function(){
        let favorite_films = new Promise ((resolve, reject) => {
            let favorites_array = [];
            this.db.each(`SELECT * FROM films WHERE isFavorite=true`, (err, row) =>{
                if (err) reject(err);
                else{
                    const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                    favorites_array.push(film);}
            }, (err) => {
                if (err) reject(err);
                else resolve (favorites_array);
            });
        });
        return favorite_films;
    }
    this.getFilmsWatchedToday = function(){
        const films = new Promise ((resolve, reject) => {
            let film_array = [];
            const today = dayjs().format('YYYY-MM-DD');
            this.db.each(`SELECT * FROM films WHERE watchDate = ?`, [today], (err, row) => {
                if (err) reject(err);
                else {
                    const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                    film_array.push(film);
                }
            }, (err) => {
                if (err) reject(err);
                else resolve(film_array);
            });
        });
        return films;
    }
    this.getFilmsWatchedEarlierThan = function(date){
        const films = new Promise ((resolve, reject) =>{
            let film_array = [];
            const before_date = dayjs(date).format('YYYY-MM-DD');
            this.db.each(`SELECT * FROM films WHERE watchDate < ?`, [before_date], (err, row) => {
                if (err) reject(err);
                else {
                    const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                    film_array.push(film);
                }
            }, (err) => {
                if (err) reject(err);
                else resolve(film_array);
            })
        });
        return films;
    }
    this.getFilmsRatedOver = function(rating){
        let film_array = [];
        const films = new Promise((resolve, reject) => {
            this.db.each(`SELECT * FROM films WHERE rating > ?`, [rating], (err, row) =>{
                if (err) reject(err);
                else{
                    const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                    film_array.push(film);
                }
            }, (err)=> {
                if (err) reject(err);
                else resolve(film_array);
            });
        });
        return films;
    }
    this.getFilmsContaining = function(string){
        let film_array = [];
        const films = new Promise((resolve, reject) => {
            this.db.each(`SELECT * FROM films WHERE title LIKE ?`, [`%${string}%`], (err, row) =>{
                if (err) reject(err);
                else{
                    const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                    film_array.push(film);
                }
            }, (err)=> {
                if (err) reject(err);
                else resolve(film_array);
            });
        });
        return films;
    }
    this.getLastId = function(){
        const last_id = new Promise((resolve, reject) => {
            this.db.get(`SELECT MAX(id) as last_id FROM films`, (err, row) => {
                if (err) reject(err);
                else resolve(row.last_id)
            });
        });
        return last_id
    }
    this.addFilm = function(f){
        const sql = `INSERT into films(id, title, watchDate, rating, isFavorite, userId)
        values(?, ?, ?, ?, ?, ?)`
        const new_film = new Promise((resolve, reject) =>{
            this.getLastId().then((id) => {
                f.id = id + 1;
                const date = f.date.format('YYYY-MM-DD');
                this.db.run(sql, [f.id, f.title, date, f.rating, f.favorite, f.user], (err) =>{
                    if (err) reject(err);
                    else {console.log("Film added to database"); resolve(f);}
                });
            });
        });
        return new_film;
    }
    this.deleteFilm = function(id){
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(id)) {
                reject("ID is not an integer");
                return;
            }
            this.db.get(`SELECT * FROM films WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                else if (!row) {
                    reject("Film with ID does not exist in the database");
                    return;
                }
                const sql = `DELETE FROM films WHERE id = ?`;
                this.db.run(sql, [id], (err) => {
                    if (err) reject(err);
                    else {console.log("Film deleted from database"); resolve(id);}
                });
            });
        });
    }
    this.removeWatchDates = function(){
        return new Promise((resolve, reject) => {
            const sql = `UPDATE films SET watchDate = NULL`;
            this.db.run(sql, (err) => {
                if (err) reject(err);
                else resolve("Watch dates removed");
            });
        });
    }
}

let library = new FilmLibrary();
// library.getFilmsContaining("S").then((films) => {
//     for (const film of films){
//         library.addNewFilm(film);
//         film.print();
//     }
// });

const film1 = new Film(1, "The Shawshank Redemption", "1994-09-23", 5, true, 1);

library.removeWatchDates().then((string) => {
    console.log(string);
    library.getFilms().then((films) => {
        for (const film of films){
            film.print();
        }
    });
});