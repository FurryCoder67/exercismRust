// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Calculates the total bird count.
 *
 * @param {number[]} birdsPerDay
 * @returns {number} total bird count
 */
export function totalBirdCount(birdsPerDay) {
  var sum = 0;
  for(var i = 0; i < birdsPerDay.length; i++)
  {
      sum += birdsPerDay[i]; 
  }
  return sum;
}

/**
 * Calculates the total number of birds seen in a specific week.
 *
 * @param {number[]} birdsPerDay
 * @param {number} week
 * @returns {number} birds counted in the given week
 */
export function birdsInWeek(birdsPerDay, week) {
  // Determine the starting index.
  var startIndex = (week-1) * 7;
  var endIndex = startIndex + 7;
  if(endIndex > birdsPerDay.length)
  {
    endIndex = birdsPerDay.length;
  }
  
  var sum = 0;
  for (var i = startIndex; i < endIndex; i++)
    {
      sum += birdsPerDay[i];
    }
  return sum;
}

/**
 * Fixes the counting mistake by increasing the bird count
 * by one for every second day.
 *
 * @param {number[]} birdsPerDay
 * @returns {number[]} corrected bird count data
 */
export function fixBirdCountLog(birdsPerDay) {
  for(var i = 0; i < birdsPerDay.length; i++)
    {
      if(i % 2 === 0)
      {
        birdsPerDay[i] += 1;
      }
    }
  return birdsPerDay;
}