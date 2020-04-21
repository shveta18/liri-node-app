var fs = require("fs");
var x = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var app = process.argv[2];

//var search = process.argv[3];
var searchField = process.argv.slice(3).join(" ");
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
    if (!searchField) {
        searchField = "The Sign";
    }
    spotify
        .search({ type: 'track', query: searchField })
        .then(function (response) {
            console.log(response.tracks);
            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log("-----------------------" + searchField + " track result#" + (i + 1) + "------------------------------");
                for (var j = 0; j < response.tracks.items[i].album.artists.length; j++) {
                    console.log("Artist: " + response.tracks.items[i].album.artists[j].name);
                    console.log("Song: " + response.tracks.items[i].name);
                    console.log("Preview song: " + response.tracks.items[i].href);
                    console.log("Album name: " + response.tracks.items[i].album.name);
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};

function concert() {
    axios.get("https://rest.bandsintown.com/v4/artists/" + searchField + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("-----------------------" + searchField + " event#" + (i + 1) + "------------------------------");
                console.log("Name of Venue: " + response.data[i].venue.city + "," + response.data[i].venue.country);
                console.log("Location of Venue: " + response.data[i].venue.location);
                console.log("Date of Event: " + response.data[i].datetime);
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function movie() {
    if (!searchField) {
        searchField = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchField).then(
        function (response) {
            //Fetch rotten tomatoes rating
            var ratingsArray = response.data.Ratings;
            var rottenTomatoesRating = "No Ratings Available";

            for (var i = 0; i < ratingsArray.length; i++) {
                if (ratingsArray[i].Source == "Rotten Tomatoes") {
                    rottenTomatoesRating = ratingsArray[i].Value;
                }
            }
            console.log("Title of Movie: " + response.data.Title);
            console.log("Year movie came out: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRAting);
            console.log("Rotten Tomato Rating: " + rottenTomatoesRating);
            console.log("Country of Production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot:  " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");

            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function dowit() {
    fs.readFile("random.txt", "utf8", function(error,data){
        if(error){
            return console.log(error);
        }
 
        var dataArr = data.split(",");
        searchField = dataArr[1];
        if(dataArr[0]=="spotify-is-song"){
            spotify();
        }
        else if(dataArr[0]=="concert-this"){
            concert();
        }
        else if(dataArr[0]=="movie-this"){
            movie();
        }
        
    })
};