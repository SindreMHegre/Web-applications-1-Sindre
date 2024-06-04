import {Film} from '../scripts/lab10';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams, useNavigate} from 'react-router-dom';
import API from '../API.js';

function FilmForm(){
    const [editableFilm, setEditableFilm] = useState(null);
    const params = useParams();
    const state = params.id ? 'change' : 'add';
    const id = params.id ? Number(params.id) : 1;
    const navigate = useNavigate();

    useEffect(() => {
        if (state === 'change') {
            API.getFilmById(id).then((film) => {
                setEditableFilm(film);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id, state]);
    const [title, setTitle] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [watchDate, setWatchDate] = useState('');
    const [user, setUser] = useState('');
    const [rating, setRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const handleRatingChange = (rating) => {
        setRating(rating);
    }
    useEffect(() => {
        if (editableFilm) {
            let date = editableFilm ? editableFilm.date : '';
            if (date === 'Not seen') {
                date = '';
            }else if (date !== '' && date.isValid()) {
                date = date.format('YYYY-MM-DD');
            }
            setTitle(editableFilm.title);
            setFavorite(editableFilm.favorite);
            setWatchDate(date);
            setUser(editableFilm.user);
            setRating(editableFilm.rating);
        }
    }, [editableFilm]);
    const handleSubmit = (event) => {
        event.preventDefault();
        let inputWatchDate = watchDate;
        if (watchDate && !/^\d{4}-\d{2}-\d{2}$/.test(watchDate)) {
            setErrorMessage("Invalid date format");
            return;
        } else if (watchDate && new Date(watchDate) > new Date()) {
            setErrorMessage("Watch date cannot be in the future");
            return;
        } else if (watchDate === '' || watchDate === undefined || watchDate === null) {
            inputWatchDate = undefined;
        }
        const film = new Film(id, title, inputWatchDate, rating, favorite, Number(user));
        if (state === 'add'){
            API.addFilm(film).then(() => {
                handleRatingChange(0);
                navigate(-1);
            }).catch((error) => {
                console.log(error);
                setErrorMessage(error);
                return;
            });
        }else if (state === 'change'){
            API.changeFilm(film).then(() => {
                handleRatingChange(0);
                navigate(-1);
            }).catch((error) => {
                console.log(error);
                setErrorMessage(error);
                return;
            });
        }
    }
    return(
        <div className='col-8' id='add-film'>
            <form onSubmit={handleSubmit}>
            <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="titleForm" name="title" value={title}
                    required={true} minLength={3} onChange={(event) => setTitle(event.target.value)} ></input>
                </div>
            </div>
            <div className="form-goup row">
                <label htmlFor="favorite" className='col-sm-2 col-form-label'>Favorite:</label>
                <div className='col-sm-2'>
                    <input type="checkbox" className='favorite-checkbox' id="favoriteForm" name="favorite"
                    checked={favorite} onChange={(event) => setFavorite(event.target.checked)} ></input>
                </div>
                <label htmlFor="watchDate" className='offset-md-1 col-sm-2 col-form-label'>Watch Date:</label>
                <div className='col-sm-2'>
                    <input type="date" className="date-input" id="watchDateForm" name="watchDate"
                    value={watchDate} onChange={(event) => setWatchDate(event.target.value)}></input>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="rating" className="col-sm-2 col-form-label">Rating:</label>
                <div className="col-sm-2">
                    <StarRating rating={rating} onRatingChange={handleRatingChange}/>
                </div>
                <label htmlFor="user" className="offset-md-1 col-sm-2 col-form-label">User:</label>
                <div className="col-sm-2">
                    <input type="number" className="form-control" id="userForm" name="user" required={true}
                    value={user}
                    onChange={(event) => {
                        const value = event.target.value;
                        if (Number.isInteger(Number(value))) {
                        setUser(value);
                        setErrorMessage(""); // clear the error message
                        } else {
                        setErrorMessage("Input must be an integer");
                        }
                    }}></input>
                </div>
            </div>
            <div className="form-group row">
                <div className="offset-3">
                    {<button type="submit" className="btn btn-primary">
                        {state==='add' ? 'Add Film' : 'Change Film'}
                    </button>}
                    <button type="button" className="btn btn-primary offset-md-1" id='cancel-button' onClick={() => {
                        setErrorMessage("");
                        navigate(-1);
                    }}>Cancel</button>
                </div>
            </div>
            <div className='form-group row'>
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            </div>
            </form>
        </div>
    )
}

function StarRating(props) {
    const handleRatingChange = (rating) => {
        if (props.rating === rating) {
            rating = 0;
        }
        props.onRatingChange(rating);
    }
    const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= props.rating) {
      stars.push(<i key={i} className="bi bi-star-fill rating-input" onClick={() => handleRatingChange(i)}></i>);
    } else {
      stars.push(<i key={i} className="bi bi-star rating-input" onClick={() => handleRatingChange(i)}></i>);
    }
  }

  return (
    <>
      <input type="hidden" value={props.rating} name="rating" />
      <div>{stars}</div>
    </>
  );
}
StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    onRatingChange: PropTypes.func.isRequired
}

export default FilmForm;