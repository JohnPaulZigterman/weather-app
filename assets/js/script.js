//establishes variables for HTML id tags
var citySearch = document.querySelector('#city-search');
var submitButton = document.querySelector('#submit-button');
var boxContainer = document.querySelector('#box-container');
var heroContainer = document.querySelector('#hero-container');
var savedCities = document.querySelector('#saved-cities');

//declares autoFill function
function autoFill () {

    //checks if cityList is declared
    if (localStorage.getItem('cityList') == null) {

        //if undeclared, sets cityList to an array of four cities
        localStorage.setItem('cityList', '["London", "New York", "Chicago", "Los Angeles"]');
    }

    //retrieves cityList in local storage as a string
    var cityListString = localStorage.getItem('cityList');

    //converts that string to an array
    var cityList = JSON.parse(cityListString);

    //clears saved cities buttons
    savedCities.innerHTML = "";

    //populates saved cities buttons with array from local storage
    for (var i = 0; i < cityList.length; i++) {
        savedCities.innerHTML += '<button id="' + cityList[i] + '">' + cityList[i] + '</button>';
    }
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


        var tempCelsius = (data.list[0].main.temp - 273.15).toFixed(1);
        var milliseconds = (data.list[0].dt * 1000);
        var weatherIcon = data.list[0].weather[0].icon;
        var dateObject = new Date(milliseconds).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
        heroContainer.innerHTML += "<div class='col-10 weather-box'><h3>" + dateObject + "</h3><img src='https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'><h4>Temp: </h4><p>" + tempCelsius + "C°</p><h4>Humidity: </h4><p>" + data.list[0].main.humidity + "%</p><h4>Wind Speed: </h4><p>" + data.list[0].wind.speed + "mph</p></div><br>";

        for (let i = 7; i < 40; i += 8) {
            var tempCelsius = (data.list[i].main.temp - 273.15).toFixed(1);
        var milliseconds = (data.list[i].dt * 1000);
        var dateObject = new Date(milliseconds).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
        var weatherIcon = data.list[i].weather[0].icon;
        boxContainer.innerHTML += "<div class='col-2 weather-box'><h4>" + dateObject + "</h4><img src='https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'><h4>Temp: </h4><p>" + tempCelsius + "C°</p><h4>Humidity: </h4><p>" + data.list[i].main.humidity + "%</p><h4>Wind Speed: </h4><p>" + data.list[i].wind.speed + "mph</p></div>";
        }
    })
}


//event listener for submit button
submitButton.addEventListener('click', function(event) {
    
    //prevents default activity
    event.preventDefault();

    //cityQuery variable is set to search field input
    var cityQuery = citySearch.value;

    //adds cityQuery to local storage array of saved cities

    //sets cityListString to the current local storage cityList
    var cityListString = localStorage.getItem('cityList');

    //sets cityList to the parsed array of cityListString
    var cityList = JSON.parse(cityListString);

    //pushes the cityQuery value to the cityList array
    cityList.push(cityQuery);

    //makes cityList back into a string
    cityListString = JSON.stringify(cityList);

    //stores cityList as updated string
    localStorage.setItem('cityList', cityListString);

    //calls autoFill function to refill saved cities
    autoFill();

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
autoFill();