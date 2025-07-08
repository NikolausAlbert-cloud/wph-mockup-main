export const formatDate = (dateData: string): { date: string, time: string } => {
  const dateObject = new Date(dateData);
  const datePart = dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const timePart = dateObject.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  return {
    date: datePart,
    time: timePart
  };
}