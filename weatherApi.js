const API_URL = "https://api.open-meteo.com/v1/forecast";
const CURRENT_FIELDS = "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day";

const buildUrl = (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: CURRENT_FIELDS,
    timezone: "auto",
    wind_speed_unit: "ms",
  });
  return `${API_URL}?${params}`;
};

const toWeather = ({ current }) => ({
  temperature: Math.round(current.temperature_2m),
  humidity: current.relative_humidity_2m,
  windSpeed: current.wind_speed_10m,
  code: current.weather_code,
  isDay: Boolean(current.is_day),
  localTime: current.time.replace("T", " "),
});

export const fetchWeather = async (latitude, longitude) => {
  const response = await fetch(buildUrl(latitude, longitude));
  if (!response.ok) throw new Error("Сервис погоды недоступен. Попробуйте позже.");
  return toWeather(await response.json());
};
