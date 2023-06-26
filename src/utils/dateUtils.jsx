export const getDateString = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
};

export const getDateDiff = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
