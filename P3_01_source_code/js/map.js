
/* ------------- CLASS FOR  MAP  --------------- */

var bikeApiUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=bruxelles&apiKey=c33c8c2fbe740a485ad20f094c5631810e5855b7";
var map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/jodev/cka3x3lp10ua61imynd5hmkfm',
    center: [4.360625, 50.873156], // starting position as [lng, lat]
    zoom: 10
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9kZXYiLCJhIjoiY2s5cGdibnJ1MGE2eTNnbWU5aWtoajVyMyJ9.YS-wUziFFQp2KTEou0-9GA';
  });
