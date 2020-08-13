import React from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const { go } = useHistory()

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res)
      go()
    })
    .catch(err => console.error(err))
  }
  
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <h3>Update movie? Click <Link to={`/update-movie/${id}`}><span style={{color: 'red'}}>Here!</span></Link></h3>
      <button style={{color: 'red'}} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MovieCard;
