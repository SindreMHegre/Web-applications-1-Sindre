import PropTypes from 'prop-types';
import {FilmLibrary, Film} from '../scripts/lab6';
import dayjs from 'dayjs';

function FilmList(props) {
    let filteredFilms = [];
    if (props.filter === 'allFilter') {filteredFilms = props.filmLibrary.films;
    } else if (props.filter === 'favoriteFilter') {filteredFilms = props.filmLibrary.getFavorites();
    } else if (props.filter === 'topRatedFilter') {filteredFilms = props.filmLibrary.getTopRated();
    } else if (props.filter === 'lastMonthFilter') {filteredFilms = props.filmLibrary.getWatchedLastMonth();
    } else if (props.filter === 'notWatchedFilter') {filteredFilms = props.filmLibrary.getNotWatched();}
    let films = [];
    filteredFilms.map((film) => {
      films.push(<FilmDisplay key={film.id} film={film}></FilmDisplay>)
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
    filter: PropTypes.string.isRequired
  };

  function FilmDisplay(props) {
    let formattedDate = "Not seen";
    if (props.film.date !== "Not seen" && props.film.date.isValid()) {
      formattedDate = dayjs(props.film.date).format('MMMM D, YYYY');
    }
    const rating = props.film.rating || 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }

    return (
      <>
        <tr>
          <td>{props.film.title}</td>
          <td>
            <input type="checkbox" id="favorite" name="favorite" checked={props.film.favorite}></input>
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
              <i className="bi bi-pen editButton" data-filmid={props.film.id}></i>
            </button>
            <button type="button" className="btn btn-danger deleteButton" data-filmid={props.film.id}>
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