export const toEnDigit = (number: string) =>
  number && number.replace(/[٠-٩۰-۹]/g, (a) => String(a.charCodeAt(0) & 15));
