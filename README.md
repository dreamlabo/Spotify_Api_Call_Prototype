# Spotify Api Call Prototype

Basic protype I built to work with the Spotify Api, which will be used in another website I'm building for a local music society.

### Technologies Used:
  * React
  * JavaScript
  * HTML/JSX
  * CSS
  * Axios
  * Spotify API

### Basic Flow of the Prototype:
  * Program calls the Spotify API endpoint https://accounts.spotify.com/api/token to get a token 
  * Calls the API endpoint https://api.spotify.com/v1/artists to get a list of predetermined artists
      * (Artists include Rush, Yes, Gentle Giant, Jethro Tull, Dream Theater, etc.)
  * For each artist, a card displays the following information:
      * Artist/Band name
      * JPEG of the artist/band (provided by spotify)
      * First four genres found in the 'genre' array
      * Number of Spotify users following the band
      * Spotify rank of the artist/band
  
The group of cards are initially displayed as a "scrolling card file." 
When a user hovers over an individual card, that specific card is displayed obove the others.

### Individual Card
![Individual Card](https://raw.githubusercontent.com/dreamlabo/Spotify_Api_Call_Prototype/main/src/photos/CardScreenShot.jpg)

### Display of All Cards
![FullDisplay](https://raw.githubusercontent.com/dreamlabo/Spotify_Api_Call_Prototype/main/src/photos/FullViewofCards.jpg)
