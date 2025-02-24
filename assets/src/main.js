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

//Search bar kepress event handler & click action function - 
//reads user input from search bar, calls currentCityWeatherFunction, saveSearch function, and clears the search bar input
$("input").keypress(function(event) {
    if (event.which === 13){
        event.preventDefault();
        //console.log("it worked"); 
        $("#submit").click(); 
    }; 
 });

$("#submit").click(function(event){
    event.preventDefault();
var city = $("#searchBar").val();
if(city){
    currentCityWeather(city);
    searchedCities.unshift(city);
    searchHistory(city);
}

saveSearch();

//Clear search bar
$("#searchBar").val("")

});

//Function to save user input to local storage
var saveSearch = function(){
    localStorage.setItem("searchedCities",JSON.stringify(searchedCities));
};

//Function to save user input as buttons
var searchHistory = function(searchHistory){

    searchHistoryEl = document.createElement("button");
    searchHistoryEl.textContent = searchHistory;
    searchHistoryEl.classList = "d-flex w-100 justify-content-center border btn-light rounded p-2 mb-3 mt-3"
    searchHistoryEl.setAttribute("data-city", searchHistory)

    searchHistoryButtonEl.prepend(searchHistoryEl);

};

//Search history buttons re-search that city on click
var searchHistoryHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        currentCityWeather(city);

    }
};

//Event listener added to the search history button element that calls searchHistoryHandler
//when buttons are clicked
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
    var searchTerms = ["clear%20day%20music","No%20copyright%sunny%20day%music","summer%20day%20music%20no%20copyright"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm);
    console.log(getSearchTerm,searchTerms[getSearchTerm]);
}

else if (status == "Rain" || status == "Thunderstorm" || status == "Drizzle" || status == "Mist" || status == "Fog" || status == "Clouds"){
    var searchTerms = ["rainy%20day%20music","lofi%20beats%20playlist","bon%20iver%20comfort%20playlist"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    console.log(getSearchTerm,searchTerms[getSearchTerm]);

}

else if (status == "Snow"){
    var searchTerms = ["No%20Copyright%20Lofi%20Christmas%20Playlist%202022","Snowy%20village%20fairy%20tale%20sleep%20music","No%20Copyright%20Music:%20Christmas%20Instrumentals"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    console.log(getSearchTerm,searchTerms[getSearchTerm]);
    
}

else if (status == "Smoke" || status == "Haze" || status == "Dust" || status == "Sand" || status == "Ash"){
    var searchTerms = ["//%20Back%20to%20the%2080's...%20again%20//%20Synthwave%20Mix%20Part%2018","Alone%20and%20Peace%20|%20Beautiful%20Ambient%20Mix"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    console.log(getSearchTerm,searchTerms[getSearchTerm]);
    
}

else if (status == "Squall" || status == "Tornado"){
    var searchTerms = ["//%20Back%20to%20the%2080's...%20again%20//%20Synthwave%20Mix%20Part%2018","Studying%20with%20poets%20long%20gone%20-%20A%20DARK%20ACADEMIA%20PLAYLIST"];
    var getSearchTerm = searchTerms[Math.floor(Math.random()*searchTerms.length)];
    youTubeMusic(getSearchTerm)
    console.log(getSearchTerm,searchTerms[getSearchTerm]);
    
}

else{ console.log(status)}

};

//Function for YouTube API Call
var youTubeMusic = function(getSearchTerm){
    
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${getSearchTerm}&type=video&videoEmbeddable=true&videoSyndicated=true&key=${youTubeAPIKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.items);
    document.querySelector(".youtubeVideo").src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
});
};

//click action function - uses "mood" buttons to change page background 
$('#vibrant-nature').click(function() {
    $("body").css("background","url(https://images.unsplash.com/photo-1471644806490-77c53366b18b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80)");
})

$('#linux-nebulous').click(function() {
    $("body").css("background","url(https://wallpapercave.com/wp/scUll9f.jpg)");
})

$('#cloud-shapes').click(function() {
    $("body").css("background","url(https://images.unsplash.com/photo-1498496294664-d9372eb521f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)");
})

$('#rainy-day').click(function() {
    $("body").css("background","url(https://images.unsplash.com/photo-1664531685548-f77f1da7c010?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)");
})

$('#winter-wonderland').click(function() {
    $("body").css("background","url(https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1624&q=80)");
})

