require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var action = process.argv[2];
var movie = require("request");

switch (action) {
    case "myTweets":
        tweets();
        break;

    case "mySpotify":
        music();
        break;

    case "myMovie":
        movies();
        break;

    case "lotto":
        lotto();
        break;
}

function tweets() {
    var client = new Twitter({
        consumer_key: '5F2winyDKjZV9JwfigeaY1brb',
        consumer_secret: 'dpO0L8ijGYxaKTcyaIthxEUoPenz62mKcJP8juLgIzDdb617nk',
        access_token_key: '1010983170747973632-SQpEyG1oyhZvqrZG96fyL4U8eqF1VU',
        access_token_secret: 'sbHVRGd5nzCdkBbUI14wjdEic3mnAW0nKizJGd5vKwGwq'
    });

    var params = {
        screen_name: '@ZW51410823',
        count: 20

    };
    client.get('statuses/user_timeline/', params, function (error, tweets) {
        if (error) {
            console.log('Error: ' + error);
        } else {
            console.log("20 Most Recent Tweets");
            console.log("");

            for (var i = 0; i < tweets.length; i++) {
                console.log("( #" + (i + 1) + " )  " + tweets[i].text);
                console.log("Created:  " + tweets[i].created_at);
                console.log("");
            }
        }
    })
}

function movies(){
    var movieName = process.argv[3];
    var request = require('request');
request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
  console.log('error:', error);
  var movie = JSON.parse(body)
  console.log("Title:" + movie.Title);
  console.log("Year:" + movie.Year);
  console.log("imdbRating" + movie.imdbRating);
  console.log("Rotten Tomatoes:" + movie.rottenTomatoes);
  console.log("Country:" + movie.Country);
  console.log("Language:" + movie.Language);
  console.log("Plot:" + movie.Plot);
  console.log("Actors:" + movie.Actors);
});
}

function music(spotifyMusic){
    var SpotifyApi = require('node-spotify-api');

    if(spotifyMusic === undefined)
    spotifyMusic = "Back in Black";
 
var spotify = new SpotifyApi({
  id:"547aa0774e9e44c1b2bfc7a23ef455d3",
  secret:"79550e7bfe9b49bab574b9a8d16d258a"
});

var track = process.argv[3];
  
spotify.search({ type: 'track', query: track }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  else {
    for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
        if(i === 0) {
            console.log("Artist: " + data.tracks.items[0].artists[i].name);
        }
       }  
}
console.log("Song:  " + data.tracks.items[0].name);
console.log("Preview it: " + data.tracks.items[0].preview_url);
console.log("Album:  " + data.tracks.items[0].album.name);
})
};