// Exercise 2: My users list
"use strict";

let users = "Sindre Meyre Hegre, Kristoffer Sunde Møvik, Peder Rastad Basmo";
users = users.split(", ");

console.log(users);

let user_acronyms = [];
for (let user of users){
    let acronym = "";
    let names = user.split(" ");
    for (let name of names){
        acronym += name[0];
    }
    acronym.toUpperCase();
    user_acronyms.push(acronym);
}

user_acronyms.sort();
console.log(user_acronyms);