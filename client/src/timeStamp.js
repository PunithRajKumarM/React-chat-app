export function convertTimestamp(h, m) {
  let hours = h.toString();
  let minutes = m.toString();
  if (hours.length === 1) {
    hours = "0" + hours;
  }
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`;
}
