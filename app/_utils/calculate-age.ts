/**
 * Computes the age from the given birthdate.
 *
 * The function calculates the age by comparing the provided birthdate with the current date.
 * The birthdate can be specified as a string, a Date object, or null/undefined. If the birthdate
 * is null, undefined, or otherwise falsy, the function returns 0.
 *
 * The age is determined by subtracting the birth year from the current year and adjusting the result
 * if the current month and day are before the birth month and day, respectively.
 *
 * @param birthdate - The birthdate provided as a string, Date object, or null/undefined.
 * @returns The computed age as a number. Returns 0 if no valid birthdate is provided.
 *
 * @example
 * // Assuming today's date is 2025-02-25 and the birthdate is "1995-06-15":
 * // The function returns 29 if the birthday has not yet occurred this year.
 * calculateAge("1995-06-15");
 *
 * @example
 * // Using a Date object:
 * calculateAge(new Date(1995, 5, 15));
 */
export function calculateAge(
  birthdate: string | Date | null | undefined
): number {
  if (!birthdate) return 0;
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the current date is before the birthdate in the current year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
