import {Film} from '../scripts/lab9';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {useParams, useNavigate} from 'react-router-dom';

function FilmForm(props){
    const params = useParams();
    const state = params.id ? 'change' : 'add';
    const id = params.id ? Number(params.id) : 1;
    const navigate = useNavigate();

    let date = props.film ? props.film.date : '';
    if (date === 'Not seen') {
        date = '';
    }else if (date !== '' && date.isValid()) {
        date = date.format('YYYY-MM-DD');
    }
    const [title, setTitle] = useState(props.film ? props.film.title : '');
    const [favorite, setFavorite] = useState(props.film ? props.film.favorite : false);
    const [watchDate, setWatchDate] = useState(props.film ? date : '');
    const [user, setUser] = useState(props.film ? props.film.user : '');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (event) => {
        let inputWatchDate = watchDate;
        if (watchDate && !/^\d{4}-\d{2}-\d{2}$/.test(watchDate)) {
            setErrorMessage("Invalid date format");
            return;
        }else if (watchDate==='' || watchDate===undefined || watchDate===null){
            inputWatchDate = undefined;
        }
        event.preventDefault();
        const film = new Film(id, title, inputWatchDate, props.rating, favorite, Number(user));
        if (state === 'add'){
            props.onAddFilm(film);
        }else if (state === 'change'){
            props.onChangeFilm(film);
        }
        props.onRatingChange(0);
        navigate(-1);
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
    film: PropTypes.instanceOf(Film)
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