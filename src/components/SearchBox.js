
function SearchBox(props) {
  return (
    <div className='card'>
      <label htmlFor='movieTitle' className='d-block'>Movie Title</label>
      <input 
        id='movieTitle'
        className='d-block'
        value={props.inputValue}
        onChange={event => props.setSearchValue(event.target.value)}
        placeholder='Search movie title...' 
      />
    </div>
  )
}

export default SearchBox;