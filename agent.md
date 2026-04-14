# FitWeather AI — Agent Documentation

## Data Flow & Architecture

The application follows a reactive data flow triggered by user initialization.

### 1. Geolocation Flow
1. **Detection**: Upon mounting `AppProvider`, the app invokes `navigator.geolocation.getCurrentPosition()`.
2. **Reverse Geocoding**: If coordinates are retrieved, a `fetch` request is sent to the **Nominatim OpenStreetMap API**:
   - `GET https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}`
   - The app extracts the `city`, `town`, or `village` name to update the `user.location` state.
3. **Fallback**: If the user denies permissions or detection fails, the app defaults to **New Delhi, India** (28.61, 77.23).

### 2. Weather Data Sync
1. **Weather Fetch**: Once coordinates are established, `fetchWeather(lat, lon)` is called.
2. **Satellite Integration**: Queries the **Open-Meteo REST API** for hourly:
   - Temperature
   - Apparent Temperature
   - Humidity
   - UV Index
   - Wind Speed
3. **Global State**: The `weather` object is stored in the `AppContext` and distributed to the UI.

### 3. Risk Engine (The Algorithm)
The `computeHeatRisk` service processes both real-time environmental data and static user profile data (Age, Health Conditions) to generate a **Safety Verdict**.

## Development Notes
- **API Keys**: No API keys are required as both Nominatim and Open-Meteo are open-access.
- **Persistence**: User profiles are stored in `localStorage` to preserve location and setting preferences between sessions.
- **Responsiveness**: The app is optimized for both wide-monitor dashboard layouts and mobile vertical feeds.
