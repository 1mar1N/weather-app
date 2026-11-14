const LIMITS = {
  latitude: { min: -90, max: 90 },
  longitude: { min: -180, max: 180 },
};

const parseNumber = (rawValue) => {
  const text = rawValue.trim().replace(",", ".");
  return text === "" ? NaN : Number(text);
};

export const validateCoordinate = (name, rawValue) => {
  const { min, max } = LIMITS[name];
  const value = parseNumber(rawValue);
  if (Number.isNaN(value)) return { error: "Введите число, например 60.17" };
  if (value < min || value > max) return { error: `Допустимо от ${min} до ${max}` };
  return { value };
};

export const validateCoordinates = (rawLatitude, rawLongitude) => ({
  latitude: validateCoordinate("latitude", rawLatitude),
  longitude: validateCoordinate("longitude", rawLongitude),
});
