import { validateCoordinates } from "./validation.js";
import { fetchWeather } from "./weatherApi.js";
import { createWidget } from "./widget.js";

const form = document.getElementById("weather-form");
const widgetsContainer = document.getElementById("widgets");
const formError = document.getElementById("form-error");

const showFieldError = (name, message = "") => {
  document.getElementById(`${name}-error`).textContent = message;
  form.elements[name].setAttribute("aria-invalid", String(Boolean(message)));
};

const showValidationErrors = ({ latitude, longitude }) => {
  showFieldError("latitude", latitude.error);
  showFieldError("longitude", longitude.error);
};

const hasErrors = ({ latitude, longitude }) => Boolean(latitude.error || longitude.error);

const addWidget = async (latitude, longitude) => {
  const weather = await fetchWeather(latitude, longitude);
  widgetsContainer.prepend(createWidget(weather, latitude, longitude));
};

const handleSubmit = async (event) => {
  event.preventDefault();
  formError.textContent = "";
  const result = validateCoordinates(form.elements.latitude.value, form.elements.longitude.value);
  showValidationErrors(result);
  if (hasErrors(result)) return;

  try {
    await addWidget(result.latitude.value, result.longitude.value);
  } catch (error) {
    formError.textContent = error.message || "Не удалось получить погоду";
  }
};

form.addEventListener("submit", handleSubmit);
