// var x = require("dotenv").config();

// var keys = require("./keys.js");

// should be able to do var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var app = process.argv[2];
var searchField = process.argv[3];

console.log("Text 1: " + app);
console.log("text 2: " + searchField);

switch (app) {
    case "spotify-this-song":
        spotify();
        break;

    case "concert-this":
        concert();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        dowit();
        break;
}

function spotify() {
    //enter axios 
};

function concert() {
    axios.get("https://rest.bandsintown.com/v4/artists/" + searchField + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(response.data[0].datetime);
        //   for (var i=0; i<response.length; i++){

        //   }
            
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function movie() {
    //enter axios 
};

function dowit() {
    //enter axios 
};