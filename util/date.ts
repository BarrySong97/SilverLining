export const getDayOfYear = (date: Date) =>
  Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );

export function mGetDate(year: number, month: number) {
  var d = new Date(year, month, 0);
  return d.getDate();
}
