//日付から文字列に変換する関数
export default function getStringFromDate(date): string {
  let year_str = date.getFullYear().toString();
  //月だけ+1すること
  let month_str = (1 + date.getMonth()).toString();
  let day_str = date.getDate().toString();
  let hour_str = date.getHours().toString();
  let minute_str = date.getMinutes().toString();
  let second_str = date.getSeconds().toString();

  //1桁の場合に0で二桁にパティング
  if (month_str < 10) {
    month_str = "0" + month_str;
  }
  if (day_str < 10) {
    day_str = "0" + day_str;
  }
  if (hour_str < 10) {
    hour_str = "0" + hour_str;
  }
  if (minute_str < 10) {
    minute_str = "0" + minute_str;
  }
  if (second_str < 10) {
    second_str = "0" + second_str;
  }

  let format_str = "YYYY-MM-DD hh:mm:ss";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  format_str = format_str.replace(/hh/g, hour_str);
  format_str = format_str.replace(/mm/g, minute_str);
  format_str = format_str.replace(/ss/g, second_str);

  return format_str;
}
