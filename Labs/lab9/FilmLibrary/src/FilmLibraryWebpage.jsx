import { useEffect, useState } from 'react'
import './FilmLibraryWebpage.css'
import Filters from './components/filters.jsx'
import {TopBar, BottomButton} from './components/frame.jsx'
import FilmList from './components/filmList.jsx'
import FilmForm from './components/filmForm.jsx'
import {Routes, Route, Link, useLocation} from 'react-router-dom'
import API from './API.js'

function FilmLibraryWebpage() {
  const [filmLibrary, setLibrary] = useState(null);
  const [rating, setRating] = useState(0);
  const [editableFilm, setEditableFilm] = useState(null);
  const [filter, setFilter] = useState('');
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/films/filter')) {
      setFilter(pathname.split('/').pop());
  } else if (pathname === '/') {
      setFilter('');
  }
}, [pathname]);

  useEffect(() => {
    API.getFilms(filter).then((library) => {setLibrary(library);})
    .catch((error) => {console.error(error);} );
  }, [filter]);

  const handleRatingChange = (rating) => {
    setRating(rating);
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
    updatedLibrary.changeFilm(film.id, film.title, film.date, film.rating, film.favorite, film.user);
    setLibrary(updatedLibrary);
  }
  const deleteFilm = (id) => {
    let updatedLibrary = {...filmLibrary};
    updatedLibrary.deleteFilm(id);
    setLibrary(updatedLibrary);
  }
  const changeFilmFavorite = (id, bool) => {
    let updatedLibrary = {...filmLibrary};
    let film = updatedLibrary.films.find(film => film.id === id);
    updatedLibrary.changeFilm(film.id, film.title, film.date, film.rating, bool, film.user);
    setLibrary(updatedLibrary);
  }
  const changeFilmRating = (id, rating) => {
    let updatedLibrary = {...filmLibrary};
    let film = updatedLibrary.films.find(film => film.id === id);
    updatedLibrary.changeFilm(film.id, film.title, film.date, rating, film.favorite, film.user);
    setLibrary(updatedLibrary);
  }
  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <Routes>
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/" element={
            <div className="row">
            <Filters/>
            {filmLibrary && <FilmList filmLibrary={filmLibrary} onRatingChange={handleRatingChange}
            onEditableFilmChange={handleEditableFilmChange} onDeleteFilm={deleteFilm}
            onChangeFilmFavorite={changeFilmFavorite} onChangeFilmRating={changeFilmRating}></FilmList> }
          </div>
          } />
          <Route path="/films/add" element={<div className='row'>
            <FilmForm onAddFilm={addFilm} onRatingChange={handleRatingChange}rating={rating}></FilmForm>
          </div>} />
          <Route path="/films/filter/:filter" element={
            <div className="row">
              <Filters/>
              {filmLibrary && <FilmList filmLibrary={filmLibrary} onRatingChange={handleRatingChange}
              onEditableFilmChange={handleEditableFilmChange} onDeleteFilm={deleteFilm}
              onChangeFilmFavorite={changeFilmFavorite} onChangeFilmRating={changeFilmRating}></FilmList> }
            </div>
          } />
          <Route path="/films/change/:id" element={<div className='row'><FilmForm onChangeFilm={changeFilm}
          onRatingChange={handleRatingChange} rating={rating} film={editableFilm}></FilmForm></div>} />
        </Routes>
      </div>
      <Routes>
        <Route path='/*' element={
          <Link to="/films/add">
            <BottomButton onRatingChange={handleRatingChange}></BottomButton>
          </Link>
        } />
        <Route path='/films/add' element={<></>}/>
        <Route path='/films/change/*' element={<></>}/>
      </Routes>
    </>
  )
}

export default FilmLibraryWebpage
