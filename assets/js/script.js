var citySearch = document.querySelector('#city-search');
var submitButton = document.querySelector('#submit-button');
var boxContainer = document.querySelector('#box-container');

function weatherReport (lat, lon) {
   var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=efb4f88ccfdc769e771215392c1a61ec";

   fetch (queryURL2)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        
        console.log(data);
        boxContainer.innerHTML = "";

        for (let i = 0; i < 40; i += 8) {
        var feelsLikeCelsius = (data.list[i].main.feels_like - 273.15).toFixed(1);
        var milliseconds = (data.list[i].dt * 1000);
        var dateObject = new Date(milliseconds).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
        boxContainer.innerHTML += "<div class='col-2 weather-box'><h4>" + dateObject + "</h4><h5>Feels Like: </h5><p>" + feelsLikeCelsius + "C°</p></div>";
        }
    })
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    var cityQuery = citySearch.value;

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityQuery + "&limit=5&appid=efb4f88ccfdc769e771215392c1a61ec";

    fetch (queryURL)
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