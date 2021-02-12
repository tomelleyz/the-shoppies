import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [movieResults, setMovieResults] = useState([])
  const [nominations, setNominations] = useState([])

  const fetchMovie = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&type=movie&apikey=1d7ef04f`

    const response = await fetch(url)
    const jsonResponse = await response.json();

    if (jsonResponse.Search) {
      setMovieResults(jsonResponse.Search)
    } 
  }

  useEffect(() => {
    fetchMovie(searchValue)
  }, [searchValue])

  const nominateMovie = (movie, event) => {
    const newNominationsList = [...nominations, movie]

    //TODO: Disable button after nomination
    //      Save nominationsList in localStorage
    if (newNominationsList.length < 5) {
      setNominations(newNominationsList)
    } else if (newNominationsList.length === 5) {
      setNominations(newNominationsList)
      setTimeout(() => alert('Nominations are complete! You can only nominate 5 movies.'), 300)
    } else {
      alert('Nominations are complete! You can only nominate 5 movies.')
    }
  }

  const removeNomination = (movie) => {
    const newNominationsList = nominations.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    )

    setNominations(newNominationsList)
  }

  return (
    <div className='app-container'>
      <h1>The Shoppies</h1>
      <SearchBox inputValue={searchValue} setSearchValue={setSearchValue} />

      <div className='d-flex flex-row-wrap justify-content-between align-items-start movies-and-nominations-container'>
        <div className='card movies-results-container'>
          <h4 className='mt-0'>Results for "{searchValue}"</h4>
          <MovieList 
            movieResults={movieResults} 
            handleButtonClick={nominateMovie}
            action='Nominate'
          />
        </div>
        <div className='card nominations-container'>
          <h4 className='mt-0'>Nominations</h4>
          <MovieList 
            movieResults={nominations} 
            handleButtonClick={removeNomination}
            action='Remove'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
