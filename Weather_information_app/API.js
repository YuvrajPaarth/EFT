const API_KEY = "769d852017655a3afc812bf5b9137f84";

function getWeather() {

    const city = document.getElementById("city").value.trim();
    const errorEl = document.getElementById("error");
    const loadingEl = document.getElementById("loading");
    const weatherEl = document.getElementById("weather");

    // Clear previous result and error
    errorEl.textContent = "";
    weatherEl.style.display = "none";

    if (city === "") {
        errorEl.textContent = "Please enter a city name.";
        return;
    }

    loadingEl.textContent = "Loading...";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    fetch(url)

        .then(function (response) {

            if (response.status === 404) {
                throw new Error("City not found. Please try again.");
            }

            if (response.status === 401) {
                throw new Error("Invalid API key.");
            }

            if (!response.ok) {
                throw new Error("Something went wrong. Please try again.");
            }

            return response.json();
        })

        .then(function (data) {

            console.log(data);

            document.getElementById("cityName").textContent =
                data.name + ", " + data.sys.country;

            document.getElementById("temperature").textContent =
                Math.round(data.main.temp) + "°C";

            document.getElementById("humidity").textContent =
                "Humidity: " + data.main.humidity + "%";

            document.getElementById("wind").textContent =
                "Wind Speed: " + data.wind.speed + " m/s";

            document.getElementById("condition").textContent =
                data.weather[0].description;

            const icon = data.weather[0].icon;

            document.getElementById("weatherIcon").src =
                `https://openweathermap.org/img/wn/${icon}@2x.png`;

            loadingEl.textContent = "";
            weatherEl.style.display = "block";
        })

        .catch(function (error) {

            loadingEl.textContent = "";

            // A failed fetch (no internet) throws a TypeError
            if (error instanceof TypeError) {
                errorEl.textContent = "Network error. Check your connection.";
            } else {
                errorEl.textContent = error.message;
            }

            console.log(error);
        });
}

// Press Enter to search
document.getElementById("city").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});