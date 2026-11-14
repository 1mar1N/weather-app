// Коды погоды WMO: https://open-meteo.com/en/docs
const CONDITIONS = [
  { maxCode: 0, icon: "☀️", nightIcon: "🌙", label: "Ясно" },
  { maxCode: 2, icon: "🌤️", nightIcon: "☁️", label: "Малооблачно" },
  { maxCode: 3, icon: "☁️", label: "Пасмурно" },
  { maxCode: 48, icon: "🌫️", label: "Туман" },
  { maxCode: 57, icon: "🌦️", label: "Морось" },
  { maxCode: 67, icon: "🌧️", label: "Дождь" },
  { maxCode: 77, icon: "❄️", label: "Снег" },
  { maxCode: 82, icon: "🌧️", label: "Ливень" },
  { maxCode: 86, icon: "🌨️", label: "Снегопад" },
  { maxCode: 99, icon: "⛈️", label: "Гроза" },
];

export const describeWeather = (code, isDay) => {
  const condition = CONDITIONS.find(({ maxCode }) => code <= maxCode) ?? CONDITIONS.at(-1);
  const icon = !isDay && condition.nightIcon ? condition.nightIcon : condition.icon;
  return { icon, label: condition.label };
};
