document.addEventListener("DOMContentLoaded", function () {
    const cityDropdown = document.getElementById("cityDropdown");
    const weatherContainer = document.getElementById("weatherContainer");
    const fetchWeatherButton = document.getElementById("fetchWeatherButton");

    // Add a default "Select a city" option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Select a city--";
    cityDropdown.appendChild(defaultOption);

    // Fetch city coordinates from the CSV file
    fetch("city_coordinates.csv")
        .then((response) => response.text())
        .then((csvData) => {
            // Parse CSV data
            const rows = csvData.split("\n").slice(1);
            const cities = rows.map((row) => {
                const [latitude, longitude, city, country] = row.split(",");
                return { latitude, longitude, city, country };
            });

            // Populate the city dropdown with options
            cities.forEach((city) => {
                const option = document.createElement("option");
                option.value = `${city.latitude},${city.longitude}`;
                option.textContent = `${city.city}, ${city.country}`;
                cityDropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching city coordinates:", error);
        });

    // Fetch weather data when the button is clicked
    fetchWeatherButton.addEventListener("click", function () {
        // Check if a valid city is selected
        if (cityDropdown.value) {
            const selectedCoordinates = cityDropdown.value.split(",");
            const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${selectedCoordinates[1]}&lat=${selectedCoordinates[0]}&product=astro&output=xml`;

            fetch(apiUrl)
                .then((response) => response.text())
                .then((xmlData) => {
                    // Parse and display weather data
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

                    // Clear previous content
                    weatherContainer.innerHTML = "";

                    // Loop through each data element in the XML
                    const dataElements = xmlDoc.querySelectorAll("data");
                    for (let i = 0; i < dataElements.length; i++) {
                        const dayData = dataElements[i];
                        const tempElement = dayData.querySelector("temp2m");
                        const cloudcoverElement = dayData.querySelector("cloudcover");
                        const timepoint = dayData.getAttribute("timepoint");

                        const forecastDate = new Date();
                        forecastDate.setDate(forecastDate.getDate() + i);
                        const dayOfWeek = getDayOfWeek(forecastDate.getDay());
                        const dateText = `${forecastDate.getMonth() + 1}/${forecastDate.getDate()}`;

                        const forecastItem = document.createElement("div");
                        forecastItem.classList.add("forecast-item");

                        const dayInfoParagraph = document.createElement("p");
                        dayInfoParagraph.textContent = `${dayOfWeek}, ${dateText}`;

                        const weatherImage = document.createElement("img");
                        weatherImage.src = getImageForWeather(cloudcoverElement.textContent);

                        const tempParagraph = document.createElement("p");
                        tempParagraph.textContent = `Temperature: ${tempElement.textContent}°C`;

                        forecastItem.appendChild(dayInfoParagraph);
                        forecastItem.appendChild(weatherImage);
                        forecastItem.appendChild(tempParagraph);

                        weatherContainer.appendChild(forecastItem);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                });
        } else {
            alert("Please select a city before fetching the weather.");
        }
    });

    // Function to get the day of the week
    function getDayOfWeek(dayIndex) {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysOfWeek[dayIndex];
    }

    // Function to get the image URL based on cloud cover
    function getImageForWeather(cloudCover) {
        return cloudCover > 50 ? "images/cloudy.png" : "images/clear.png";
    }
});
