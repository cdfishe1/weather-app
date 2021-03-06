// Variables

let currentDate = moment().format("dddd, MMMM Do YYYY");
const apiKey = '50df5f30fc22dca71863fda8cb6c6f1d';
const headerEl = document.querySelector('header');
const currentDay = document.querySelector('#currentDay');
const currentLocBtn = document.querySelector('#currentLocBtn');
const submitCity = document.querySelector('#submitCity');
const savedCities = document.querySelector('#savedCities')
const cityInput = document.querySelector('#cityInput');
const currentCity = document.querySelector('#currentCity');
const fiveDay = document.querySelector('#fiveDay');
const storedCities = JSON.parse(localStorage.getItem("cityNames")) || [];
const displayCitiesList = document.createElement('ul');



// Set current day in header
const dateDisplayEl = document.createElement('p');
dateDisplayEl.innerHTML = currentDate;
currentDay.append(dateDisplayEl);


// Event listener for search button
submitCity.addEventListener('click', function() {
  
    cityName = cityInput.value.trim();

    let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            latitude = data[0].lat;
            longitude = data[0].lon;
            city = data[0].name;
            // Create local storage for previous searched cities
            storedCities.push(cityName);
            //This method returns the storedCities array as a new array with unique cities.
            //I used the following article to help me understand this:  https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
            let deDupedCities = [...new Set(storedCities)];
            deDupedCities.sort();
            localStorage.setItem('cityNames', JSON.stringify(deDupedCities));
            // Call the current and five day weather apis
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
      

        if (currentCity !== null) {
          currentCity.innerHTML = '';
        }

        let cityNameEl = document.createElement('h2');
        // let date = document.createElement('span');
        let currentIconEl = document.createElement('span');

        let tempEl = document.createElement('p')
        let temp = document.createElement('span');

        let humidityEl = document.createElement('p');
        let humidity = document.createElement('span');

        let windSpeedEl = document.createElement('p');
        let windSpeed = document.createElement('span');

        let uvEl = document.createElement('p');
        let uv = document.createElement('span');

        currentCity.style.backgroundColor = '#ADE8F4';
        cityNameEl.textContent = city;
        // date.textContent = currentDate;
        // date.style.fontSize = '1.25rem';
        currentIconEl.innerHTML = `<img src = http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png>`;

        tempEl.textContent = "Temperature: ";
        temp.innerHTML = data.current.temp + ' &deg F'

        humidityEl.textContent = 'Humidity:  '
        humidity.textContent = data.current.humidity + ' %';
      
        windSpeedEl.textContent = 'Wind Speed: ';
        windSpeed.textContent = data.current.wind_speed + ' MPH';

        uvEl.textContent = 'UV Index: ';
        uv.textContent = data.current.uvi;
  

        // currentCity.append(date);
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

        //My tutor, David Metcalf, helped me construct this as a swtich statement rather than a chain of else ifs
        switch (true) {
          case data.current.uvi < 3:
            uv.style.backgroundColor = 'green';
            break;
          case data.current.uvi > 3 && data.current.uvi < 6:
            uv.style.backgroundColor = 'yellow';
            break;
          case data.current.uvi > 6 && data.current.uvi < 8:
            uv.style.backgroundColor = 'orange';
            break;
          case data.current.uvi > 8:
            uv.style.backgroundColor = 'red';
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

  const cityDropDown = document.createElement('details');
  const dropDownTitle = document.createElement('summary');
  dropDownTitle.textContent = 'Previous Cities';

  const clearButtonEl = document.createElement('button');
  clearButtonEl.setAttribute('id', 'clearBtn');
  clearButtonEl.setAttribute('class', 'clear-button');
  clearButtonEl.setAttribute('aria-label', 'Clear Search History');
  clearButtonEl.innerHTML = 'Clear Search History';
  savedCities.append(clearButtonEl);
  
  cityDropDown.append(dropDownTitle);
  cityDropDown.append(displayCitiesList);
  savedCities.append(cityDropDown);

};

makeCityList();


const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', function() {
  localStorage.clear();
})

// Creates the saved cities buttons array and runs an event listener to populate the search input field on click
const cityButtons = document.getElementsByClassName('city-button');
const cityButtonsArray = Array.from(cityButtons);

//Creates the event listner for each saved city button
cityButtonsArray.forEach((button) => {
  button.addEventListener('click', function() {
    cityInput.value = button.value;
    submitCity.click();
  })
})

