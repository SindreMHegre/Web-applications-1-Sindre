import { Link } from 'react-router-dom';

function Filters() {
  return(
        <div className="col-4 d-md-block collapse" id="sidebar">
          <Link to="/"><button className={`btn btn-primary filter-button`} id="allFilter" >All</button></Link>
          <Link to="/films/filter/favorites"><button className={`btn btn-primary filter-button`} id="favoriteFilter">Favorites</button></Link>
          <Link to="/films/filter/best"><button className={`btn btn-primary filter-button`} id="topRatedFilter">Top Rated</button></Link>
          <Link to="/films/filter/last_month"><button className={`btn btn-primary filter-button`} id="lastMonthFilter">Seen last Month</button></Link>
          <Link to="/films/filter/not_seen"><button className={`btn btn-primary filter-button`} id="notWatchedFilter">Not watched</button></Link>
        </div>
  )
}

  export default Filters;