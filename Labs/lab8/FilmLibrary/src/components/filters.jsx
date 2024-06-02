import { useParams, Link } from 'react-router-dom';

function Filters() {
  const params = useParams();
  const filter = params.filter ? params.filter : 'allFilter';
  return(
        <div className="col-4 d-md-block collapse" id="sidebar">
          <Link to="/"><button className={`btn btn-primary filter-button ${filter === 'allFilter' ? 'selected' : ''}`} id="allFilter" >All</button></Link>
          <Link to="/films/favorites"><button className={`btn btn-primary filter-button ${filter === 'favorites' ? 'selected' : ''}`} id="favoriteFilter">Favorites</button></Link>
          <Link to="/films/topRated"><button className={`btn btn-primary filter-button ${filter === 'topRated' ? 'selected' : ''}`} id="topRatedFilter">Top Rated</button></Link>
          <Link to="/films/lastMonth"><button className={`btn btn-primary filter-button ${filter === 'lastMonth' ? 'selected' : ''}`} id="lastMonthFilter">Seen last Month</button></Link>
          <Link to="/films/notWatched"><button className={`btn btn-primary filter-button ${filter === 'notWatched' ? 'selected' : ''}`} id="notWatchedFilter">Not watched</button></Link>
        </div>
  )
}

  export default Filters;