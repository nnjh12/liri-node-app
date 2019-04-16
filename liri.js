///// STEP0. Require
require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api')
var axios = require("axios");
var fs = require("fs");

///// STEP1. Define var
var printData = "testesetaesr"
var spotify = new Spotify(keys.spotify)

var validUserInput1 = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
var userInput1 = process.argv[2]

var userInput2 = ""

if (!validUserInput1.includes(userInput1)) {
    console.log("Enter valid command : concert-this, spotify-this-song, movie-this, do-what-it-says")
} else if (userInput1 === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        // console.log(data)
        dataArray = data.split(",")
        // console.log(dataArray)
        userInput1 = dataArray[0]
        userInput2 = dataArray[1].replace(/"/g, "")
        // console.log(userInput1)
        // console.log(userInput2)
        runApp()
    })
} else {
    runApp()
}

///// STEP2. Define function
function runApp() {
    if (userInput1 === "concert-this") {
        for (var i = 3; i < process.argv.length; i++) {
            userInput2 += process.argv[i]
        }
        if (userInput2 === "") {
            console.log("Enter artist/band name.")
            return
        }
        concertThis()
    } else if (userInput1 === "spotify-this-song") {
        for (var i = 3; i < process.argv.length; i++) {
            userInput2 += process.argv[i] + " "
        }
        if (userInput2 === "") {
            console.log("Enter song name.")
            return
        }
        runSpotify()
    } else if (userInput1 === "movie-this") {
        for (var i = 3; i < process.argv.length; i++) {
            userInput2 += process.argv[i] + " "
        }
        if (userInput2 === "") {
            userInput2 = "Mr. Nobody"
        }
        movieThis()
    }
}

function concertThis() {
    axios
        .get("https://rest.bandsintown.com/artists/" + userInput2 + "/events?app_id=codingbootcamp")
        .then(function (response) {
            printData = "---------- concert this result ----------\n"

            if (response.data.length === 0) {
                printData += "The artist you search for doesn't have upcoming events.\n" +
                    "-----------------------------------------\n"
            }

            for (var i = 0; i < response.data.length; i++) {
                var forData =
                    "Venue name: " + response.data[i].venue.name + "\n" +
                    "Venue location: " + response.data[i].venue.city + " " + response.data[i].venue.region + " " + response.data[i].venue.country + "\n" +
                    "Date: " + response.data[i].datetime + "\n" +
                    "-----------------------------------------\n"
                printData += forData
            }
            updateLogTxt()

        })
        .catch(function (error) {
            console.log(error)
        });
}

function runSpotify() {
    spotify
        .search({ type: 'track', query: userInput2, limit: 5 })
        .then(function (response) {
            // console.log(JSON.stringify(response.tracks.items[0],null,2))

            printData = "------- spotify this song results -------\n"
            for (var i = 0; i < response.tracks.items.length; i++) {
                var forData =
                    "Song's Name: " + response.tracks.items[i].name + "\n" +
                    "Artist: " + response.tracks.items[i].artists[0].name + "\n" +
                    "Album: " + response.tracks.items[i].album.name + "\n" +
                    "Preview Link: " + response.tracks.items[i].preview_url + "\n" +
                    "-----------------------------------------\n"
                printData += forData
            }
            updateLogTxt()
        })
        .catch(function (error) {
            console.log(error)
        })
}

function movieThis() {
    axios
        .get("http://www.omdbapi.com/?apikey=bdc11978&t=" + userInput2)
        .then(function (response) {
            printData =
                "----------- movie this result -----------\n" +
                "Title: " + response.data.Title + "\n" +
                "Year: " + response.data.Year + "\n" +
                "Rating: " + response.data.imdbRating + "\n" +
                "Rotten Tomato Rating: " + response.data.Ratings[1].Value + "\n" +
                "Country: " + response.data.Country + "\n" +
                "Language: " + response.data.Language + "\n" +
                "Plot: " + response.data.Plot + "\n" +
                "Actors: " + response.data.Actors + "\n" +
                "-----------------------------------------\n"
            updateLogTxt()

        })
        .catch(function (error) {
            console.log(error)
        })
}

function updateLogTxt() {
    fs.appendFile("log.txt", printData, function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        // Otherwise, it will print: "movies.txt was updated!"
        console.log("log.txt was updated!")
        console.log(printData)
    })
}

