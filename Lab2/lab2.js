//isLeapYear
function isLeapYear(year){
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) { 
        return true
    } else {
        return false
    };
    }

//getTheDayOfTheWeek:
function getTheDayOfTheWeek(year, month, day){
    const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Step 1: Take last two digits of the year and determine how many 12s fit in it:
    const yearLastTwoDigits = (year % 100); 
    var yearCode = Math.floor(yearLastTwoDigits / 12);
    console.log(yearCode);

    // Step 2: Calculate the remainder:
    const yearRemainder = (yearLastTwoDigits % 12);
    console.log(yearRemainder);

    // Step 3: How many 4s fit into the remainder:
    const foursInYear = Math.floor(yearRemainder / 4);
    const foursRemainder = (yearRemainder % 4);
    console.log(foursRemainder);
    
    // Step 4: Add the day of the month:
    const dayIdentifier = Number(day);
    console.log(dayIdentifier);

    // Step 5: Add the month code:
    const monthOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const codeOfMonth = ["1", "4", "4", "0", "2", "5", "0", "3", "6", "1", "4", "6"];
    let monthCode = parseInt(codeOfMonth[month - 1]);

    // Adjust month code for leap year & centuries:
    const firstTwoDigitsOfYear = parseInt(year.toString().substring(0, 2));
    if (firstTwoDigitsOfYear === 16 || 20) {
      if (isLeapYear(year)) {
        if (month == 1 || 2) {
          monthCode = monthCode + 6 - 1;
        }
      } else monthCode = monthCode + 6;
    } else if (firstTwoDigitsOfYear === 17 || 21) {
      if (isLeapYear(year)) {
        if (month == 1 || 2) {
          monthCode = monthCode + 4 - 1;
        }
      } else monthCode = monthCode + 4;
    } else if (firstTwoDigitsOfYear === 18) {
      if (isLeapYear(year)) {
        if (month == 1 || 2) {
          monthCode = monthCode + 2 - 1;
        }
      } else monthCode = monthCode + 2;
    }
    // Step 6: Total mod by 7 
    console.log(yearCode, yearRemainder, foursInYear, dayIdentifier, monthCode);
    const total = yearCode + yearRemainder + foursInYear + dayIdentifier + monthCode;
    const totalMod = total % 7;
    return(daysOfWeek[totalMod]);
  }

//makeCalendar

function makeCalendar(){
  let year = ["2023"];
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 31; day++) {
      if (day > 31 || (month === 2 && day > 29) || ((month === 4 || 6 ||  9 ||  11) && day > 30)) {
        break;
      }
    }
      const dayOfTheWeek2023 = getTheDayOfTheWeek (year, month, day);
      console.log(dayOfTheWeek2023);
    } 
  } 


module.exports = { getTheDayOfTheWeek, isLeapYear, makeCalendar }; //Calling the function