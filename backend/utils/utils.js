const camelCase = (str) =>
  str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

export const keysToCamel = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => keysToCamel(item));
  } else if (data !== null && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        camelCase(key),
        keysToCamel(value),
      ])
    );
  }
  return data;
};
