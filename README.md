# liri-node-app

## Preview Link
https://drive.google.com/file/d/1aN0O2Nj3XrijpAO8gPHILEnfZN2ba842/view

## Main functionality of this App
1. concert-this artist/band name
show all the artist's upcoming events
1. spotify-this-song song name
show 5 results of the song name
1. movie-this movie name
show movie information
1. do-what-it-says
do random thing which is written in random.txt

## Small tips in each process
1. Define valid commands in Array. If user enter valid command, run App.
1. To get artist/band, song or movie name correctly, **use for loop** for combining more than 1 word.
    ```
    for (var i = 3; i < process.argv.length; i++) {
                userInput2 += process.argv[i] + " "
            }
    ```
1. To get a correct API call, some name need the space between words, while others don't.
    * song & movie name need space between words.
    * artist/band name doesn't need space between words.
1. Define a function for fs.appendfile.
    * Define new variable printData and assign different value in each command.