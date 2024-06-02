import {Film} from '../scripts/lab7';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

function FilmForm(props){
    const [title, setTitle] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [watchDate, setWatchDate] = useState('');
    const [user, setUser] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (props.film) {
            let date = props.film.date;
            if (date === 'Not seen') {
                date = '';
            }else if (date !== '' && date.isValid()) {
                date = date.format('YYYY-MM-DD');
            }
            setTitle(props.film.title);
            setFavorite(props.film.favorite);
            setWatchDate(date);
            setUser(props.film.user);
        }
    } , [props.film]);
    const handleSubmit = (event) => {
        let inputWatchDate = watchDate;
        if (watchDate && !/^\d{4}-\d{2}-\d{2}$/.test(watchDate)) {
            setErrorMessage("Invalid date format");
            return;
        }else if (watchDate==='' || watchDate===undefined || watchDate===null){
            inputWatchDate = undefined;
        }
        event.preventDefault();
        const film = new Film(1, title, inputWatchDate, props.rating, favorite, Number(user));
        if (props.state === 'add'){
            props.onAddFilm(film);
        }else if (props.state === 'change'){
            props.onChangeFilm(film);
        }
        props.onRatingChange(0);
        props.onStateChange('show');
    }
    return(
        <div className='col-8 offset-md-4' id='add-film'>
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
                    <StarRating rating={props.rating} onRatingChange={props.onRatingChange}/>
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
                    {(props.state==='add') && <button type="submit" className="btn btn-primary" id='add-film-button'>Add Film</button>}
                    {(props.state==='change') && <button type="submit" className="btn btn-primary" id='change-film-button'>Change Film</button>}
                    <button type="button" className="btn btn-primary offset-md-1" id='cancel-button' onClick={() => {
                        props.onStateChange('show');
                        setErrorMessage("");
                    }}>Cancel</button>
                </div>
            </div>
            <div className='form-group row'>
                {errorMessage && <text className='alert alert-danger'>{errorMessage}</text>}
            </div>
            </form>
        </div>
    )
}
FilmForm.propTypes = {
    onAddFilm: PropTypes.func,
    onChangeFilm: PropTypes.func,
    onRatingChange: PropTypes.func.isRequired,
    rating: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    onStateChange: PropTypes.func.isRequired,
    film: PropTypes.instanceOf(Film)
}

function StarRating(props) {
    const handleRatingChange = (rating) => {
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