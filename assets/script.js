// DOM Elements & Variables
var citySearch = $('.citySearch');
var searchBtn = $('.searchBtn');
var searchHistoryContainer = $('.searchHistory');
var cityHistory = [];
var cityName = $('.cityName');
var cityTemp = $('.cityTemp');
var cityWind = $('.cityWind');
var cityHumidity = $('.cityHumidity');
var fiveDayContainer = $('.fiveDayContainer');
var APIKey = 'f28365ef199fb9cd47b8171923d046b6'

// Get Searched City Name
searchBtn.click(searchCity);

function searchCity(event) {
    event.preventDefault();
    var userCityName = citySearch.val();

    var userLat;
    var userLon;

    var fetchURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userCityName + '&appid=' + APIKey;
    fetch(fetchURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       userLat = data[0].lat;
       userLon = data[0].lon;
       fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + userLat + '&lon=' + userLon + '&units=imperial&appid=' + APIKey)
       .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        cityName.text(data.city.name);
        cityTemp.text(Math.round(data.list[0].main.temp));
        cityWind.text(data.list[0].wind.speed);
        cityHumidity.text(data.list[0].main.humidity);
        if (cityHistory.indexOf(data.city.name) === -1 ){
            cityHistory.push(data.city.name);
            addToHistory(data.city.name);
        }
        console.log(data)
        fiveDayForecast = [{
            date: data.list[8].dt_txt,
            temp: data.list[8].main.temp,
            wind: data.list[8].wind.speed,
            humidity: data.list[8].main.humidity,
        },
        {
            date: data.list[16].dt_txt,
            temp: data.list[16].main.temp,
            wind: data.list[16].wind.speed,
            humidity: data.list[16].main.humidity, 
        },
        {
            date: data.list[24].dt_txt,
            temp: data.list[24].main.temp,
            wind: data.list[24].wind.speed,
            humidity: data.list[24].main.humidity,
        },
        {
            date: data.list[32].dt_txt,
            temp: data.list[32].main.temp,
            wind: data.list[32].wind.speed,
            humidity: data.list[32].main.humidity,
        },
        {
            date: data.list[39].dt_txt,
            temp: data.list[39].main.temp,
            wind: data.list[39].wind.speed,
            humidity: data.list[39].main.humidity,
        }]
        for (i = 0; i < fiveDayForecast.length; i++) {
            var card = document.createElement('div');
            card.innerHTML = `<div class="card-header"><h4>${fiveDayForecast[i].date}</h4></div>
          <div class="card-body">
            <p class="card-text">Temp: ${Math.round(fiveDayForecast[i].temp)} °F</p>
            <p class="card-text">Temp: ${fiveDayForecast[i].wind} MPH</p>
            <p class="card-text">Temp: ${fiveDayForecast[i].humidity}%</p>
          </div>`;
          fiveDayContainer.append(card);
        }

        })
    }).then(function () {citySearch.val("")})
}

function addToHistory(city) {
    searchHistoryEl = document.createElement('button');
    searchHistoryEl.setAttribute('class', 'btn btn-secondary col-12 mb-3');
    searchHistoryEl.innerText = city;
    searchHistoryContainer.append(searchHistoryEl);
}