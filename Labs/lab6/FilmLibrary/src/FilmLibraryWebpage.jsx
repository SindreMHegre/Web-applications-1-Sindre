import { useEffect, useState } from 'react'
import './FilmLibraryWebpage.css'
import {library} from './scripts/lab6.js'
import Filters from './components/filters.jsx'
import {TopBar, BottomButton} from './components/frame.jsx'
import FilmList from './components/filmList.jsx'

function FilmLibraryWebpage() {
  const [filter, setFilter] = useState('allFilter');
  const [filmLibrary, setLibrary] = useState(null);
  useEffect(() => {
    setLibrary(library);
  }, []);
  const handleFilterChange = (filter) => {
    setFilter(filter);
  }
  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          {handleFilterChange && <Filters onFilterChange={handleFilterChange} filter={filter}></Filters> }
          {filmLibrary && <FilmList filmLibrary={filmLibrary} filter={filter}></FilmList> }
        </div>
      </div>
      <BottomButton />
    </>
  )
}

export default FilmLibraryWebpage
