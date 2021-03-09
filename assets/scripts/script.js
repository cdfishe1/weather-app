const getLocationApi = () => {
    let requestUrl = 'https://geocode.xyz/Chicago?json=1&auth=519255307879293338914x49061';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}; 

getLocationApi();


const getWeatherApi = () => {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&units=imperial&appid=50df5f30fc22dca71863fda8cb6c6f1d';
    let currentDate = moment().format("dddd, MMMM Do YYYY");
    let currentCity = document.querySelector('#currentCity');
    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        
          let cityName = document.createElement('h2');
          let date = document.createElement('span');

          let tempPlace = document.createElement('p')
          let temp = document.createElement('span');

          let humidityPlace = document.createElement('p');
          let humidity = document.createElement('span');

          let windSpeedPlace = document.createElement('p');
          let windSpeed = document.createElement('span');

          let uvPlace = document.createElement('p');
          let uv = document.createElement('span');

          cityName.textContent = 'Chicago';
          date.textContent = currentDate;

          tempPlace.textContent = "Temperature: ";
          temp.innerHTML = data.current.temp + ' &deg F'

          humidityPlace.textContent = 'Humidity:  '
          humidity.textContent = data.current.humidity + ' %';
        
          windSpeedPlace.textContent = 'Wind Speed: ';
          windSpeed.textContent = data.current.wind_speed + ' MPH';
          console.log(data.current.weather);

          uvPlace.textContent = 'UV Index: ';
          uv.textContent = data.current.uvi;

          currentCity.append(cityName);
          cityName.append(date);

          tempPlace.append(temp);
          currentCity.append(tempPlace);

          humidityPlace.append(humidity);
          currentCity.append(humidityPlace);

          windSpeedPlace.append(windSpeed);
          currentCity.append(windSpeedPlace);

          uvPlace.append(uv);
          currentCity.append(uvPlace);
          
        
      });
  }

getWeatherApi();