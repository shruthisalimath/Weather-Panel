const myApiKey = "f9402ae6820aceae1ad22e887d1fea07";
var searchButton = $("#searchBtn");
//store value of the input
var inputCityEl = $("#inputCity").val();
var citySearchList = $("#cityListBtn");
var currentCityEl = $("#cityResult");
var currentTempEl = $("#tempResult");
var currentHumidityEl = $("#humidityResult");
var currentWindEl = $("#windResult");
var forcastEl = $("#forecastContaine");

const date =new Date();
var dateString = date.toLocaleDateString();

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



var getCityWeather = function(inputCityEl)
{
    //var city = $("#currentCity");
    const requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCityEl + "&appid=" + myApiKey;
    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(function(response)
    {
        var cityInfo = response.name;
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        //var lat = response.coord.lat;
       // var lon = response .coord.lon;
        var icon = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        currentCityEl.text(cityInfo + "(" + dateString + ")" + iconUrl);
        currentTempEl.text("Temperature: " + temp + "&deg;F");
        currentHumidityEl.text("Humidity: " + humidity + "%");
        currentWindEl.text("Wind: " + wind + "MPH");
    })
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

