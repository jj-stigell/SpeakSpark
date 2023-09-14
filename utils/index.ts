export function customDateFormat(dateString: string): string {
  const dateGiven: Date = new Date(dateString);
  const currentDate: Date = new Date();

  // Create new date objects for day difference calculation
  const dateAtMidnight: Date = new Date(currentDate);
  dateAtMidnight.setHours(0,0,0,0);

  const givenDateAtMidnight: Date = new Date(dateGiven);
  givenDateAtMidnight.setHours(0,0,0,0);

  // Calculate the difference in days
  const msInADay: number = 1000 * 3600 * 24;
  const daysDifference: number =
      (dateAtMidnight.getTime() - givenDateAtMidnight.getTime()) / msInADay;

  let formattedDate: string;

  if (daysDifference === 0) {
    formattedDate = `Today ${dateGiven.getHours().toString().padStart(2, '0')}:` +
                      `${dateGiven.getMinutes().toString().padStart(2, '0')}`;
  } else if (daysDifference === 1) {
    formattedDate = `Yesterday ${dateGiven.getHours().toString().padStart(2, '0')}:` +
                      `${dateGiven.getMinutes().toString().padStart(2, '0')}`;
  } else if (daysDifference >= 2 && daysDifference <= 6) {
    const weekdays: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'];
    formattedDate = `${weekdays[dateGiven.getDay()]} ` +
                      `${dateGiven.getHours().toString().padStart(2, '0')}:` +
                      `${dateGiven.getMinutes().toString().padStart(2, '0')}`;
  } else {
    formattedDate = `${dateGiven.getDate().toString().padStart(2, '0')}/` +
                      `${(dateGiven.getMonth() + 1).toString().padStart(2, '0')}/` +
                      `${dateGiven.getFullYear()} ` +
                      `${dateGiven.getHours().toString().padStart(2, '0')}:` +
                      `${dateGiven.getMinutes().toString().padStart(2, '0')}`;
  }

  return formattedDate;
}
