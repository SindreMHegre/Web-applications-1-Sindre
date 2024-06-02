import { useEffect, useState } from 'react'
import './FilmLibraryWebpage.css'
import {library} from './scripts/lab7.js'
import Filters from './components/filters.jsx'
import {TopBar, BottomButton} from './components/frame.jsx'
import FilmList from './components/filmList.jsx'
import FilmForm from './components/filmForm.jsx'

function FilmLibraryWebpage() {
  const [filter, setFilter] = useState('allFilter');
  const [filmLibrary, setLibrary] = useState(null);
  const [filmId, setFilmId] = useState(null);
  const [rating, setRating] = useState(0);
  const [state, setState] = useState('show');
  const [editableFilm, setEditableFilm] = useState(null);
  useEffect(() => {
    setLibrary(library);
  }, []);
  const handleFilterChange = (filter) => {
    setFilter(filter);
  }
  const handleFilmIdChange = (id) => {
    setFilmId(id);
  }
  const handleRatingChange = (rating) => {
    setRating(rating);
  }
  const handleStateChange = (state) => {
    setState(state);
  }
  const handleEditableFilmChange = (film) => {
    setEditableFilm(film);
  }
  const addFilm = (film) => {
    let updatedLibrary = {...filmLibrary};
    updatedLibrary.addNewFilm(film);
    setLibrary(updatedLibrary);
  }
  const changeFilm = (film) => {
    let updatedLibrary = {...filmLibrary};
    updatedLibrary.changeFilm(filmId, film.title, film.date, film.rating, film.favorite, film.user);
    setLibrary(updatedLibrary);
  }
  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          {filter && <Filters onFilterChange={handleFilterChange} filter={filter}></Filters> }
          {filmLibrary && filter && <FilmList onFilmIdChange={handleFilmIdChange}
          filmLibrary={filmLibrary} filter={filter} onRatingChange={handleRatingChange}
          onStateChange={handleStateChange} onEditableFilmChange={handleEditableFilmChange}></FilmList> }
        </div>
        <div className='row'>
          {state==='add' && <FilmForm onAddFilm={addFilm} onRatingChange={handleRatingChange}
          rating={rating} state={state} onStateChange={handleStateChange}></FilmForm> }
          {(state==='change') && <FilmForm onChangeFilm={changeFilm} onRatingChange={handleRatingChange}
          rating={rating} state={state} onStateChange={handleStateChange} film={editableFilm}></FilmForm> }
        </div>
      </div>
      {(state==='show' || state==='change') && <BottomButton onStateChange={handleStateChange}
      onRatingChange={handleRatingChange}></BottomButton>}
    </>
  )
}

export default FilmLibraryWebpage
