import React, {useEffect, useState, Fragment} from 'react';
import Axios from 'axios';
import './spotify_styles.css'
import SpotifyCard from './Spotify_Card';
import  { BandNames } from '../helpers/bandNames';



const Spotify = () => {

    const [bandData, setBandData] = useState(undefined);

    const getToken = async () => {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
        const tokenURL = 'https://accounts.spotify.com/api/token';

        await Axios.post(tokenURL,  "grant_type=client_credentials",
         {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' +  btoa(clientId + ':' + clientSecret)
            }
        })
            .then((response) => {
                console.log('Response: ' + JSON.stringify(response.data.access_token));
                getBands(response.data.access_token)
            })
            .catch((err) => {
                console.log('Error: ' + err)
            })

    };


    const getBands = async (token) => {

        const url = 'https://api.spotify.com/v1/artists';

        const bandList = () => {
            return Object.values(BandNames).join(',').toLocaleString()
        };

        await Axios.get(url, {

            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' +  token
            },
                params: {
                      ids: bandList()
                     }
            })
            .then((response) => {
                   //console.log('Response: ' + JSON.stringify(response.data));
                    setBandData(response.data)
                })
            .catch((err) => {
                    console.log('Error: ' + err)
            })
    };

      const renderCards = () => {
          if(!bandData.artists){
              return <></>
          }
          return bandData.artists.map((artist) => {
              return <SpotifyCard
                  genreList={artist.genres}
                  key={artist.name}
                  name={artist.name}
                  image={artist.images[2].url}
                  followers={artist.followers.total}
                  popularity={artist.popularity}/>
          })
      };


    useEffect( () => {
        getToken()

    }, []);


    return (
        <>
            {bandData !== undefined &&
                    <div className="card-container">
                        {renderCards()}
                    </div>}
        </>
    )
};

export default Spotify;