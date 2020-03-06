import React, {useState} from 'react';

function AddMovie(props) {
  const [title, setTitle] = useState('');
  const [raiting, setRaiting] = useState(1);

  const sendHandle = (e) => {
    // some value checks are here -> tba 
    let data = {"title": title, "raiting": raiting}; 
    fetch("/add_movie", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(data)
    }).then(() => {
      props.onMovieAdd(data);
    })
  }

  return (
    <div>
      <button onClick={sendHandle}>Send</button>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
      <input type="number" value={raiting} onChange={e => setRaiting(e.target.value)} max="5" min="1"/>
    </div>
  );
}

export default AddMovie;