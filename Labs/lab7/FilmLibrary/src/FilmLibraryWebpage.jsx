import { useEffect, useState } from 'react'
import './FilmLibraryWebpage.css'
import {library} from './scripts/lab7.js'
import Filters from './components/filters.jsx'
import {TopBar, BottomButton} from './components/frame.jsx'
import FilmList from './components/filmList.jsx'
import FilmForm from './components/addFilm.jsx'

function FilmLibraryWebpage() {
  const [filter, setFilter] = useState('allFilter');
  const [filmLibrary, setLibrary] = useState(null);
  const [filmId, setFilmId] = useState(null);
  useEffect(() => {
    setLibrary(library);
  }, []);
  const handleFilterChange = (filter) => {
    setFilter(filter);
  }
  const handleFilmIdChange = (id) => {
    setFilmId(id);
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
          {filmLibrary && filter && <FilmList onFilmIdChange={handleFilmIdChange} filmLibrary={filmLibrary} filter={filter}></FilmList> }
        </div>
        <div className='row'>
          {<FilmForm onChangeFilm={changeFilm} onAddFilm={addFilm}></FilmForm> }
        </div>
      </div>
      <BottomButton />
    </>
  )
}

export default FilmLibraryWebpage
