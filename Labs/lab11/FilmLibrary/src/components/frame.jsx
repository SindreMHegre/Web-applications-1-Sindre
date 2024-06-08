import { useNavigate } from 'react-router-dom';

function TopBar() {
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
            <button className="navbar-toggler d-md-none square-button" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
              <i className="bi bi-list"></i>
            </button>
          </div>
          <h1 className="col text-center d-none d-md-block">
            <input type="text" id="search" name="search" placeholder="Search"></input>
          </h1>
          <h1 className="col text-end">
            <button type="button" className="btn btn-primary square-button">
              <i className="bi bi-person-circle"></i>
            </button>
          </h1>
        </div>
      </div>
    )
}

function BottomButton() {
return (
    <>
    <div className="container-fluid">
        <div className="row">
        <div className="col text-end bottom-button">
            <button type="button" className="btn btn-primary square-button bottom" id='add-button' onClick={() => {
            }}>
            <i className="bi bi-plus"></i>
            </button>
        </div>
        </div>
    </div>
    </>
)
}

export {TopBar, BottomButton};