export const convertMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60 === 0 ? "" : minutes % 60;
  const formattedMinutes = remainingMinutes ? `${remainingMinutes}m` : "";
  return hours > 0 ? `${hours} hours ${formattedMinutes}` : formattedMinutes;
};
