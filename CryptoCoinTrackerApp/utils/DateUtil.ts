/**
 * Converts current date object to a string.
 * @returns The corresponding Date string.
 */
export const currentDateIntoISOString = (): string => {
  const dateISOString = new Date().toISOString();
  return dateISOString;
};

/**
 * Converts current date object to a number.
 * @returns The corresponding Date number.
 */
export const currentDateIntoISONumber = (): number => {
  const dateISONumber = new Date().getTime();
  return dateISONumber;
};

/**
 * Converts given date object to a string.
 * @returns The corresponding Date string.
 */
export const dateIntoISOString = (date: Date | undefined): string => {
  if (!date) {
    return "";
  }
  const dateISOString = date.toISOString();
  return dateISOString;
};

/**
 * Converts a date string to a Date object.
 * @param dateString - The date string in ISO 8601 format.
 * @returns The corresponding Date object.
 */
export const parseDateStringIntoDate = (
  dateString: string | undefined,
): Date | null => {
  if (!dateString) {
    return null;
  }
  const dateObject = new Date(dateString);
  return new Date(dateObject);
};

/**
 * Converts a Date into a DD/MM/YYYY format
 * @param date - The date format.
 * @returns The corresponding Date object in string DD/MM/YYY.
 */
export const parseDateStringIntoDateMonthYear = (
  dateString: string | undefined,
): string | null => {
  if (!dateString) {
    return null;
  }
  const day = new Date(dateString).getDate();
  const month = new Date(dateString).getMonth() + 1;
  const year = new Date(dateString).getFullYear();
  const fullDate = ` ${day}/${month}/${year} `;
  return fullDate;
};

/**
 * Converts timestamp into a DD/MM/YY format
 * @param date - The date format.
 * @returns The corresponding Date object in string DD/MM/YYY.
 */
export const parseTimestampIntoDateMonthYear = (timestamp: number): string => {
  const day = new Date(timestamp).getDate();
  const month = new Date(timestamp).getMonth() + 1;
  const year = new Date(timestamp).getUTCFullYear() % 100;
  const fullDate = ` ${day}/${month}/${year} `;
  return fullDate;
};

/**
 * Converts a date string to a number.
 * @param dateString - The date string in ISO 8601 format.
 * @returns The corresponding Date object.
 */

export const parseDateStringIntoNumber = (
  dateString: string | undefined,
): number | null => {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  const timestamp = date.getTime();
  return timestamp;
};
