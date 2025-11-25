// Grab references to input fields and button
const input = document.getElementById("cityInput"); //city input
const button = document.querySelector(".search-box button"); //search button
const inputDays = document.getElementById("dayInput"); // days input

// Add your WeatherAPI key here
const API_KEY = "";
let days;

button.addEventListener("click", () => {
    const city = input.value.trim();
    days = inputDays.value;

    // Validate the days input before making API call
    if(!isValidSearch(inputDays)){
        return;
    }

    // Fetch weather forecast data from WeatherAPI
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no
`)
        .then(response => {
            if (!response.ok) {
                alert("City not found");
            }
            return response.json();
        })
        .then(data => {
            //console.log(data)
            removeElement();
            createWeatherCurrent(data)
            setWidth();
            createWeatherForecast(data)
        })
        .catch(error => {
            console.log(error);
            alert("Error fetching data!");
        });

});

// Validate the days input
function isValidSearch(inputDays){
    if(days > 4){
        alert("Days cannot be larger than 4!");
        return false;
    }else if(days <= 0){
        alert("Days cannot be zero or negative number");
        return false;
    }

    if(inputDays.value.trim() === ""){
        alert("Days is empty!");
        return false;
    }

    return true;
}

// Dynamically set the width of the app based on number of days
function setWidth(){
    const weatherApp = document.getElementById("weather-app");
    let width = days * 300;
    weatherApp.style.width = width.toString() + "px";
}

// Create card for current weather
function createWeatherCurrent(data){
    const card = document.createElement("div");
    card.className = "weather-info";


    const city = document.createElement("h1");
    city.className = "city";
    city.textContent = "Today";

    const image = document.createElement("img");
    image.className = "image"
    image.src = data.current.condition.icon;

    const temperature = document.createElement("p");
    temperature.className = "temperature";
    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;

    const humidity = document.createElement("p");
    humidity.className = "humidity"
    humidity.textContent = `Humidity: ${data.current.humidity}%`;

    appendChildren(card,city, image, temperature, humidity)

    const container = document.getElementById("weather-container");
    container.appendChild(card);
}

// Create forecast cards for upcoming days
function createWeatherForecast(data){
    const today = new Date();
    let weekdayNumber = today.getDay() + 1; //Starts from tomorrow
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekdayName = weekdays[weekdayNumber];
   

    for(let i = 0; i < days - 1; i++){
         if(weekdayNumber == 6){
            weekdayNumber = 0; //Start weekdays again
        }

        weekdayName = weekdays[weekdayNumber + i];
        const card = document.createElement("div");
        card.className = "weather-info";

        const city = document.createElement("h1");
        city.className = "city";
        city.textContent = `${weekdayName}`;

        const image = document.createElement("img");
        image.className = "image"
        image.src = data.forecast.forecastday[i].day.condition.icon;

        const temperature = document.createElement("p");
        temperature.className = "temperature";
        temperature.textContent = `Temperature: ${data.forecast.forecastday[i].day.avgtemp_c}°C`;

        const humidity = document.createElement("p");
        humidity.className = "humidity"
        humidity.textContent = `Humidity: ${data.forecast.forecastday[i].day.avghumidity}%`;

        appendChildren(card,city, image, temperature, humidity)

        const container = document.getElementById("weather-container");
        container.appendChild(card);
    }
}

//Helper function to append all children to the card
function appendChildren(card,city, image, temperature, humidity){
    let arr = [city,image,temperature,humidity];

    arr.forEach(element => {
        card.appendChild(element);

    });
}

// Remove all existing weather cards before adding new ones
function removeElement(){
    const cards = document.querySelectorAll(".weather-info");

    cards.forEach(card => {
        card.remove();  
    });
}