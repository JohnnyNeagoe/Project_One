var keyHotel = "6mr7ugtahpv3scmhygs8qsfb";
var keyFlight = "5232c7b5-7351";
var destination;
var startDate;
var endDate;
var rooms;
var children;
var adults;
var hotelQuery = "http://api.hotwire.com/v1/search/hotel?apikey=" + keyHotel + "&dest=" + destination + "&rooms=" + rooms + "&startdate=" + startDate + "&enddate=" + endDate + "&adults=" + adults + "&children=" + children ;
var bookingData = [];
var data = [];
var destVar = localStorage.getItem("destination");
var destination = destVar.split(",");
var itinRooms;
var itinStar;
var itinTotal;
var itinCheckin;
var itinCheckout;
var itinLink;
for (var i = 0; i < destination.length; i++) {
   destination[i] = destination[i].trim();
}
console.log(destination);
$('#inputDestination').attr("value", destination[0]);

 //pulls up the table of results for hotel bookings
$("#submit-button").on("click", function(){
    
    event.preventDefault();  
    //capture user input
    // destination = $("#inputDestination").val().trim();
    startDate = $("#inputStartDate").val().trim();
    endDate = $("#inputEndDate").val(); 
    rooms = $("#inputRooms").val().trim();
    adults = $("#inputAdults").val().trim();
    children = $("#inputChildren").val().trim();

    //contruct URL for ajax
    hotelQuery = "http://api.hotwire.com/v1/search/hotel?apikey=" + keyHotel + "&dest=" + destination + "&rooms=" + rooms + "&startdate=" + startDate + "&enddate=" + endDate + "&adults=" + adults + "&children=" + children + "&format=json";
   //initialize ajax
    $.ajax({
        url: hotelQuery,
        method: "GET"
      }).then(function(response) {
        //for loop to run through all results
          for( i = 0; i < response.Result.length; i++){
            //contructing URL to link to hotwire website for actual booking based on the result ID
            var resultId = response.Result[i].ResultId;
            var resultId2 = resultId.substr(0, resultId.length-15);
            var bookingLink = "https://www.hotwire.com/hotels/details/" + resultId2 + "--"
            //constructing the table little messy cause i had to add a lot of data attributes to the last cell
            $('#bookingTable').append('<tr><td>'+ response.Result[i].StarRating +'</td><td>' + "$"+response.Result[i].AveragePricePerNight+'</td><td>'+ "$"+ response.Result[i].TotalPrice +'</td><td>'+ response.Result[i].CheckInDate +'</td><td>'+ response.Result[i].CheckOutDate +'</td><td><a href=' + bookingLink + ">Click Here to Book</a></td><td id=itin data-rooms = "+response.Result[i].Rooms+" data-starrating = "+response.Result[i].StarRating+" data-priceavg= "+response.Result[i].AveragePricePerNight+" data-totalprice="+response.Result[i].TotalPrice+" data-checkin="+response.Result[i].CheckInDate+" data-checkout="+response.Result[i].CheckOutDate+" data-link= https://www.hotwire.com/hotels/details/" + resultId2 + "-->Click Here to Add Booking to Itinerary</td></tr>");
          }
  //end of for loop^
          //click event to move data about booking to itinerary. not linked to actual itinerary yet but the console log works.
          $('#bookingTable').on( 'click', 'td', function () {
            itinRooms = ($(this).attr('data-rooms'));
            itinStar = ($(this).attr('data-starrating'));
            itinTotal = ($(this).attr('data-totalprice'));
            itinCheckin = ($(this).attr('data-checkin'));
            itinCheckout = ($(this).attr('data-checkout'));
            itinLink = ($(this).attr('data-link'));
            localStorage.setItem('itinRooms', itinRooms);
            localStorage.setItem('itinStar', itinStar);
            localStorage.setItem('itinTotal', itinTotal);
            localStorage.setItem('itinCheckin', itinCheckin);
            localStorage.setItem('itinCheckout', itinCheckout);
            localStorage.setItem('itinLink', itinLink);
        } );
      })  
      KAYAK.embed({
        container: document.getElementById("kayakSearchWidgetContainer"),
        defaultProduct: "flights",
        enabledProducts: ["hotels", "flights"],
        startDate: "2015-12-24",
        endDate: "2016-01-3",
        origin: "New York, NY",
        destination: "Boston, MA",
        ssl: true,
        affiliateId: "acme_corp",
        isInternalLoad: false,
        lc: "en",
        cc: "us",
        mc: "EUR"
        });
})




    
