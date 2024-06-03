import PropTypes from 'prop-types';
import {FilmLibrary, Film} from '../scripts/lab9';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function FilmList(props) {
    let films = []
    props.filmLibrary.films.map((film) => {
      films.push(<FilmDisplay key={film.id} film={film} onRatingChange={props.onRatingChange}
      onEditableFilmChange={props.onEditableFilmChange} onDeleteFilm={props.onDeleteFilm}
      onChangeFilmFavorite={props.onChangeFilmFavorite} onChangeFilmRating={props.onChangeFilmRating}>
      </FilmDisplay>)
    });
    return(
      <>
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Favorite</th>
                <th>Watch Date</th>
                <th>Rating</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody id="film-table-body">
              {films}
            </tbody>
          </table>
        </div>
      </>
    )
  }
  FilmList.propTypes = {
    filmLibrary: PropTypes.instanceOf(FilmLibrary).isRequired,
    onRatingChange: PropTypes.func.isRequired,
    onEditableFilmChange: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
    onChangeFilmFavorite: PropTypes.func.isRequired,
    onChangeFilmRating: PropTypes.func.isRequired
  };

  function FilmDisplay(props) {
    const navigate = useNavigate();
    let formattedDate = "Not seen";
    if (props.film.date !== "Not seen" && props.film.date.isValid()) {
      formattedDate = dayjs(props.film.date).format('MMMM D, YYYY');
    }
    const handleRatingChange = (newRating) => {
      props.onChangeFilmRating(props.film.id, newRating);
    };

    const rating = props.film.rating || 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <i
            key={i}
            className="bi bi-star-fill rating"
            onClick={() => handleRatingChange(i + 1)}
          ></i>
        );
      } else {
        stars.push(
          <i
            key={i}
            className="bi bi-star rating"
            onClick={() => handleRatingChange(i + 1)}
          ></i>
        );
      }
    }

    return (
      <>
        <tr>
          <td>{props.film.title}</td>
          <td>
            <input type="checkbox" id="favorite" name="favorite" checked={props.film.favorite}
            onChange={(event) => {props.onChangeFilmFavorite(props.film.id, event.target.checked)}}></input>
            <label htmlFor="favorite">Favorite</label>
          </td>
          <td>
            <div> {formattedDate} </div>
          </td>
          <td>
            <div> {stars} </div>
          </td>
          <td>
            {/* TODO: Why is this button so unresponsive */}
            <button type="button" className="btn btn-primary">
              <i className="bi bi-pen editButton" data-filmid={props.film.id} onClick={() => {
                props.onEditableFilmChange(props.film);
                props.onRatingChange(props.film.rating);
                navigate(`/films/change/${props.film.id}`)
              }}></i>
            </button>
            <button type="button" className="btn btn-danger deleteButton" data-filmid={props.film.id}
            onClick={() => {props.onDeleteFilm(props.film.id)}}>
              <i className="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </>
  )
  }
  FilmDisplay.propTypes = {
    film: PropTypes.instanceOf(Film).isRequired,
    onRatingChange: PropTypes.func.isRequired,
    onEditableFilmChange: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
    onChangeFilmFavorite: PropTypes.func.isRequired,
    onChangeFilmRating: PropTypes.func.isRequired
  };

  export default FilmList;