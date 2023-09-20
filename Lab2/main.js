const getTheDayOfTheWeek = require("./lab2").getTheDayOfTheWeek;
const isLeapYear = require("./lab2").isLeapYear;
const makeCalendar = require("./lab2").makeCalendar;
const readline = require("readline-sync");

const year = readline.question("Enter a year: ");
const month = readline.question("Enter a month: ");
const day = readline.question("Enter a date: ");
getTheDayOfTheWeek(year, month, day);

//makeCalendar();
