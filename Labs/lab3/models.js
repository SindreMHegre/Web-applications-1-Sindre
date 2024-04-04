const dayjs = require('dayjs');


function Film(id, title, date, rating, favorite=false, user=1){
    this.id =id;
    this.title =title;
    this.favorite = Boolean(favorite);
    this.user = user;
    this.date = "Not seen";
    this.rating = "Not rated";
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
    // Get the FilmLibrary in a JSON format
    this.libraryToJSON = function(){
        let json_array = [];
        for (const film of this.films) {
            json_array.push(film.filmToJSON());
        }
        json_array = {
            "FilmLibrary": json_array
        }
        return JSON.stringify(json_array);
    }
}

module.exports = {Film, FilmLibrary};