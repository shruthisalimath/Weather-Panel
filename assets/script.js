const myApiKey = "f9402ae6820aceae1ad22e887d1fea07";
var searchButtonEL = $("#searchBtn");
//store value of the input
var inputCityEl = $("#inputCity").val();
var citySearchListEl = $("#cityList");
var clearHistoryBtnEl = $("#clearHistory");

var currentCityEl = $("#cityResult");
var currentTempEl = $("#tempResult");
var currentHumidityEl = $("#humidityResult");
var currentWindEl = $("#windResult");
var weatherContainerEl = $("#weatherContainer");


//to acess array of data
var cityArray = [];


//current date
const date = new Date();
var dateString = date.toLocaleDateString();

//check if search history exists when page loads
displayCitySearchList();
clearHistory();

//search element on keypress
$("#inputCity").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});



//Display and save the search history of cities
var storeCityData = function (inputCityEl) {
    
    //get the cityinput from search
    if (inputCityEl) {
        //place value in the array if it is new entry
        if (cityArray.indexOf(inputCityEl) === -1) {
            cityArray.push(inputCityEl);
            //list all the city is the user history
            displayCitySearchList();
            clearHistoryBtnEl.removeClass("hide");
            weatherContainerEl.removeClass("hide");
        }
        else //remove existing value from array
        {
            var removeData = cityArray.indexOf(inputCityEl);
            cityArray.splice(removeData, 1);
            //push the value again to array
            cityArray.push(inputCityEl);
            //list all the city is the user history, so oldvalue appears on top of the search history.
            displayCitySearchList();
            clearHistoryBtnEl.removeClass("hide");
            weatherContainerEl.removeClass("hide");
        }
    }
    console.log(cityArray);
}

//list the array into search history and store in local storage 
function displayCitySearchList() {
    //empty the elements in search history
    citySearchListEl.empty();

    //display the search history with each city in the array

    for (var i = 0; i < cityArray.length; i++) {
        var newSearchCityBtn = $("<button>").attr("type", "button").attr("class", "savedCityBtn");
       
        newSearchCityBtn.attr("data-name", cityArray[i]);
        newSearchCityBtn.text(cityArray[i]);
        citySearchListEl.prepend(newSearchCityBtn);
    }
    //update city list history in local storage
    localStorage.setItem("CITYLIST", JSON.stringify(cityArray));
}


//getting cities stored from localstorage and update in the search history
function getCityInput() {
    if (localStorage.getItem("CITYLIST")) {
        cityArray = JSON.parse(localStorage.getItem("CITYLIST"));
        var lastData = cityArray.length - 1;
        console.log(cityArray);
        displayCitySearchList();
        //Displaylastcityview if the page is refreshed
        if (cityArray.length !== 0) {
            getCurrentWeather(cityArray[lastData]);
            weatherContainerEl.removeClass("hide");
        }

    }
}

//check for any data in the search history to append clearhistory button 
function clearHistory() {
    if (citySearchListEl.text() !== "") {
        clearHistoryBtnEl.removeClass("hide");
    }
}

let validRequest = true;
var getCurrentWeather = function (inputCity) {
    validRequest = false;
    const requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + myApiKey;
    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(function (response) {
        console.log("here u go :" +response);
       
        var cityInfo = response.name;
       
        //get temperature and cover it to fahrenheit
        let temp = (response.main.temp - 273.15) * 1.80 + 32;
        let tempF = Math.floor(temp);

        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        
        var icon = response.weather[0].icon;

        currentCityEl.text(cityInfo + "(" + dateString + ")");
        currentCityEl.append("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' />");
        currentTempEl.text("Temperature: " + tempF + "°F");
        currentWindEl.text("Wind: " + wind + "MPH");
        currentHumidityEl.text("Humidity: " + humidity + "%");
        validRequest = true;
      
    });
    
}

var getForecast = function (inputCityEl) {
    
    const foreCastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCityEl + "&appid=" + myApiKey;
    
    $.ajax({
        url: foreCastUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $("#forecast").empty();
        //var to hold response.list
        var result = response.list;
        console.log(result);
        for (var i = 0; i < 5; i++) {
            console.log(result[i]);
            // var foreCastDate = moment(result[i].dt_txt).format("L");
            var date = new Date();
            var foreCastDate = (date.getMonth() + 1) + "/" + (date.getDate() + i + 1) + "/" + date.getFullYear();
            console.log(foreCastDate);
            //get temperature and cover it to fahrenheit
            var temp = (result[i].main.temp - 273.15) * 1.80 + 32;
            var tempF = Math.floor(temp);

            var card = $("<div>").addClass("card col-12 col-md-2 ");
            var cardBody = $("<div>").addClass("card-body p-3 foreCastBody");
            var cityDate = $("<h4>").addClass("card-title").text(foreCastDate);
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

searchButtonEL.on("click", function (event) {

    event.preventDefault();
    //  Get city name from user input and attempt to display weather
    var inputCityEl = $("#inputCity").val().trim().toUpperCase();
    if ($("#inputCity").val() === "" ) {
        alert("Please Enter valid city name to display current weather");
    }
    else {
        getCurrentWeather(inputCityEl);
        
        getForecast(inputCityEl);
        storeCityData(inputCityEl);
        //displayCitySearchList();
        $("#inputCity").val("");

    }
});

//  search city history button will retrive weather info of that city
citySearchListEl.on("click",".savedCityBtn", function (event) {
    
    event.preventDefault();
    console.log(" $this :" + $(this).text());
    
    var inputCityVal = $(this).text();
    console.log("inputCityVal : " + inputCityVal);
    getCurrentWeather(inputCityVal);
    getForecast(inputCityVal);
    //storeCityData(inputCityVal);
});

//clears search history of old value
clearHistoryBtnEl.on("click", function () {
    localStorage.clear();
    location.reload();
    
});