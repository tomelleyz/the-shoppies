import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import LoadingSkeleton from './components/LoadingSkeleton';

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [movieResults, setMovieResults] = useState([])
  const [nominations, setNominations] = useState([])
  const [areMoviesLoaded, setAreMoviesLoaded] = useState(false)

  const fetchMovie = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&type=movie&apikey=1d7ef04f`

    const response = await fetch(url)
    const jsonResponse = await response.json();

    if (jsonResponse.Search) {
      setMovieResults(jsonResponse.Search)
      setAreMoviesLoaded(true)
    } 
  }

  useEffect(() => {
    fetchMovie(searchValue)
  }, [searchValue])

  useEffect(() => {
    const savedNominationList = JSON.parse(
      localStorage.getItem('theShoppiesNominationList')
    )

    if (savedNominationList) {
      setNominations(savedNominationList)
    }
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('theShoppiesNominationList', JSON.stringify(items))
  }

  const nominateMovie = (movie) => {
    const newNominationsList = [...nominations, movie]

    const alreadyNominated = nominations.find(nomination => nomination.imdbID === movie.imdbID)

    //TODO: Disable button after nomination instead of not setting nominations 
    //      setting 'event.target.disabled = true' doesn't work (why?)
    if (newNominationsList.length < 5 && !alreadyNominated) {
      setNominations(newNominationsList)
      saveToLocalStorage(newNominationsList)
    } else if (newNominationsList.length === 5 && !alreadyNominated) {
      setNominations(newNominationsList)
      saveToLocalStorage(newNominationsList)
      setTimeout(() => alert('Nominations are complete! You can only nominate 5 movies.'), 300)
    } else if (alreadyNominated) {
      alert('You\'ve already nominated this movie.')
    } else {
      alert('Nominations are complete! You can only nominate 5 movies.')
    }
  }

  const removeNomination = (movie) => {
    const newNominationsList = nominations.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    )

    setNominations(newNominationsList)
    saveToLocalStorage(newNominationsList)
  }

  return (
    <div className='app-container'>
      <h1>The Shoppies</h1>
      <SearchBox inputValue={searchValue} setSearchValue={setSearchValue} />

      <div className='d-flex flex-row-wrap justify-content-between align-items-start movies-and-nominations-container'>
        <div className='card movies-results-container'>
          <h4 className='mt-0'>Results for "{searchValue}"</h4>
          {areMoviesLoaded ? 
            (<MovieList 
              movieResults={movieResults} 
              handleButtonClick={nominateMovie}
              action='Nominate'
            />)
            : (<LoadingSkeleton />)
          }
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
