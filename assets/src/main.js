//Global Variables
var searchedCities = [];
var searchTerms=[];
var currentWeatherContainerEl=document.querySelector("#current-weather-container");
var citySearchedInputEl = document.querySelector("#searched-city");
var searchHistoryEl;
var searchHistoryButtonEl = document.querySelector("#search-history-button");

//Variable to store API keys
var weatherAPIKey = "c463d1ce337cdd1109532dfc090902c3";
var youTubeAPIKey = "AIzaSyDM2sR2vev0LrWNZ3RLH4-RvSlEH_BV2L0";

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
var queryCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPIKey}`;
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

//Create span element to hold overall weather status 
var statusEl = document.createElement("SPAN");
statusEl.textContent = "Status: " + weather.weather[0].main;
currentWeatherContainerEl.appendChild(statusEl);

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

//Create a span element to hold Humidity data
var humidityEl = document.createElement("SPAN");
humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
currentWeatherContainerEl.appendChild(humidityEl);


//Condition for matching weather status to a playlist - assigns search terms related to weather
var status = (weather.weather[0].main);
if (status == "Clear"){
    var searchTerms = ["clear%20day%20music","summer%20vibes%20playlist","summer%20day%20songs"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm);
    console.log(getSearchTerm,searchTerms[getSearchTerm]);
}

else if (status == "Rain" || status == "Thunderstorm" || status == "Drizzle" || status == "Mist" || status == "Fog" || status == "Clouds"){
    var searchTerms = ["rainy%20day%20music","rainy%20day%20playlist","lofi%20beats%20playlist","bon%20iver%20comfort%20playlist"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    
}

else if (status == "Snow"){
    var searchTerms = ["snow%20christmas%20music","holiday%20playlist","winter%20wonderland%20playlist"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    
}

else if (status == "Smoke" || status == "Haze" || status == "Dust" || status == "Sand" || status == "Ash"){
    var searchTerms = ["fire%20music","hazy%20weather%20playlist"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    
}

else if (status == "Squall" || status == "Tornado"){
    var searchTerms = ["windy%20day%20music","tornado%20playlist","tornado%20music"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    
}

else{ console.log(status)}

};

//Function for YouTube Playlist API Call
/*var youTubeMusic = function(getSearchTerm){
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${getSearchTerm}&key=${youTubeAPIKey}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.items);
    document.querySelector(".youtubeVideo").src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
});
}; */