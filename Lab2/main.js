const getTheDayOfTheWeek = require("./lab-two").getTheDayOfTheWeek;
const isLeapYear = require("./lab-two").isLeapYear;
const makeCalendar = require("./lab-two").makeCalendar;
const readline = require("readline-sync");

const year = parseInt(readline.question("Enter a year: "));
const month = parseInt(readline.question("Enter a month (1 - 12): "));
const day = parseInt(readline.question("Enter a date (1 - 31): "));

const getDayOfTheWeekForUserDate = (`${month}-${day}-${year} is a ${getTheDayOfTheWeek(year, month, day)}`);
console.log(getDayOfTheWeekForUserDate);
getTheDayOfTheWeek(year, month, day);
makeCalendar();
