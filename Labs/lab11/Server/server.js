// Lab 1 in the course Web applications 1 at politecnio di Torino
"use strict"
const dayjs = require('dayjs');
const express = require('express');
const morgan = require('morgan');
const {Film} = require('./models.js');
const dao = require('./dao.js');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

passport.use(new LocalStrategy(function verify(username, password, callback) {
    dao.getUser(username, password).then((user) => {
        if (!user)
            return callback(null, false, { message: 'Incorrect username or password.' });
        return callback(null, user);
    });
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }else {
        return res.status(401).json({error: 'Not authenticated'});
    }
}

app.use(session({
    secret: "Jeg heter Sindre og dette er en hemmelighet",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.authenticate('session'));


app.get('/films', isLoggedIn, (req, res) => {
    dao.getFilms(req.user.id).then((films) => {
        res.json(films);
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.get('/films/filter', isLoggedIn,
//     [
//     check('filter').isIn(['favorites', 'best', 'last_month', 'not_seen'])
// ],
async (req, res) => {
    const filter = req.query.filter;
    if (filter === 'favorites') {
        dao.getFavorites(req.user.id).then((films) => {
            res.json(films);
        }).catch((err) => {
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
        });
    }else if (filter === 'best') {
        dao.getFilmsRatedOver(4, req.user.id).then((films) => {
            res.json(films);
        }).catch((err) => {
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
        });
    }else if (filter === 'last_month') {
        dao.getFilmsWatchedLaterThan(dayjs().subtract(1, 'month'), req.user.id).then((films) => {
            res.json(films);
        }).catch((err) => {
            console.log(err);
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
        });
    }else if (filter === 'not_seen') {
        dao.getFilmsNotSeen(req.user.id).then((films) => {
            res.json(films);
        }).catch((err) => {
            if (err.startsWith('Could not find')) {
                res.json([]);
            }else{res.status(500).json({error: err});}
        });
    }else{res.status(400).json({error: 'Invalid filter'});}
});

app.get('/films/:id', isLoggedIn, (req, res) => {
    const id = parseInt(req.params.id);
    dao.getFilmById(id, req.user.id).then((film) => {
        res.json(film);
    }).catch((err) => {
        res.status(404).json({error: err});
    });
});

app.post('/films', isLoggedIn, (req, res) => {
    const input = req.body;
    const film = new Film(1, input.title, input.watchDate, input.rating, input.favorite, req.user.id);
    dao.addFilm(film).then((success) => {
        res.status(201).json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.put('/films/:id', isLoggedIn, (req, res) => {
    const id = parseInt(req.params.id);
    const input = req.body;
    const film = new Film(id, input.title, input.watchDate, input.rating, input.favorite, req.user.id);
    dao.updateFilm(film, req.user.id).then((success) => {
        res.json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.patch('/films/:id/favorite', isLoggedIn, (req, res) => {
    const id = parseInt(req.params.id);
    const favorite = req.body.favorite;
    dao.getFilmById(id, req.user.id).then((film) => {
        film.favorite = favorite;
        return dao.updateFilm(film, req.user.id);
    }).then((success) => {
        res.json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.patch('/films/:id/rating', isLoggedIn, (req, res) => {
    const id = parseInt(req.params.id);
    const rating = req.body.rating;
    dao.getFilmById(id, req.user.id).then((film) => {
        film.rating = rating;
        return dao.updateFilm(film, req.user.id);
    }).then((success) => {
        res.json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.delete('/films/:id', isLoggedIn, (req, res) => {
    const id = parseInt(req.params.id);
    dao.deleteFilm(id, req.user.id).then((success) => {
        res.json({success});
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {return next(err);}
        if (!user) {return res.status(401).send(info);}
        req.login(user, (err) => {
            if (err) {return next(err);}
            return res.status(201).json(req.user);
        });
    })(req, res, next);
});

app.post('/logout', isLoggedIn, (req, res) => {
    req.logout(() => {
        res.end();
    });
});

app.listen(3000, () => {console.log('Server is running on port 3000');});

