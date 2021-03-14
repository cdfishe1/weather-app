[![Generic badge](https://img.shields.io/badge/license-MIT-<COLOR>.svg)](#license)
![GitHub language count](https://img.shields.io/github/languages/count/cdfishe1/weather-app)
![GitHub top language](https://img.shields.io/github/languages/top/cdfishe1/weather-app)

# Weather App

Provides the current and five day weather report when a user inputs a city name

## Table of Contents
* [Weather App](#javascript-quiz-screencast)
* [Deployment](#deployment)
* [Scope of Project](#scope-of-project)
* [Installation](#installation)
* [Code Highlight](#code-highlight)
* [Testing](#testing)
* [Credits](#credits)
* [License](#license)

## Weather App

### Screencast on mobile
![Screencast on mobile](assets/images/demo.gif)


## Deployment

Site deployed at [Charles Fisher](https://cdfishe1.github.io/weather-app/)

## Scope of Project

* Used ES6 features such as const and let for variable declaration and arrow functions to enhance readability of the script.
* Used javascript to dynamically create and populate the contents of elements.
* Used array methods to deduplicate saved cities and to display them in alphabetical order
* Used a details element to provide a simple dropdown list to hide or show the saved cities.
* Used css grid and flexbox to make the site responsive.



## Installation

Deploy the html file and assets folder that contains the images, css, and javascript files on a website host server.

## Code Highlight
This method returns the storedCities array as a new array with unique cities using the Set method.
I used the following article to help me understand this: [Remove Duplicates From An Array](https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/)

```

let deDupedCities = [...new Set(storedCities)];

```

## Testing

Generates 0 errors on load or through execution.

## Credits

David Metcalf, bootcamp tutor, helped me understand how to use a switch statement to refactor a string of else ifs.

## License

Copyright (c) Charles Fisher All rights reserved.<br>
Please be kind and change content if you wish to use this code.

<details><summary>Licensed under the MIT License</summary>

Copyright (c) 2021 - present | Charles Fisher

<blockquote>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</blockquote>
</details>



