import { useEffect, useState } from 'react'
import './FilmLibraryWebpage.css'
import Filters from './components/filters.jsx'
import {TopBar, BottomButton} from './components/frame.jsx'
import FilmList from './components/filmList.jsx'
import FilmForm from './components/filmForm.jsx'
import LoginForm from './components/login.jsx'
import {Routes, Route, Link, useLocation} from 'react-router-dom'
import API from './API.js'

function FilmLibraryWebpage() {
  const [filmLibrary, setLibrary] = useState(null);
  const [filter, setFilter] = useState('');
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const {pathname} = useLocation();


  const handleLogin = (username, password) => {
    API.userLogin(username, password).then((new_user) => {
      if (new_user){
        setUser(new_user);
        setLoggedIn(true);
        window.location.reload();
      }
      else{throw new Error("Invalid username or password")}
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid username or password2");
      } else {
        console.error(error);
      }
    });
  }

  const handleLogout = () => {
    API.userLogout().then(() => {
      setUser(null);
      setLoggedIn(false);
      window.location.reload();
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    API.getSession().then((user) => {
      setUser(user);
      setLoggedIn(true);
    }).catch((error) => {
      if (!error.message.startsWith("Unexpected")){
        console.error(error);
      }
    });
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/films/filter')) {
      setFilter(pathname.split('/').pop());
  } else if (pathname === '/') {
      setFilter('');
  }
}, [pathname]);

  useEffect(() => {
    if (loggedIn) {
      API.getFilms(filter).then((library) => {setLibrary(library);})
      .catch((error) => {console.error(error);} );
    }
  }, [filter, pathname, loggedIn]);
  return (
    <>
      <TopBar loggedIn={loggedIn} onLogout={handleLogout}/>
      <div className="container-fluid">
        <Routes>
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/" element={
            <div>
            {/* {loggedIn && <div className="row"><div className='alert alert-success'>Welcome {user.name}</div></div>} */}
            <div className="row">
            <Filters/>
            {<FilmList loggedIn={loggedIn} filmLibrary={filmLibrary}></FilmList> }
            </div>
          </div>
          } />
          <Route path="/films/add" element={<div className='row'>
            <FilmForm/>
          </div>} />
          <Route path="/films/filter/:filter" element={
            <div className="row">
              <Filters/>
              {<FilmList loggedIn={loggedIn} filmLibrary={filmLibrary}></FilmList> }
            </div>
          } />
          <Route path="/films/change/:id" element={<div className='row'><FilmForm></FilmForm></div>} />
          <Route path="/login" element={<div className='row'><LoginForm onLogin={handleLogin}/></div>}/>
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
