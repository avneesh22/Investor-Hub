function getDateDifference(dateString1) {
  const date1 = new Date(dateString1);
  const date2 = new Date();

  const difference = Math.abs(date1 - date2);
  const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return differenceInDays;
}

function generateKey() {
  var key = '';
  var digits = '0123456789';

  for (var i = 0; i < 12; i++) {
    var randomIndex = Math.floor(Math.random() * digits.length);
    key += digits.charAt(randomIndex);
  }

  return key;
}

function getCurrentDateTime() {
  const currentDate = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

  const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
  const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);

  return [formattedDate, formattedTime];
}



export { getDateDifference, generateKey, getCurrentDateTime }