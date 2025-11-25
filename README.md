WeatherApp
==========

A simple weather forecast application built with HTML, CSS, and JavaScript.
It uses the WeatherAPI (https://www.weatherapi.com/) to fetch current weather and forecast data for a given city.

Features
--------
- Search for weather by city name
- Choose number of forecast days (up to 4)
- Displays:
  - Current temperature
  - Humidity
  - Weather condition icon
- Responsive card layout with modern UI design
- Clears old results before showing new ones

Project Structure
-----------------
weatherApp/
│
├── index.html        # Main HTML file
├── style.css         # Styling for the app
├── index.js          # JavaScript logic (fetch, validation, DOM updates)
└── README.txt        # Project documentation

Setup & Usage
-------------
1. Clone the repository:
   git clone git@github.com:PeterSzep/weatherApp.git
   cd weatherApp

2. Add your WeatherAPI key:
   - Open index.js
   - Replace:
     const API_KEY = "";
   - With:
     const API_KEY = "YOUR_API_KEY_HERE";

3. Run the app:
   - Open index.html in your browser.
   - Enter a city name and number of days (1–4).
   - Click Search to see the forecast.

Validation Rules
----------------
- Days must be between 1 and 4
- Days input cannot be empty
- Shows alerts if invalid input or city not found

Example
-------
<img width="1875" height="837" alt="image" src="https://github.com/user-attachments/assets/cd0875da-e293-40ed-b0f6-292f17c238ed" />

Future Improvements
-------------------
- Hide API key using a backend + .env
- Add support for more than 4 days
- Improve responsive design for mobile
- Show additional weather details (wind speed, feels like, etc.)

License
-------
This project is for learning purposes. Feel free to fork and adapt.
