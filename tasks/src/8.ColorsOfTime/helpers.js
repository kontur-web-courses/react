export function toUtc(date) {
  return new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
}

export function toTimezone(date, offset) {
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000*offset));
}
