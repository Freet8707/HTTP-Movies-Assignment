import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const initialState = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const UpdateMovie = (props) => {
    const params = useParams()
    const { push } = useHistory()
    const [movie, setMovie] = useState(initialState)
    const [stars, setStars] = useState([])

    useEffect(() => {
        if(props.movieList.length > 0){
            let foundMovie = props.movieList.find(movie => {
                return movie.id == params.id
            })
            console.log(foundMovie)
            setMovie(foundMovie)
            setStars(foundMovie.stars)
        } else {
            console.log('fetching movie')
        }
    }, [props.movieList])

    const handleMetaChange = e => {
        if(e.target.name = 'metascore'){
            setMovie({
                ...movie,
                [e.target.name]: parseInt(e.target.value, 10)
            })
        } 
    }

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res => {
            console.log(res)
            setMovie(initialState)
            push('/')
        })
        .catch(err => console.error(err.response))
    }
    
    
    return (
        <>
            <form onSubmit={handleSubmit} className='updateForm'>
                <div>
                    <label htmlFor='title' />Movie Title: 
                    <input
                        type='text'
                        id='title'
                        name='title'
                        onChange={handleChange}
                        value={movie.title}
                    />
                </div>
                <div>
                    <label htmlFor='director' />Movie Director: 
                    <input
                        type='text'
                        id='director'
                        name='director'
                        onChange={handleChange}
                        value={movie.director}
                    />
                </div>
                <div>
                    <label htmlFor='metascore' />Movie Metascore: 
                    <input
                        type='text'
                        id='metascore'
                        name='metascore'
                        onChange={handleMetaChange}
                        value={movie.metascore}
                    />
                </div>
                <button type='submit'>Update Movie</button>
                
            </form>
            <h3>Stars: </h3>
            {stars.map(s => {
                return <p key={s}>{s}</p>
            })}
        </>
    )
}

export default UpdateMovie