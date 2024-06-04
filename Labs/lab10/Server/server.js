// Lab 1 in the course Web applications 1 at politecnio di Torino
"use strict"
const dayjs = require('dayjs');
const express = require('express');
const morgan = require('morgan');
const {Film} = require('./models.js');
const dao = require('./dao.js');
const cors = require('cors');


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

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
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
        });
    }else if (filter === 'best') {
        dao.getFilmsRatedOver(4).then((films) => {
            res.json(films);
        }).catch((err) => {
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
        });
    }else if (filter === 'last_month') {
        dao.getFilmsWatchedLaterThan(dayjs().subtract(1, 'month')).then((films) => {
            res.json(films);
        }).catch((err) => {
            console.log(err);
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
        });
    }else if (filter === 'not_seen') {
        dao.getFilmsNotSeen().then((films) => {
            res.json(films);
        }).catch((err) => {
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
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
    const input = req.body;
    const film = new Film(1, input.title, input.watchDate, input.rating, input.favorite, input.userId);
    dao.addFilm(film).then((success) => {
        res.status(201).json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.put('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const input = req.body;
    const film = new Film(id, input.title, input.watchDate, input.rating, input.favorite, input.userId);
    dao.updateFilm(film).then((success) => {
        res.json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.patch('/films/:id/favorite', (req, res) => {
    const id = parseInt(req.params.id);
    const favorite = req.body.favorite;
    dao.getFilmById(id).then((film) => {
        film.favorite = favorite;
        return dao.updateFilm(film);
    }).then((success) => {
        res.json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.patch('/films/:id/rating', (req, res) => {
    const id = parseInt(req.params.id);
    const rating = req.body.rating;
    dao.getFilmById(id).then((film) => {
        film.rating = rating;
        return dao.updateFilm(film);
    }).then((success) => {
        res.json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.delete('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    dao.deleteFilm(id).then((success) => {
        res.json({success});
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
