// Lab 1 in the course Web applications 1 at politecnio di Torino
"use strict"
import dayjs //Should have used mjs as file type

//Task 0
let string_array = ["spring", "it", "cat", "I", "Thank you very much"];
let print_start_end = array_of_strings => {
    for (const string of array_of_strings){
        if (string.length > 1) {
            let new_string = string.slice(0,2) + string.slice(string.length -2, string.length);
            console.log(new_string);
        }else{
            console.log("");
        }
    }
}

print_start_end(string_array);

//Task 1
function Film(id, title, date, rating, favorite=false, user=1){
    this.id =id;
    this.title =title;
    this.favorite = favorite;
    this.user = user;
    if (date !== undefined) {this.date = dayjs(date);}
    if (rating !== undefined) {
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
        this.films.forEach(film => delete film.date);
    }
    this.getRated = function(){
        let rated_films = this.films.filter(film => film.rating !== undefined);
        rated_films.sort((a, b) => b.rating-a.rating);
        return rated_films;
    }
}

let film1 = new Film(1, "The Godfather", "1997-07-11", 4, true, 2);
let film2 = new Film(2, "The Shawshank Redemption", "1994", 3);
let film3 = new Film(3, "The Dark Knight", undefined, 5, true, 3);
let film4 = new Film(4, "The Godfather: Part II", "2023-12-25", 5, undefined, 2);

let library = new FilmLibrary();
library.addNewFilm(film1);
library.addNewFilm(film2);
library.addNewFilm(film3);
library.addNewFilm(film4);

library.sortByDate();
library.deleteFilm(4);
library.resetWatchedFilms();
library.films = library.getRated();
for (const film of library.films){
    film.print();
}
