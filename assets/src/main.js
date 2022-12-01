//Global Variables
var searchedCities = [];
var currentWeatherContainerEl=document.querySelector("#current-weather-container");
var citySearchedInputEl = document.querySelector("#searched-city");
var searchHistoryEl;
var searchHistoryButtonEl = document.querySelector("#search-history-button");

//Variable to store API key
var APIKey = "c463d1ce337cdd1109532dfc090902c3";

//Search bar click action function - reads user input from search bar, calls currentCityWeatherFunction and saveSearch function
$("#submit").click(function(event){
    event.preventDefault();

var city = $("#searchBar").val();
if(city){
    currentCityWeather(city);
    searchedCities.unshift({city});
    searchHistory(city);

}

saveSearch();

});

//Function to save user input to local storage
var saveSearch = function(){
    localStorage.setItem("searchedCities",JSON.stringify(searchedCities));
};

//Function to save user search history as buttons
var searchHistory = function(searchHistory){

    searchHistoryEl = document.createElement("button");
    searchHistoryEl.textContent = searchHistory;
    searchHistoryEl.classList = "d-flex w-100 justify-content-center border btn-light rounded p-2 mb-3 mt-3"
    searchHistoryEl.setAttribute("data-city", searchHistory)
    searchHistoryEl.setAttribute("type","submit");

    searchHistoryButtonEl.prepend(searchHistoryEl);

};

//Search history buttons re-search that city on click
var searchHistoryHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        currentCityWeather(city);

    }
};

searchHistoryButtonEl.addEventListener("click",searchHistoryHandler);

//Function for Current Weather API Call
var currentCityWeather = function(city){
var queryCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
fetch(queryCurrentWeatherURL)
.then(function(response){
    response.json().then(function(data){
        displayCurrentWeather(data,city);
        });
    });
};

//Function for displaying current weather data for searched city 
var displayCurrentWeather =function(weather,searchedCity){
    currentWeatherContainerEl.textContent="";
    citySearchedInputEl.textContent=searchedCity;

//Format date element and append to searched city
var currentDate = document.createElement("SPAN");
currentDate.textContent=" (" + moment(weather.dt.value).format('L')+ ") ";
citySearchedInputEl.appendChild(currentDate);

//Create image element and append to searched city
var weatherIcon = document.createElement("img");
weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
citySearchedInputEl.appendChild(weatherIcon);

//Create span element to hold Temperature data
var temperatureEl = document.createElement("SPAN");
temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
currentWeatherContainerEl.appendChild(temperatureEl);

//Create a span element to hold Windspeed data
var windSpeedEl = document.createElement("SPAN");
windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
currentWeatherContainerEl.appendChild(windSpeedEl);

//Create a span element to hold Humidity data
var humidityEl = document.createElement("SPAN");
humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
currentWeatherContainerEl.appendChild(humidityEl);

};