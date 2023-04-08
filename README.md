# Weather-Panel
Weather Dashboard- homework-6
to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

## User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## MOCKUP:

![Weather-DashBoard](./assets/images/06-server-side-apis-homework-demo.png)

## Screen shot 
 ![Weather-Panel](.assets/images/Screen_Shot_Weather_Dashboard.png)

## Discription of the Challenge: Weather Dashboard
1. Initally commited codes for basic HTML and CSS.
2. started coding in javascript for the funcion of the Weather dashboard page to satisfy the acceptence criteria for the challenge needed.
3. For this challenge used server side API from openweathermap.org .
4. Generated seperate API key to use for the base URL which helps to retrive weather data fro cities.
5. URL used to retrive current weather is :
  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
6. URL used to retrive 5 days weather forecast for the particular city is :
  https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
7. when a city name is input in the input form and clicked on the submit button then, getCurrentWeather(), 
  getForecast(), storeCityData() are being called .
8. getCurrentWeather() - code to retive current weather of the search input city. It append searched    
   city name, current date, temperature in F, WindSpeed in MPH and humidity in %.and Image icon using API URL.
9. getForecast() - code to retive 5 days weather forecast of the search input city. It append searched  
   current date, temperature in F, WindSpeed in MPH and humidity in %.and Image icon using API URL.
10. storeCityData() - Displays and save the search history of cities in the page. city display is called by     displayCitySearchList()
11. displayCitySearchList() - Each search city is listed in the array of  search history and also store in these city in local storage.
12. Each searched city in the saerch histort has a click event listner.
13. when clicked on particular city it retrives cureent weather and also 5 days weather forecast.
14. Also created a clear histort button when clicked it clears store cities in search history and clears local storage as well as reloads homepage.
15. Finally deployed the application.

## URL
1.The URL of the deployed application:



2.The URL of the GitHub repository:


