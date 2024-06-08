import { useNavigate, Route, Routes, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function TopBar(props) {
  const navigate = useNavigate();
    return (
      <div className="container-fluid">
        <div className="row top-row">
          <div className="col">
            <div className="d-none d-md-block">
              <h1 onClick={() => {navigate('/')}}>
                <i className="bi bi-film title-text" onClick={() => {navigate('/')}}></i>
                Film Library
              </h1>
            </div>
            <button className="navbar-toggler d-md-none square-button" type="button"
            data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar"
            aria-expanded="false" aria-label="Toggle navigation">
              <i className="bi bi-list"></i>
            </button>
          </div>
          <h1 className="col text-center d-none d-md-block">
            <input type="text" id="search" name="search" placeholder="Search"></input>
          </h1>
          <h1 className="col text-end">
          <Routes>
            {!props.loggedIn && <Route path='/*' element={
              <Link to="/login">
                 <button type="button" className="btn btn-primary square-button">
                  <i className="bi bi-person-circle"></i>
                </button>
              </Link>
            }/>}
            {props.loggedIn && <Route path='/*' element={
              <Link to ="/">
                <button type="button" className="btn btn-primary" onClick={() => {
                  props.onLogout();
                }
                }>Log out</button>
              </Link>
            }/>}
          </Routes>
          </h1>
        </div>
      </div>
    )
}
TopBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired
}

function BottomButton() {
return (
    <>
    <div className="container-fluid">
        <div className="row">
        <div className="col text-end bottom-button">
            <button type="button" className="btn btn-primary square-button bottom" id='add-button'>
            <i className="bi bi-plus"></i>
            </button>
        </div>
        </div>
    </div>
    </>
)
}

export {TopBar, BottomButton};