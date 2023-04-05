const myApiKey = "f9402ae6820aceae1ad22e887d1fea07";
var searchButton = $("#searchBtn");
//store value of the input
var inputCityEl = $("#inputCity").val();
var citySearchListEl = $("#cityListBtn");

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

//var cityArray = [];

//getting cities stored in localstorage
var cityArray = JSON.parse(localStorage.getItem("savedCities")) || [];


//storing input cities to the localStorage
var storeCityData = function(inputCityEl)
{
    
    var inputCityEl = $("#inputCity").val().trim().toLowercase();
     if (savedCities !== null) //if localStorage exists,then parse data
     {
        cityArray = JSON.parse(savedCities);
     }
     else //if localStorage doenst exist, create empty array to store data
     {
        cityArray = [];
     }

     if(!cityArray.includes(inputCityEl))//Add city to localStorage if not there
     {
        cityArray.push(inputCityEl);
        localStorage.setItem("savedCities",JSON.stringify(cityArray));
     }
}
   

function displayCitySearchList()
{   
    
    citySearchListEl.empty();
     if (savedCities !== null)//if localStorage exists parse data
    {
        var clearButton =$("<button>").attr("id","clearCityBtn");
        clearButton.text("Clear Hisitoy");
        citySearchListEl.append(clearButton);
        
        cityArray = JSON.parse(savedCities);
        for ( var i = 0; i < cityArray.length; i++)
        {
            var newButton = $("<button>").attr("type","button").attr("class","savedCityBtn");
            //newButton.attr("data-name",cityArray[i]);
            newButton.text(cittyArray[i]);
            citySearchListEl.append(newButton);
        }
    }
    else //if no localStorage
    {
        citySearchListEl.text("No previous search");    
    }
}
//removes city search history from local storage
function clearHistory()
{
    localStorage.removeItem("savedCities");
    displayCitySearchList();
}

var getCurrentWeather = function(inputCity)
{
    
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
           // var foreCastDate = moment(result[i].dt_txt).format("L");
           var date = new Date();
          var foreCastDate=(date.getMonth()+1)+"/"+(date.getDate()+i+1)+"/"+date.getFullYear();
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

//event listner for search city button 

$("#searchBtn").on("click",function (event) {
    
    event.preventDefault();
    if($("#inputCity").val() === "")
    {
        alert("Please Enter valid city name to display current weather");
    }
    else 
    {   //  Get city name from user input and attempt to display weather
        var inputCityEl =$("#inputCity").val();
        getCurrentWeather(inputCityEl);
        getForecast(inputCityEl);
        storeCityData();
        citySearchList();

        $("#inputCity").val("");
         //$("#forecastContainer").addClass('show');
    }
});

// event listner for search city history button
$("#cityListBtn").on("click",function(event)
{
    event.preventDefault();
    var element = event.target;
  if (element.className.includes('savedCityBtn')) 
  { // Get city name from button and display weather
    var inputCityEl = element.textContent;
    getCurrentWeather(inputCityEl);
        getForecast(inputCityEl);
  } else if (element.id == 'clearCityBtn') { // Clear history from local storage
    console.log('Clear search history')
    clearHistory();
  }
});

// Display previously searched cities
displayCitySearchList();



