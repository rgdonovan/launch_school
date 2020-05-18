function getEarliestDay(qualifier, month, year) {
  switch (qualifier) {
    case 'first':
      return 1;
    case 'second':
      return 2;
    case 'third':
      return 3;
    case 'fourth':
      return 4;
    case 'fifth':
      return 5;
    case 'teenth':
      return 13;
    case 'last':
      return lastDayOfMonth(month, year) - 7;
  }
}

function lastDayOfMonth(month, year) {
  switch(month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    
    case 2:
      return isLeapYear(year) ? 29 : 28;
  }
}

function isLeapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const meetupDay = function(year, month, weekday, qualifier) {
  let dayToCheck = getEarliestDay(qualifier, month);
  let date = new Date(`${year}-${month}-${dayToCheck}`);

  while (!isMatchingDay(date, weekday)) {
    dayToCheck += 1;
    date = new Date(`${year}-${month}-${dayToCheck}`)
  }

  return date;
}

function isMatchingDay(date, weekday) {
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return date.getDay() === weekdays.indexOf(weekday);
}

module.exports = meetupDay;
