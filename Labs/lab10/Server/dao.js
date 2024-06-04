// Data access object for the films database
const dayjs = require('dayjs');
const sqlite3 = require('sqlite3');
const {Film} = require('./models.js');

const db = new sqlite3.Database("films.sqlite", sqlite3.OPEN_READWRITE, (err) => {if (err) throw err;});

//Queries: SELECT, FROM, INSERT, WHERE, UPDATE, DELETE, ORDER BY, LIMIT, CREATE TABLE
// Get all films
const getFilms = function(){
    const films = new Promise ((resolve, reject) => {
        let film_array = [];
        db.each(`SELECT * FROM films`, (err, row) => {
            if (err) reject(err);
            else {
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                film_array.push(film);}
        }, (err) => {
            if (err) reject(err);
            else if (film_array.length === 0) reject("No films found");
            else resolve (film_array);
        });
    })
    return films;
}
// Get all favorites
const getFavorites = function(){
    let favorite_films = new Promise ((resolve, reject) => {
        let favorites_array = [];
        db.each(`SELECT * FROM films WHERE isFavorite=true`, (err, row) =>{
            if (err) reject(err);
            else{
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                favorites_array.push(film);}
        }, (err) => {
            if (err) reject(err);
            else if (favorites_array.length === 0) reject("No favorites found");
            else resolve (favorites_array);
        });
    });
    return favorite_films;
}
// Get all films watched today
const getFilmsWatchedToday = function(){
    const films = new Promise ((resolve, reject) => {
        let film_array = [];
        const today = dayjs().format('YYYY-MM-DD');
        db.each(`SELECT * FROM films WHERE watchDate = ?`, [today], (err, row) => {
            if (err) reject(err);
            else {
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                film_array.push(film);
            }
        }, (err) => {
            if (err) reject(err);
            else if (film_array.length === 0) reject("No films watched today found");
            else resolve(film_array);
        });
    });
    return films;
}
// Get all films watched earlier than a given date
const getFilmsWatchedEarlierThan = function(date){
    const films = new Promise ((resolve, reject) =>{
        let film_array = [];
        const before_date = dayjs(date).format('YYYY-MM-DD');
        db.each(`SELECT * FROM films WHERE watchDate < ?`, [before_date], (err, row) => {
            if (err) reject(err);
            else {
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                film_array.push(film);
            }
        }, (err) => {
            if (err) reject(err);
            else if (film_array.length === 0) reject("Could not find any films watched before this date");
            else resolve(film_array);
        })
    });
    return films;
}
// Get all films watched later than a given date
const getFilmsWatchedLaterThan = function(date){
    const films = new Promise ((resolve, reject) =>{
        let film_array = [];
        const after_date = dayjs(date).format('YYYY-MM-DD');
        db.each(`SELECT * FROM films WHERE watchDate > ?`, [after_date], (err, row) => {
            if (err) reject(err);
            else {
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                film_array.push(film);
            }
        }, (err) => {
            if (err) reject(err);
            else if (film_array.length === 0) reject(`Could not find any films watched after this date: ${date}`);
            else resolve(film_array);
        })
    });
    return films;
}
// Get all films that are not seen yet
const getFilmsNotSeen = function(){
    const films = new Promise((resolve, reject) => {
        let film_array = [];
        db.each(`SELECT * FROM films WHERE watchDate IS NULL`, (err, row) => {
            if (err) reject(err);
            else {
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                film_array.push(film);
            }
        }, (err) => {
            if (err) reject(err);
            else if (film_array.length === 0) reject("Could not find any unseen films");
            else resolve(film_array);
        });
    });
    return films;
}
// Get all films rated over a given rating
const getFilmsRatedOver = function(rating){
    let film_array = [];
    const films = new Promise((resolve, reject) => {
        db.each(`SELECT * FROM films WHERE rating > ?`, [rating], (err, row) =>{
            if (err) reject(err);
            else{
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                film_array.push(film);
            }
        }, (err)=> {
            if (err) reject(err);
            else if (film_array.length === 0) reject("No films rated over this rating found");
            else resolve(film_array);
        });
    });
    return films;
}
// Get all films containing a given string
const getFilmsContaining = function(string){
    let film_array = [];
    const films = new Promise((resolve, reject) => {
        db.each(`SELECT * FROM films WHERE title LIKE ?`, [`%${string}%`], (err, row) =>{
            if (err) reject(err);
            else{
                const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
                film_array.push(film);
            }
        }, (err)=> {
            if (err) reject(err);
            else if (film_array.length === 0) reject("No films containing this string found");
            else resolve(film_array);
        });
    });
    return films;
}
// Get a film given an id
const getFilmById = function(id){
    return new Promise((resolve, reject) => {
        if (!Number.isInteger(id)) {
            reject("ID is not an integer");
            return;
        }
        db.get(`SELECT * FROM films WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else if (!row) {
                reject("Film with ID does not exist in the database");
                return;
            }
            const film = new Film(row.id, row.title, row.watchDate, row.rating, row.isFavorite, row.userId);
            resolve(film);
        });
    });
}

// Add a film to the database
const addFilm = function(f){
    const sql = `INSERT into films(title, watchDate, rating, isFavorite, userId)
    values(?, ?, ?, ?, ?)`
    const sql_user = `SELECT * FROM users WHERE id = ?`;
    const new_film = new Promise((resolve, reject) =>{
        db.get(sql_user, [f.user], (err, row) => {
            if (err) {console.log(err); reject(err);}
            else if (!row) {
                console.log("User with ID does not exist in the database, setting user to 1");
                f.user = 1;
            }
        });
        db.run(sql, [f.title, f.date, f.rating, f.favorite, f.user], (err) =>{
            if (err) reject(err);
            else {
                console.log("Film added to database");
                resolve(`${f.title} added to database`);}
        });
        console.log("In dao.js after db.run")
    });
    return new_film;
}
// Update a film in the database
const updateFilm = function(f){
    return new Promise((resolve, reject) => {
        if (!Number.isInteger(f.id)) {
            reject("ID is not an integer");
            return;
        }
        db.get(`SELECT * FROM films WHERE id = ?`, [f.id], (err, row) => {
            if (err) reject(err);
            else if (!row) {
                reject("Film with ID does not exist in the database");
                return;
            }
            const sql = `UPDATE films SET title = ?, watchDate = ?, rating = ?, isFavorite = ?, userId = ? WHERE id = ?`;
            db.run(sql, [f.title, f.date, f.rating, f.favorite, f.user, f.id], (err) => {
                if (err) reject(err);
                else {console.log("Film updated in database"); resolve(f);}
            });
        });
    });
}
// Delete a film in the database
const deleteFilm = function(id){
    return new Promise((resolve, reject) => {
        if (!Number.isInteger(id)) {
            reject("ID is not an integer");
            return;
        }
        db.get(`SELECT * FROM films WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else if (!row) {
                reject("Film with ID does not exist in the database");
                return;
            }
            const sql = `DELETE FROM films WHERE id = ?`;
            db.run(sql, [id], (err) => {
                if (err) reject(err);
                else {console.log("Film deleted from database"); resolve("Deleted");}
            });
        });
    });
}
// Remove the watch dates from all films
const removeWatchDates = function(){
    return new Promise((resolve, reject) => {
        const sql = `UPDATE films SET watchDate = NULL`;
        db.run(sql, (err) => {
            if (err) reject(err);
            else resolve("Watch dates removed");
        });
    });
}

module.exports = {getFilms
                ,getFavorites
                ,getFilmsWatchedToday
                ,getFilmsWatchedEarlierThan
                ,getFilmsWatchedLaterThan
                ,getFilmsNotSeen
                ,getFilmsRatedOver
                ,getFilmsContaining
                ,getFilmById
                ,addFilm
                ,updateFilm
                ,deleteFilm
                ,removeWatchDates};