var Twit = require('twit') 
var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '', //put your keys
  timeout_ms:           60*1000,
})
var express = require("express");
var _ = require("underscore");
var http = require("http");
var querystring = require("querystring");
var app = express();
var result ="Une erreur est apparue :'( ";
var user = "";
var nom = "";
var degres = "";
var humidity ="";
var precipitation = "";
var ville = "";
var weather = require('weatherapi');
weather.config({api_key: ''}); //put your worldweatheronline api key
T.get('statuses/mentions_timeline', {count : 1}, function(err, data, response) {
	console.log(data)
	var user = data[0].user.id;
	var nom =  data[0].user.screen_name;
	if(data[0].place != null){
		ville = data[0].place;
		var url ='http://api.worldweatheronline.com/premium/v1/weather.ashx?q='+data[0].place.name+'&key=****************&num_of_days=1&format=json'; //put the wwo api key here
			http.get(url, function(res){
		    var body = '';
		    res.on('data', function(chunk){
		        body += chunk;
		    });
		    res.on('end', function(){
		      var reponsemeteo = JSON.parse(body)
				var degres = reponsemeteo.data.current_condition[0].temp_C;
				var humidity = reponsemeteo.data.current_condition[0].humidity;
				var precipitation = reponsemeteo.data.current_condition[0].precipMM;
				result = "A "+reponsemeteo.data.request[0].query+", il fait actuellement "+degres+" degres, l'humidité est "+humidity+"% et la precipitation est : "+precipitation+" mm ";
				 console.log(result);
				// T.post('statuses/update',{ status: ""+result +"@"+nom }, function (err, data, response) {console.log("voila : ca écrit un tweet")});
		    });
		}).on('error', function(e){
		      console.log("On a une erreur", e);
		});
	}
	else{result = "Il semblerait que vous n'ayez pas activé la localisation dans votre tweet :'( ";}
});//made by Léo Schneider 2016