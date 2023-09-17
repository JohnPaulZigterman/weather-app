//establishes variables for HTML id tags
var citySearch = document.querySelector('#city-search');
var submitButton = document.querySelector('#submit-button');
var boxContainer = document.querySelector('#box-container');
var heroContainer = document.querySelector('#hero-container');
var savedCities = document.querySelector('#saved-cities');

//declares autoFill function
function autoFill () {

}

//declares weatherReport function with lat and lon inputs
function weatherReport (lat, lon) {

    //establishes query URL based on lat and lon coords
   var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=efb4f88ccfdc769e771215392c1a61ec";

   //sends fetch request for query URL
   fetch (queryURL2)
   //standard json response
    .then(function(response) {
        return response.json();
    })
    //converts data and sends to appropriate elements
    .then(function(data) {
        
        console.log(data);
        heroContainer.innerHTML = "";
        boxContainer.innerHTML = "";


        var feelsLikeCelsius = (data.list[0].main.feels_like - 273.15).toFixed(1);
        var milliseconds = (data.list[0].dt * 1000);
        var dateObject = new Date(milliseconds).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
        heroContainer.innerHTML += "<div class='col-10 weather-box'><h3>" + dateObject + "</h3><h4>Feels Like: </h4><p>" + feelsLikeCelsius + "C°</p></div><br>";

        for (let i = 7; i < 40; i += 8) {
        var feelsLikeCelsius = (data.list[i].main.feels_like - 273.15).toFixed(1);
        var milliseconds = (data.list[i].dt * 1000);
        var dateObject = new Date(milliseconds).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
        boxContainer.innerHTML += "<div class='col-2 weather-box'><h4>" + dateObject + "</h4><h5>Feels Like: </h5><p>" + feelsLikeCelsius + "C°</p></div>";
        }
    })
}


//event listener for submit button
submitButton.addEventListener('click', function(event) {
    
    //prevents default activity
    event.preventDefault();

    //cityQuery variable is set to search field input
    var cityQuery = citySearch.value;

    //establishes query URL for the city to get lat & lon
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityQuery + "&limit=5&appid=efb4f88ccfdc769e771215392c1a61ec";

    //sends fetch request to established URL
    fetch (queryURL)
        //standard JSON response
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log(data);
            console.log(data[0].local_names.en);
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;
            weatherReport(cityLat, cityLon);
        })

});

//calls autofill function on page load
autoFill;