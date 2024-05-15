import PropTypes from 'prop-types';

function Filters(props) {
    const handleFilterChange = (filter) => {
      props.onFilterChange(filter);

    }
    return(
          <div className="col-4 d-md-block collapse" id="sidebar">
            <button className={`btn btn-primary filter-button ${props.filter === 'allFilter' ? 'selected' : ''}`} id="allFilter" onClick={() => handleFilterChange('allFilter')} >All</button>
            <button className={`btn btn-primary filter-button ${props.filter === 'favoriteFilter' ? 'selected' : ''}`} id="favoriteFilter" onClick={() => handleFilterChange('favoriteFilter')}>Favorites</button>
            <button className={`btn btn-primary filter-button ${props.filter === 'topRatedFilter' ? 'selected' : ''}`} id="topRatedFilter" onClick={() => handleFilterChange('topRatedFilter')}>Best Rated</button>
            <button className={`btn btn-primary filter-button ${props.filter === 'lastMonthFilter' ? 'selected' : ''}`} id="lastMonthFilter" onClick={() => handleFilterChange('lastMonthFilter')}>Seen last Month</button>
            <button className={`btn btn-primary filter-button ${props.filter === 'notWatchedFilter' ? 'selected' : ''}`} id="notWatchedFilter" onClick={() => handleFilterChange('notWatchedFilter')}>Not watched</button>
          </div>
    )
  }
  Filters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
  };

  export default Filters;