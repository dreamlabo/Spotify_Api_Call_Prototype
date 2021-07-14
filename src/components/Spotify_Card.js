import React from 'react'
import './spotify_styles.css'

const SpotifyCard = (props) => {

    const getGenreList = () => {
        const listLength = 4

        if(props.genreList.length >= 4){
            return props.genreList.slice(0, listLength).map((genre, index) => {
                return <li key={index}>{genre}</li>
            })
        }
        else{
            return props.genreList.map((genre, index) => {
                return <li key={index}>{genre}</li>
            })
        }

    };

    return (
        <div className="spotify-card">
            <header className="spotify-card-band-name">{props.name}</header>
            <div className='spotify-card-image-container'>

                    <img className="card-band-image" src={props.image} alt="band" />

            </div>
            <h4 className='card-genre-header'>Genre</h4>
            <ul className="card-genre-list">{getGenreList()}</ul>
            <h4 className='card-genre-header'>Followers</h4>
            <p className='card-followers'>{props.followers.toLocaleString()}</p>
            <h4 className='card-genre-header'>Popularity</h4>
            <p className='card-followers'>{props.popularity.toLocaleString()}</p>

        </div>
    )
};

export default SpotifyCard;


