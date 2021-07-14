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

        const body = {grant_type: 'client_credentials' };

        // const result = await fetch(tokenURL, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/x-www-form-urlencoded',
        //         'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
        //     },
        //     body: 'grant_type=client_credentials'
        // });

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

        // const data = await result.json();
        // console.log(data.access_token);
        // return data.access_token
    };


    const getBands = async (token) => {

        // const dreamTheater = '2aaLAng2L2aWD2FClzwiep';
        // const genesis = '3CkvROUTQ6nRi9yQOcsB50';
        // const kingCrimson = '7M1FPw29m5FbicYzS2xdpi';
        // const porcupineTree = '5NXHXK6hOCotCF8lvGM1I0';
        // const riverside = '5yjbUO1Jocui7RKE30zfLT';
        // const stevenWilson = '4X42BfuhWCAZ2swiVze9O0';
        // const yes = '7AC976RDJzL2asmZuz7qil';
        const url = 'https://api.spotify.com/v1/artists';


        // const params = new URLSearchParams();
        // params.append('ids', dreamTheater);
        // params.append('ids', yes);


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
                // ids: dreamTheater + ',' + genesis + ',' + kingCrimson + ',' + porcupineTree + ',' + riverside +  ',' + stevenWilson + ',' + yes
                ids: bandList()
            }
            })
            .then((response) => {
                   // console.log('Response: ' + JSON.stringify(response.data));
                    setBandData(response.data)
                })
            .catch((err) => {
                    console.log('Error: ' + err)
            })
    };

      const renderCards = () => {
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