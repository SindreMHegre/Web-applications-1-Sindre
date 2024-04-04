// Lab 1 in the course Web applications 1 at politecnio di Torino
"use strict"
const dayjs = require('dayjs');
const sqlite3 = require('sqlite3');
const express = require('express');
const morgan = require('morgan');
const {Film, FilmLibrary} = require('./models.js');
const dao = require('./dao.js');


const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/films', (req, res) => {
    dao.getFilms().then((films) => {
        res.json(films);
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.get('/films/filter', (req, res) => {
    const filter = req.query.filter;
    if (filter === 'favorites') {
        dao.getFavorites().then((films) => {
            res.json(films);
        }).catch((err) => {
            res.status(500).json({error: err});
        });
    }else if (filter === 'best') {
        dao.getFilmsRatedOver(4).then((films) => {
            res.json(films);
        }).catch((err) => {
            res.status(500).json({error: err});
        });
    }else if (filter === 'last_month') {
        dao.getFilmsWatchedLAterThan(dayjs().subtract(1, 'month')).then((films) => {
            res.json(films);
        }).catch((err) => {
            res.status(500).json({error: err});
        });
    }else if (filter === 'not_seen') {
        dao.getFilmsNotSeen().then((films) => {
            res.json(films);
        }).catch((err) => {
            res.status(500).json({error: err});
        });
    }else{res.status(400).json({error: 'Invalid filter'});}
});

app.get('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    dao.getFilmById(id).then((film) => {
        res.json(film);
    }).catch((err) => {
        res.status(404).json({error: err});
    });
});

app.post('/films', (req, res) => {
    const film = req.body;
    dao.addFilm(film).then((id) => {
        res.status(201).json({id: id});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.listen(3000, () => {console.log('Server is running on port 3000');});


// let library = new FilmLibrary();
// library.getFilms().then((films) => {
//     for (const film of films){
//         library.addNewFilm(film);
//         film.print();
//     }
//     console.log(JSON.stringify(library));
// });

// const film1 = new Film(1, "The Shawshank Redemption", "2024-09-23", 5, true, 1);
