import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const initialState = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const UpdateMovie = (props) => {
    const params = useParams()
    const [movie, setMovie] = useState({})

    useEffect(() => {
        if(props.movieList.length > 0){
            let foundMovie = props.movieList.find(movie => {
                return movie.id == params.id
            })
            console.log(foundMovie)
            setMovie(foundMovie)
        } else {
            console.log('fetching movie')
        }
    }, [props.movieList])
    
    
    return (
        <>
            <div>Here is the Movie: {movie.title}</div>
        </>
    )
}

export default UpdateMovie