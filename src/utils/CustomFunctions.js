export const getMonthDays = (iMonth, year) => {
  const firstDay = new Date(year, iMonth, 1).getDate();
  let currentMonthCount = 0 - firstDay;
  const monthMatrix = new Array(35).fill([]).map(() => {
    currentMonthCount++;
    const currentDate = new Date(year, iMonth, currentMonthCount);
    const date = currentDate.getDate();
    const day = currentDate.getDay();
    const month = currentDate.getMonth();
    return {
      date,
      day,
      month,
      year,
      time: [
        { time: "9:00", date: { year, month: month, date } },
        { time: "9:30", date: { year, month: month, date } },
        { time: "10:00", date: { year, month: month, date } },
        { time: "10:30", date: { year, month: month, date } },
        { time: "11:00", date: { year, month: month, date } },
        { time: "11:30", date: { year, month: month, date } },
        { time: "12:00", date: { year, month: month, date } },
        { time: "12:30", date: { year, month: month, date } },
        { time: "1:00", date: { year, month: month, date } },
        { time: "1:30", date: { year, month: month, date } },
        { time: "2:00", date: { year, month: month, date } },
      ],
    };
  });
  return monthMatrix;
};
