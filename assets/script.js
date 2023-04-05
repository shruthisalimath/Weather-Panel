const myApiKey = "f9402ae6820aceae1ad22e887d1fea07";
var searchButton = $("#searchBtn");
//store value of the input
var inputCityEl = $("#inputCity").val();
var citySearchList = $("#cityListBtn");

var currentCityEl = $("#cityResult");
var currentTempEl = $("#tempResult");
var currentHumidityEl = $("#humidityResult");
var currentWindEl = $("#windResult");

var forcastEl = $("#forecastContainer");

const date =new Date();
var dateString = date.toLocaleDateString();

//var lat = response.coord.lat;
//var lon = response .coord.lon;

$("#inputCity").keypress(function(event) 
{
    if(event.keyCode === 13)
    {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

//getting cities stored in localstorage
var cityArray = JSON.parse(localStorage.getItem("savedCities")) || [];



var getCurrentWeather = function(inputCity)
{
    //var city = $("#currentCity");
    const requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + myApiKey;
    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(function(response)
    {
        console.log(response);
        var cityInfo = response.name;
        //get temperature and cover it to fahrenheit
        let temp = (response.main.temp - 273.15) * 1.80 + 32;
        let tempF = Math.floor(temp);

        //var temp = response.main.temp;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        //var lat = response.coord.lat;
       // var lon = response .coord.lon;
        var icon = response.weather[0].icon;
       // var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        currentCityEl.text(cityInfo + "(" + dateString + ")"); 
        currentCityEl.append("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' />" );
        currentTempEl.text("Temperature: " + tempF + "°F");
        currentWindEl.text("Wind: " + wind + "MPH");
        currentHumidityEl.text("Humidity: " + humidity + "%");
        
    });
}

var getForecast = function(inputCityEl)
{
   // var lat = response.coord.lat;
    //var lon = response.coord.lon;
    //const foreCastUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + myApiKey + "&lat=" + lat +  "&lon=" + lon;
    const foreCastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCityEl + "&appid=" + myApiKey;
        //const foreCastUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputCityEl + "&cnt=" + 5 + "&appid=" + myApiKey;
    $.ajax({
        url: foreCastUrl,
        method: "GET",
    }).then(function(response)
    {
        console.log(response);
       
        $("#forecast").empty();
        //var to hold response.list
        var result = response.list;
        console.log(result);
        for (var i = 0; i < 5; i++)
        {
            console.log(result[i]);
            var foreCastDate = moment(result[i].dt_txt).format("L");
            console.log(foreCastDate);
            //get temperature and cover it to fahrenheit
            var temp = (result[i].main.temp - 273.15) * 1.80 + 32;
            var tempF = Math.floor(temp);

            var card = $("<div>").addClass("card col-md-2 ");
            var cardBody = $("<div>").addClass("card-body p-3 foreCastBody");
            var cityDate = $("<h3>").addClass("card-title").text(foreCastDate);
            var cityTemp = $("<p>").addClass("card-text foreCastTemp").text("Temperature : " + tempF + "°F");
            var cityWind = $("<p>").addClass("card-text foreCastWind").text("Wind : " + result[i].wind.speed + "MPH");
            var cityHumidity = $("<p>").addClass("card-text foreCastHumid").text("Humidity : " + result[i].main.humidity + "%");
            var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + result[i].weather[0].icon + ".png");

            cardBody.append(cityDate, image, cityTemp, cityWind, cityHumidity);
            card.append(cardBody);
            $("#forecast").append(card);
        }

    });
}




$("#searchBtn").on("click",function (event) {
    
    event.preventDefault();
    if($("#inputCity").val() === "")
    {
        alert("Please Enter valid city name to display current weather");
    }
    else {
        var inputCityEl =$("#inputCity").val();
        getCurrentWeather(inputCityEl);
        getForecast(inputCityEl);
        $("#inputCity").val("");
         //$("#forecastContainer").addClass('show');
    }
});

