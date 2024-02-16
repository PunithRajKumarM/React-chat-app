export function timestampHandler(ts) {
  let messageDate = new Date(ts).toDateString();
  let currentDate = new Date().toDateString();

  if (currentDate !== messageDate) {
    return convertDate(currentDate, ts);
  } else {
    return convertTime(ts);
  }
}

function convertDate(cd, ts) {
  let day = new Date(cd).getDate().toString();
  let month = (new Date(cd).getMonth() + 1).toString();
  let year = new Date(cd).getFullYear().toString();

  let time = convertTime(ts);

  if (day.length === 1) {
    day = `0${day}`;
  }
  if (month.length === 1) {
    month = `0${month}`;
  }
  let date = `${day}/${month}/${year}`;
  return `${date} ${time}`;
}
function convertTime(ts) {
  const date = new Date(ts).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return date;
}
