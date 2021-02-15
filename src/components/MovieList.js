
function MovieList(props) {

  return (
    <div>
      {props.movieResults.map((movie, index) => (
        <div key={movie.imdbID} className='d-flex single-movie-container'>
          <div className='movie-poster-container'>
            <img src={movie.Poster} alt='movie poster' className='movie-poster' />
          </div>
          <div className='d-flex flex-column-wrap justify-content-between single-movie-metadata'>
            <div>
              <p>{movie.Title} ({movie.Year})</p>
            </div>
            <div>
              <div style={{textAlign: 'right'}}>
                <button onClick={() => props.handleButtonClick(movie)}>
                  {props.action}
                </button>
              </div>
            </div>
          </div>
        </div>
			))}
    </div>
  )
}

export default MovieList;