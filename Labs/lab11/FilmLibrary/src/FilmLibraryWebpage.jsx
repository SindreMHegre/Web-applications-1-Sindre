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
  }, [filter, pathname]);
  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <Routes>
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/" element={
            <div className="row">
            <Filters/>
            {filmLibrary && <FilmList filmLibrary={filmLibrary}></FilmList> }
          </div>
          } />
          <Route path="/films/add" element={<div className='row'>
            <FilmForm/>
          </div>} />
          <Route path="/films/filter/:filter" element={
            <div className="row">
              <Filters/>
              {filmLibrary && <FilmList filmLibrary={filmLibrary}></FilmList> }
            </div>
          } />
          <Route path="/films/change/:id" element={<div className='row'><FilmForm></FilmForm></div>} />
        </Routes>
      </div>
      <Routes>
        <Route path='/*' element={
          <Link to="/films/add">
            <BottomButton/>
          </Link>
        } />
        <Route path='/films/add' element={<></>}/>
        <Route path='/films/change/*' element={<></>}/>
      </Routes>
    </>
  )
}

export default FilmLibraryWebpage
