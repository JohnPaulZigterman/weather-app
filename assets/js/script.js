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

        for (let i = 0; i < 40; i += 8) {
        var feelsLikeCelsius = (data.list[i].main.feels_like - 273.15).toFixed(1);
        var milliseconds = (data.list[i].dt * 1000);
        var dateObject = new Date(milliseconds);
        boxContainer.innerHTML += "<h2>" + dateObject + "</h2>";
        boxContainer.innerHTML += "<h4>Feels Like: </h4><p>" + feelsLikeCelsius + "C°</p>";
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