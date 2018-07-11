// Declare Variables
var userDestination = ["London", "United Kingdom"];
var userLocation = ["Toronto", "Canada"];

var restCountriesURL;
var geonamesURL;
var wikipediaURL;

var googleAPIKey = "AIzaSyCN3EyjOpztvL3D3bhE9zYi7KoSpczjM1s";
var googlePlaceID;
var googlePhotoID;
var googlePhotosArray = [];

//https://maps.googleapis.com/maps/api/place/textsearch/json?query=kyoto+japan&language=en&key=AIzaSyCN3EyjOpztvL3D3bhE9zYi7KoSpczjM1s
var mapsQueryURL;

//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ8cM8zdaoAWARPR27azYdlsA&key=AIzaSyCN3EyjOpztvL3D3bhE9zYi7KoSpczjM1s
var placesQueryURL;

//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyCN3EyjOpztvL3D3bhE9zYi7KoSpczjM1s
var photosQueryURL;


var newsAPIKey = "6bf648adc8a74ad8830c059dea6040e1";

//https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6bf648adc8a74ad8830c059dea6040e1
var newsQueryURL;
var newsDate;

var NOAAAPIKey = "DNAzgdbJbGUOWwjRggETatgbpadNAEVY";

var 

//http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/tas/1980/1999/CAN


// Declare Functions
function googlePlacesQuery() {
    mapsQueryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + userDestination[0] + "+" + userDestination[1] + "&language=en&key=" + googleAPIKey;

    $.ajax({
        url: mapsQueryURL,
        method: "GET"
    }).then(function(response) {
        googlePlaceID = response.results[0].place_id;
    }).then(populatePhotoArray);
}

function populatePhotoArray() {
    placesQueryURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + googlePlaceID + "&key=" + googleAPIKey;
    console.log(placesQueryURL);

    $.ajax({
        url: placesQueryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.result.photos.length; i++) {
            googlePhotosArray.push(response.result.photos[i].photo_reference);
        }
    }).then(populatePhotoCarousel);
    
}

function populatePhotoCarousel() {

    for (var i = 0; i < googlePhotosArray.length; i++) {
        photosQueryURL = "https://maps.googleapis.com/maps/api/place/photo?maxheight=300&photoreference=" + googlePhotosArray[i] + "&key=" + googleAPIKey;
        $("<div>").addClass("carousel-item").append("<img class=\"d-block carousel_image\" src=" + photosQueryURL + ">").appendTo(".carousel-inner");
        //$("#city_photo_carousel").append("<img class=\"carousel_image\" src=" + photosQueryURL + ">");
    }

    $(".carousel-item:first").addClass("active");

}

function geonamesQuery() {
    geonamesURL = "http://api.geonames.org/wikipediaSearchJSON?q=" + userDestination[0] + "&maxRows=10&username=msvendsentan";
    
    $.ajax({
        url: geonamesURL,
        method: "GET"
    }).then(function(response) {
        $("#city_description").html("<p>" + response.geonames[0].summary + "</p>")
    });
}

function wikipediaQuery() {
    wikipediaURL = "https://en.wikipedia.org/api/rest_v1/page/summary/" + userDestination[0];

    $.ajax({
        url: wikipediaURL,
        method: "GET"
    }).then(function(response) {
        $("#city_description").html("<p>" + response.extract + "</p>");
    });
}

function newsQuery() {
    newsQueryURL = "https://newsapi.org/v2/everything?q=(" + userDestination[0] + "%20and%20" + userDestination[1] + ")&sortBy=popularity&pageSize=10&apiKey=" + newsAPIKey;
    console.log(newsQueryURL);

    $.ajax({
        url: newsQueryURL,
        method: "GET"
    }).then(function(response) {
       
        for (var i = 0; i < response.articles.length; i++) {
           
            var storyContainer = $("<div>");
            storyContainer.addClass("story_container");

            var storyURL = $("<a>").attr("href", response.articles[i].url);
            storyURL.append(response.articles[i].title);

            var storyTitle = $("<div>");
            storyTitle.addClass("story_title").append(storyURL);
    
            var storyDescription = $("<div>");
            storyDescription.addClass("story_description").append("<p>" + response.articles[i].description + "</p>");
    
            storyContainer.append(storyTitle).append(storyDescription).appendTo("#stories_list");
        }
    });
}

function countryInfoQuery() {
    restCountriesURL = "https://restcountries.eu/rest/v2/name/" + userDestination[1];

    $.ajax({
        url: restCountriesURL,
        method: "GET"
    }).then(function(response) {

        $("#country_info_container")
            .append("<h2>A snapshot of " + response[0].name + "</h2>")
            .append("<img class=\"flag\" src=" + response[0].flag + ">")
            .append("<p><b>Primary Language:</b> " + response[0].languages[0].name + "</p>")
            .append("<p><b>Capital:</b> " + response[0].capital + "</p>")
            .append("<p><b>Primary Currency:</b> " + response[0].currencies[0].symbol + " " + response[0].currencies[0].name + "</p>")

    });

}



//Unnecessary because free news plan is max 1 month in the past.
/* function dateBacktrack() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var monthDelay = 1;

    var newMonth = month - monthDelay;
    var newDay = day;
    var newYear = year;

    if (newMonth < 1) {
        newMonth = newMonth + 12;
        newYear = newYear - 1;
    }

    newsDate = newYear + "-" + newMonth + "-" + newDay;
    console.log(newsDate);
} */





// Code & Listeners

$(document).ready(function() {

    $("#destination_name").text(userDestination[0] + ", " + userDestination[1]);

    googlePlacesQuery();
    wikipediaQuery();
    countryInfoQuery();
    newsQuery();






});


