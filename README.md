# EuroWeather Explorer

EuroWeather Explorer is an interactive weather forecasting application designed to help users explore the 7-day weather forecast for various European cities. The project uses city data and weather APIs to provide temperature, weather conditions, and visual icons for easy understanding.

## Features

- **City Selection**: Choose from a list of European cities via a dropdown menu.
- **7-Day Forecast**: Displays a detailed 7-day weather forecast for the selected city.
- **Weather Icons**: Dynamic icons representing weather conditions such as clear skies, cloudy, or rainy days.
- **Error Handling**: User-friendly messages for invalid inputs or API errors.
- **Responsive Design**: Optimized for different screen sizes.

## Tech Stack

- **HTML5**: For structuring the webpage.
- **CSS3**: For styling the application, including responsive design.
- **JavaScript**: For functionality and API integration.
- **7Timer Weather API**: Provides weather data for cities.
- **CSV Data**: City coordinates are loaded from a CSV file.

## Usage

1. Select a city from the dropdown menu.
2. Click the "Get Forecast" button.
3. View the 7-day weather forecast displayed as cards with icons and temperature details.

## API Integration

- The application uses the [7Timer Weather API](https://www.7timer.info) to fetch weather data.

## Known Issues

- Ensure city coordinates in `city_coordinates.csv` match the expected format.
- Weather icons must align with the weather conditions returned by the API.

## Future Enhancements

- Add support for global cities.
- Improve UI/UX with animations and additional weather details.
- Implement dark mode.
