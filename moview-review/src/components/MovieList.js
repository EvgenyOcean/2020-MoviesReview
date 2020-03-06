import React from 'react';

function MovieList(props) {
  // console.log(props.movieList); //will fire twice because movieList prop is changing once fetch is done, as a result react rerenders the component
  const clickHandler = (e) => {
    let movie = e.target.closest('li'); 
    if (movie){
      // console.log(movie.id); 
      let to_delete = {"deleting": movie.id};
      fetch('/delete_movie', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(to_delete)
      }).then(() => {
        props.onDeleteMovie(movie.id);
      })
    }
  }

  return (
    <ul>
      {props.movieList.map((movie, ind) => <li id={movie.id} key={ind}>{movie.title}, [{movie.raiting}]
      <button className="delete-btn" onClick={clickHandler}>X</button>
      </li>)}
    </ul>
  );
}

export default MovieList;