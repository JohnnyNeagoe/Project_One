// Declare Variables
var userDestination = ["London", "England"];
var userLocation = ["Toronto", "Canada"];

var restCountriesURL = "https://restcountries.eu/rest/v2/name/" + userDestination[1];
var geonamesURL;
var wikipediaURL;
var wikipediaURL2;


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
        console.log(response);
        for (var i = 0; i < response.result.photos.length; i++) {
            googlePhotosArray.push(response.result.photos[i].photo_reference);
        }
    }).then(populatePhotoCarousel);
    
}

function populatePhotoCarousel() {

    console.log(googlePhotosArray);

    for (var i = 0; i < googlePhotosArray.length; i++) {
        photosQueryURL = "https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=" + googlePhotosArray[i] + "&key=" + googleAPIKey;
        $("#city_photo_carousel").append("<img src=" + photosQueryURL + ">");

    }

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





// Code & Listeners

$(document).ready(function() {

    $("#destination_name").text(userDestination[0] + ", " + userDestination[1]);

    googlePlacesQuery();
    wikipediaQuery();





});


