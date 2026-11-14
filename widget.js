import { describeWeather } from "./weatherCodes.js";

const MAP_URL = "https://www.openstreetmap.org/export/embed.html";

const createElement = (tag, className, text = "") => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
};

const createMap = (latitude, longitude) => {
  const bbox = [longitude - 0.1, latitude - 0.06, longitude + 0.1, latitude + 0.06]
    .map((value) => value.toFixed(4));
  const map = document.createElement("iframe");
  map.title = "Карта";
  map.loading = "lazy";
  map.src = `${MAP_URL}?bbox=${bbox.join(",")}&marker=${latitude},${longitude}`;
  return map;
};

const createDetails = ({ windSpeed, humidity }) => {
  const details = createElement("p", "widget-details");
  details.append(
    createElement("span", "", `💨 ${windSpeed} м/с`),
    createElement("span", "", `💧 ${humidity}%`)
  );
  return details;
};

const createRemoveButton = (onRemove) => {
  const button = createElement("button", "widget-remove", "×");
  button.type = "button";
  button.ariaLabel = "Удалить виджет";
  button.addEventListener("click", onRemove);
  return button;
};

const createBody = (weather, latitude, longitude) => {
  const { icon, label } = describeWeather(weather.code, weather.isDay);
  const body = createElement("div", "widget-body");
  body.append(
    createElement("div", "widget-icon", icon),
    createElement("p", "widget-temp", `${weather.temperature}°`),
    createElement("p", "widget-label", label),
    createDetails(weather),
    createElement("p", "widget-time", `Местное время: ${weather.localTime}`),
    createElement("p", "widget-coords", `${latitude}, ${longitude}`)
  );
  return body;
};

export const createWidget = (weather, latitude, longitude) => {
  const widget = createElement("article", "widget");
  widget.append(
    createBody(weather, latitude, longitude),
    createMap(latitude, longitude),
    createRemoveButton(() => widget.remove())
  );
  return widget;
};
