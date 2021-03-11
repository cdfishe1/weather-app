const submitCity = document.querySelector('#submitCity');
const cityInput = document.querySelector('#cityName');
let currentDate = moment().format("dddd, MMMM Do YYYY");
const currentCity = document.querySelector('#currentCity');
const fiveDay = document.querySelector('#fiveDay');
const apiKey = '50df5f30fc22dca71863fda8cb6c6f1d';


submitCity.addEventListener('click', function() {
    cityName = cityInput.value.trim();
    let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            latitude = data[0].lat;
            longitude = data[0].lon;

            getCurrentWeatherApi(latitude, longitude);

        })
        
  
});

const getCurrentWeatherApi = (latitude, longitude) => {
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

        let cityNameEl = document.createElement('h2');
        let date = document.createElement('span');
        let currentIconEl = document.createElement('span');

        let tempEl = document.createElement('p')
        let temp = document.createElement('span');

        let humidityEl = document.createElement('p');
        let humidity = document.createElement('span');

        let windSpeedEl = document.createElement('p');
        let windSpeed = document.createElement('span');

        let uvEl = document.createElement('p');
        let uv = document.createElement('span');

        cityNameEl.textContent = 'Chicago ';
        date.textContent = currentDate;
        date.style.fontSize = '1.25rem';
        currentIconEl.innerHTML = `<img src = http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png>`;

        tempEl.textContent = "Temperature: ";
        temp.innerHTML = data.current.temp + ' &deg F'

        humidityEl.textContent = 'Humidity:  '
        humidity.textContent = data.current.humidity + ' %';
      
        windSpeedEl.textContent = 'Wind Speed: ';
        windSpeed.textContent = data.current.wind_speed + ' MPH';

        uvEl.textContent = 'UV Index: ';
        uv.textContent = data.current.uvi;

        currentCity.append(cityNameEl);
        cityNameEl.append(date);
        currentCity.append(currentIconEl);

        tempEl.append(temp);
        currentCity.append(tempEl);

        humidityEl.append(humidity);
        currentCity.append(humidityEl);

        windSpeedEl.append(windSpeed);
        currentCity.append(windSpeedEl);

        uvEl.append(uv);
        currentCity.append(uvEl);
        
      
    });
};

// getCurrentWeatherApi();

const getFiveDayApi = () => {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&units=imperial&appid=50df5f30fc22dca71863fda8cb6c6f1d';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 1; i <= 5; i++) {
        const fiveDayContainerEl = document.createElement('div');
        fiveDayContainerEl.setAttribute('class', 'card');
        const fiveDayDateEl = document.createElement('h3');
        const fiveDayIconEl = document.createElement('span');
        const fiveDayTempEl = document.createElement('p');
        const fiveDayTemp = document.createElement('span');
        const fiveDayHumidityEl = document.createElement('p');
        const fiveDayHumidity = document.createElement('span');
        let dateString = moment.unix(data.daily[i].dt).format("dddd");

        fiveDayDateEl.innerHTML = dateString;
        fiveDayIconEl.innerHTML = `<img src = http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png>`;
        fiveDayTempEl.innerHTML = 'Temp: ';
        fiveDayTemp.innerHTML = data.daily[i].temp.day + ' &deg F';
        fiveDayHumidityEl.innerHTML = 'Humidity ';
        fiveDayHumidity.innerHTML = data.daily[i].humidity + ' %';

        fiveDayContainerEl.append(fiveDayDateEl);
        fiveDayContainerEl.append(fiveDayIconEl);
        fiveDayContainerEl.append(fiveDayTempEl);
        fiveDayTempEl.append(fiveDayTemp);
        fiveDayContainerEl.append(fiveDayHumidityEl);
        fiveDayHumidityEl.append(fiveDayHumidity);
        fiveDay.append(fiveDayContainerEl);

      }
    });
};

// getFiveDayApi();



