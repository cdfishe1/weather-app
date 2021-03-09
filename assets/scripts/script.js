

const getApi = () => {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=50df5f30fc22dca71863fda8cb6c6f1d';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // for (var i = 0; i < data.length; i++) {
        //   var userName = document.createElement('h3');
        //   var issueTitle = document.createElement('h4');
        //   var issueBody = document.createElement('p');
        //   userName.textContent = data[i].user.login;
        //   issueTitle.textContent = data[i].title;
        //   issueBody.textContent = data[i].body;
        //   issueContainer.append(userName);
        //   issueContainer.append(issueTitle);
        //   issueContainer.append(issueBody);
        // }
      });
  }

getApi();