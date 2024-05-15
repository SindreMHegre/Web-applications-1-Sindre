import {Film} from '../scripts/lab7';
import {useState} from 'react';
import PropTypes from 'prop-types';

function AddNewFilm(onAddFilm, rating, onRatingChange, onErrorChange){
    let id = 1;
    let titleElement = document.getElementById('titleForm');
    let title = titleElement ? titleElement.value : '';
    let watchDateElement = document.getElementById('watchDateForm');
    let watchDate = watchDateElement ? watchDateElement.value : undefined;
    let favoriteElement = document.getElementById('favoriteForm');
    let favorite = favoriteElement ? favoriteElement.checked : false;
    let userElement = document.getElementById('userForm');
    let user = userElement ? parseInt(userElement.value) : 1 ;

    if (title === '' || title === null || title === undefined){
        throw("Title is a required field");
    }if (!Number.isInteger(user)){
        throw("User must be an int equal to or bigger than 1")
    }if (!/^\d{4}-\d{2}-\d{2}$/.test(watchDate)){
        watchDate = undefined;
    }

    let newFilm = new Film(id, title, watchDate, rating, favorite, user);
    onAddFilm(newFilm);

    titleElement.value = null;
    onRatingChange(0);
    watchDateElement.value = null;
    favoriteElement.checked = false;
    userElement.value = null;
    onErrorChange("")
}

function ChangeFilm(onChangeFilm, rating, onRatingChange, onErrorChange){
    const id = 1;
    let titleElement = document.getElementById('titleForm');
    let title = titleElement ? titleElement.value : '';
    let watchDateElement = document.getElementById('watchDateForm');
    let watchDate = watchDateElement ? watchDateElement.value : undefined;
    let favoriteElement = document.getElementById('favoriteForm');
    let favorite = favoriteElement ? favoriteElement.checked : false;
    let userElement = document.getElementById('userForm');
    let user = userElement ? parseInt(userElement.value) : 1 ;

    if (title === '' || title === null || title === undefined){
        throw("Title is a required field");
    }if (!Number.isInteger(user)){
        throw("User must be an int equal to or bigger than 1")
    }if (!/^\d{4}-\d{2}-\d{2}$/.test(watchDate)){
        watchDate = undefined;
    }

    let updatedFilm = new Film(id, title, watchDate, rating, favorite, user);
    onChangeFilm(updatedFilm);

    titleElement.value = null;
    onRatingChange(0);
    watchDateElement.value = null;
    favoriteElement.checked = false;
    userElement.value = null;
    onErrorChange("")
}



function FilmForm(props){
    const [rating, setRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("")
    const handleRatingChange = (rating) => {
        setRating(rating);
    }
    const handleErrorChange = (error) => {
        setErrorMessage(error);
    }
    return(
        <div className='col-8 offset-md-4 collapse' id='add-film'>
            <form>
            <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="titleForm" name="title"></input>
                </div>
            </div>
            <div className="form-goup row">
                <label htmlFor="favorite" className='col-sm-2 col-form-label'>Favorite:</label>
                <div className='col-sm-2'>
                    <input type="checkbox" className='favorite-checkbox' id="favoriteForm" name="favorite"></input>
                </div>
                <label htmlFor="watchDate" className='offset-md-1 col-sm-2 col-form-label'>Watch Date:</label>
                <div className='col-sm-2'>
                    <input type="date" className="date-input" id="watchDateForm" name="watchDate"></input>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="rating" className="col-sm-2 col-form-label">Rating:</label>
                <div className="col-sm-2">
                    <StarRating rating={rating} onRatingChange={handleRatingChange}/>
                </div>
                <label htmlFor="user" className="offset-md-1 col-sm-2 col-form-label">User:</label>
                <div className="col-sm-2">
                    <input type="number" className="form-control" id="userForm" name="user"></input>
                </div>
            </div>
            <div className="form-group row">
                <div className="offset-4">
                    <button type="button" className="btn btn-primary" id='add-film-button' onClick={() => {
                        try{
                            AddNewFilm(props.onAddFilm, rating, handleRatingChange, handleErrorChange)
                            document.getElementById('add-button').classList.remove('collapse');
                            document.getElementById('add-film').classList.add('collapse');
                        }catch(error){
                            handleErrorChange(error)
                        }
                    }}>Add Film</button>
                    <button type="button" className="btn btn-primary collapse" id='change-film-button' onClick={() => {
                        try{
                            ChangeFilm(props.onChangeFilm, rating, handleRatingChange, handleErrorChange)
                            document.getElementById('add-button').classList.remove('collapse');
                            document.getElementById('add-film').classList.add('collapse');
                        }catch(error){
                            handleErrorChange(error)
                        }
                    }}>Change Film</button>
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
    onAddFilm: PropTypes.func.isRequired,
    onChangeFilm: PropTypes.func.isRequired
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