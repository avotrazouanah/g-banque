export function ParseDateSQLtoString(date: string) {
  let dateArray = date.toString().split('-');
  return dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
  // let dateArray = date.toString().split('T')[0].split('-');
  // return dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
}

export function ParseDateSql(stringDate: string): Date {
  return new Date(stringDate);
}
