var citySearch = document.querySelector('#city-search');
var submitButton = document.querySelector('#submit-button');

function weatherReport (lat, lon) {
    console.log (lat);
    console.log (lon);
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