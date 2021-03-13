// Variables

let currentDate = moment().format("dddd, MMMM Do YYYY");
const apiKey = '50df5f30fc22dca71863fda8cb6c6f1d';
const submitCity = document.querySelector('#submitCity');
const savedCities = document.querySelector('#savedCities')
const cityInput = document.querySelector('#cityInput');
const currentCity = document.querySelector('#currentCity');
const fiveDay = document.querySelector('#fiveDay');
const storedCities = JSON.parse(localStorage.getItem("cityNames")) || [];
const displayCitiesList = document.createElement('ul');


// Event listener for search button
submitCity.addEventListener('click', function() {
  
    cityName = cityInput.value.trim();
    // // cityName.split(',');
    // let cityNameComma = cityName.split(',');
    // if (cityNameComma) {
    //   console.log(true);
    // } 
    // // let cityNameSpace = cityName.split(' ');
    // // console.log(cityNameSpace);
    // // console.log(cityNameComma);
    let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            latitude = data[0].lat;
            longitude = data[0].lon;
            city = data[0].name;

            storedCities.push(cityName);
            let deDupedCities = [...new Set(storedCities)];
            deDupedCities.sort();
            localStorage.setItem('cityNames', JSON.stringify(deDupedCities));

            getCurrentWeatherApi(latitude, longitude, city);
            getFiveDayApi(latitude, longitude);

        })
        
  
});

// Gets the api for the current day's weather and creates that section
const getCurrentWeatherApi = (latitude, longitude, city) => {
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

        if (currentCity !== null) {
          currentCity.innerHTML = '';
        }

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

        cityNameEl.textContent = city;
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
  

        currentCity.append(date);
        currentCity.append(cityNameEl);
        currentCity.append(currentIconEl);

        tempEl.append(temp);
        currentCity.append(tempEl);

        humidityEl.append(humidity);
        currentCity.append(humidityEl);

        windSpeedEl.append(windSpeed);
        currentCity.append(windSpeedEl);

        uvEl.append(uv);
        currentCity.append(uvEl);

        //I tried to make this a switch statement, but it did not work, even with tutor help.
        if (data.current.uvi < 3) {
          uv.style.backgroundColor = 'green';
          uv.style.color = 'white';
        } else if (data.current.uvi > 3 || data.current.uvi < 6) {
          uv.style.backgroundColor = 'yellow';
        } else if (data.current.uvi > 6 || data.current.uvi < 8) {
          uv.style.backgroundColor = 'orange';
          uv.style.color = 'white';
        } else {
          uv.style.backgroundColor = 'red';
          uv.style.color = 'white';
        }
        
      
    });
};

// Grabs the api for the five day forecast and creates that section with individual days
const getFiveDayApi = (latitude, longitude) => {
  var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (fiveDay !== null) {
        fiveDay.innerHTML = '';
      }
      
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

// Creates the saved cities buttons
const makeCityList = () => {
  storedCities.forEach((city) => {
    const cityItem = document.createElement('li');
    const cityItemButton = document.createElement('button');
    cityItemButton.setAttribute('class', 'city-button');
    cityItemButton.setAttribute('value', city); 
    cityItemButton.innerHTML = city;
    cityItem.append(cityItemButton);
    displayCitiesList.append(cityItem);
  })
  savedCities.append(displayCitiesList);
};

makeCityList();

// Creates the saved cities buttons array and runs an event listener to populate the search input field on click
const cityButtons = document.getElementsByClassName('city-button');
const cityButtonsArray = Array.from(cityButtons);

cityButtonsArray.forEach((button) => {
  button.addEventListener('click', function() {
    cityInput.value = button.value;
    submitCity.click();
  })
})

