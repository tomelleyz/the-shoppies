
function MovieList(props) {

  return (
    <ul>
      {props.movieResults.map((movie, index) => (
				<li key={movie.imdbID}>
					{movie.Title} ({movie.Year})
          <button onClick={() => props.handleButtonClick(movie)}>
            {props.action}
          </button>
				</li>
			))}
    </ul>
  )
}

export default MovieList;