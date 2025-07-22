# Weather Forecast App 🌦️ 

Live Demo: https://weather-nadiia-v2.netlify.app

<img src="https://github.com/user-attachments/assets/d94617b4-2103-49d2-a7a1-8afa29e2538b" alt="Weather Forecast" width="300"/>
<img src="https://github.com/user-attachments/assets/aa1d9e28-3618-4240-bd69-03011569458f" alt="Weather Forecast" width="300"/>

A sleek and modern weather forecast application built with React and TypeScript. This one-page app provides real-time weather updates using a free weather forecast API.

## Key Features  
- **Current Weather**: View real-time weather conditions for your selected location.  
- **Forecast**: Get a detailed weather forecast for the next four days.  
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.  

## Tech Stack  
- **React**  
- **TypeScript**  
- **shadcn/ui**  
- **Tailwind CSS**  
- **React Router** for navigation

## APIs used 
- **Free Weather API** for retrieving accurate weather data: https://www.visualcrossing.com/weather-api
- **GeoDB API** for searching cities: http://geodb-cities-api.wirefreethought.com/
- **OpenStreetMap API** for searching cities based on the current location: https://nominatim.openstreetmap.org/

## Installation  
1. Clone the repository:
   
   ```bash
   git clone https://github.com/NadiiaSka/weather-ts-app.git
2. Navigate to the project directory:
   
   ```bash
   cd weather-forecast-app
3. Install dependencies:
   
   ```bash
   npm install
4. Set up the environment variables:
- Create a .env file in the root directory
- Add your API key for the Weather Forecast and the GeoDB APIs:
   
   ```bash
   VITE_WEATHER_API_KEY=your_api_key
   VITE_GEO_DB_API_KEY=your_api_key
   ```
5. Start the development server:
   
   ```bash
   npm run dev

## How to Use
1. Visit the live demo.
2. Search for your city in the search bar.
3. View the current weather conditions and forecast.
