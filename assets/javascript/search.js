var autocomplete;
var input = document.getElementById('search-input');
$(document).ready(function () {
    $("#nav_container").hide();
});

function initAutocomplete() {

    // Create the autocomplete object, restricting the search to geographical cities
    //When a user selects a city, populate the search bar with that result
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(input),
        {types: ['(cities)']}
    );

    // When the user presses the submit button, pull the chosen loatio into some Div/form
    // Link this submission to booking div in booking tab/code and to info div in info tab/code
    $("#buttonSubmit").on("click", function(){
        var locationChosen = autocomplete.gm_accessors_.place.jd.j
        $(".sample-div").text(locationChosen);
        $("#nav_container").show();
        $("#quote_container").remove();
        console.log(locationChosen);
    })
}
    // Allow user to submit when pressing enter
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("buttonSubmit").click();
        }
    });
    // Do not allow user to enter anything but a letter in the textfield
    $(document).ready(function() {
        $(input).keypress(function(key) {
            if(key.charCode < 65 || key.charCode > 90 && key.charCode < 97 || key.charCode > 122) return false;
        });
    });




//User Geolocation --> find how to track inside div, for use in price calcualtion of flight/transportation
var userLocation = document.getElementById("sample-div-loc");
        function getLocation(){
            if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
            } else {userLocation.innerHTML="Geolocation is not supported by this browser.";}
        }
        console.log(navigator)
        
        function showPosition(position) {
        userLocation.innerHTML="Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;  
        }
        getLocation()