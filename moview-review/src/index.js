import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './static/index.css'
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';

function App(){
  
  const [movies, getMovies] = useState([]);
  useEffect(()=>{
    fetch('/show_movies').then(response => {
      if (response.ok){
        return response.json()
      }else {
        return Promise.reject("Something went wrong!")
      }
    }).then(data => {
      getMovies(data.movies); // you don't have to fetch all the time, you could just change movies and the react component will be rerendered... coz it changes everytime the state changes
    }).catch(err => () => console.log(err))
  }, [])

  return (
    <div className="container">
      {/* Here you're just changing the movies, meaning if fetch POST failed, you wouldn't know that coz we're simply changing the movies but not refetching => The added movie will appear in the UI anyways. */}
      <AddMovie onMovieAdd={movie => getMovies(prevMovies => [movie, ...prevMovies])}/>  
      <MovieList movieList={movies} onDeleteMovie={movie_id => getMovies(prevMovies => prevMovies.filter(movie => movie.id !== +movie_id))} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
