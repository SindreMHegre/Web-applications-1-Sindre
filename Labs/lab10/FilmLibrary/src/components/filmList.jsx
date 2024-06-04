import PropTypes from 'prop-types';
import {FilmLibrary, Film} from '../scripts/lab10';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import API from '../API.js';

function FilmList(props) {
    let films = []
    props.filmLibrary.films.map((film) => {
      films.push(<FilmDisplay key={film.id} film={film}/>)
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
    filmLibrary: PropTypes.instanceOf(FilmLibrary).isRequired
  };

  function FilmDisplay(props) {
    const navigate = useNavigate();
    let formattedDate = "Not seen";
    if (props.film.date !== "Not seen" && props.film.date.isValid()) {
      formattedDate = dayjs(props.film.date).format('MMMM D, YYYY');
    }

    const rating = props.film.rating || 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <i
            key={i}
            className="bi bi-star-fill rating"
            onClick={() => {
              if (rating !== i + 1) {
                API.changeRating(props.film.id, i + 1).then(() => {
                  window.location.reload();
                }).catch((error) => {
                  console.log(error);
                });
              }
            }}
          ></i>
        );
      } else {
        stars.push(
          <i
            key={i}
            className="bi bi-star rating"
            onClick={() => {
              API.changeRating(props.film.id, i + 1).then(() => {
                window.location.reload();
              }).catch((error) => {
                console.log(error);
              });
            }}
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
            onChange={(event) => {
              API.changeFavorite(props.film.id, event.target.checked).then(() => {
                window.location.reload();
              }).catch((error) => {
                console.log(error);
              });}}></input>
            <label htmlFor="favorite">Favorite</label>
          </td>
          <td>
            <div> {formattedDate} </div>
          </td>
          <td>
            <div> {stars} </div>
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              <i className="bi bi-pen editButton" data-filmid={props.film.id} onClick={() => {
                navigate(`/films/change/${props.film.id}`)
              }}></i>
            </button>
            <button type="button" className="btn btn-danger deleteButton" data-filmid={props.film.id}
            onClick={() => {
              API.deleteFilm(props.film.id).then(() => {
                window.location.reload();
            }).catch((error) => {
              console.log(error);
            });}}>
              <i className="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </>
  )
  }
  FilmDisplay.propTypes = {
    film: PropTypes.instanceOf(Film).isRequired
  };

  export default FilmList;