var x = require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");


var app = process.argv[2];
var searchField = "";
var text = "";

for (var i = 3; i<process.argv.length; i++) {
     text += " " + process.argv[i];
    console.log("Search criteria was: " + text);
}
searchField = text; 
console.log("COMPLETE field" + searchField); 


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

    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify(keys.spotify);
     
    spotify.search({ type: 'track', query: searchField }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(JSON.stringify(data)); 
    });
};

function concert() {
    axios.get("https://rest.bandsintown.com/v4/artists/" + searchField + "/events?app_id=codingbootcamp").then(
        function (response) {
            
            console.log(response.data.length);

            for (var i = 0; i<response.data.length; i++) {
                console.log("-----------------------" + searchField + " event#"+ (i+1) + "------------------------------");
                console.log("Name of Venue: " + response.data[i].venue.city + "," + response.data[i].venue.country);
                console.log("Location of Venue: " + response.data[i].venue.location);
                console.log("Date of Event: " + response.data[i].datetime);
                

            }
        
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