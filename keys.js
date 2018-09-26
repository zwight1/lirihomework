require("dotenv").config();

var keys = require('./keys.js');

var request = require('request');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var fs = require('fs');


console.log(process.argv);

 function getMovieName() {
     var movieName = ''
     for(var i = 3; i < process.argv.length; i++){
         console.log(process.argv[i]);
         movieName = movieName + process.argv[i] +''

     }
     console.log(movieName);
     return movieName
 }
 nodeArgv = process.argv;
var x = "";
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}

var action = process.argv[2];
var value = process.argv[3];



switch (action) {
    case "my-tweets":
        tweeter();
        console.log("tweets")
        break;
    case "spotify-this-song":
     if(x){
        track(x);   
     } else 
     {track("I hate everything about you");
    }
     break;
    case "movie-this":
     film();
    break;
    case "do-what-it-says":
        text();
        break;
    default:
        "random.txt!"
}

function tweeter() {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'zw'};
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) throw error;
        
        for (var i =0; i < tweets.length;i++){
            var recent = "Tweet " + (i+1) + ": " + '\n' + tweets[i].text;

            console.log("recent Tweet" + recent)
            console.log("tweeted:  " + tweets[i].created_at);
            console.log("");
        }
        

        
      });

}


function track(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (!err) {
       
            var songData = data.tracks.items[0];
            
            console.log("Artist: " + songData.artists[0].name);
           
            console.log("Song: " + songData.name);
           
             console.log("Preview URL: " + songData.preview_url);
           
             console.log("Album: " + songData.album.name);
            console.log("-----------------------");
          }
         else{
            return console.log('Error occurred: ' + err);
        }
       
      });


}

function film(movie) {
    
var queryUrl = "http://www.omdbapi.com/?t=" + getMovieName() + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        //If the request is successful
        if (!error && response.statusCode === 200) {
      
         // Parse the body of the site and recover just the imdbRating
         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Rating: " + JSON.parse(body).imdbRating);
         // figure out how to get parameter to filter out rotten tomatoes rating
        
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);

          console.log("Actors: " + JSON.parse(body).Actors);
          
        }
      });
      

    }

    function text(){
        
            fs.readFile("random.txt", "utf8", function(error, data){
                if (error) {
                    return console.log(error);
                }
        
                var randomChoice = data.split(",");
                console.log(randomChoice);
                if(randomChoice[0] === "spotify-this-song") {
                    spotifyThis(randomChoice[1]);
                }
                
            })
        };
        