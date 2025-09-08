// Imposta la data dell'aggiornamento

function FindDstSwitchDate() {
  let month = new Date().getMonth()
  let year = new Date().getYear()
  // Set the starting date
  var baseDate = new Date(Date.UTC(year+1900, month, 1, 0, 0, 0, 0));
  
  for (month_loop = month; month_loop < 13; month_loop++) {
    var tmpDate = new Date(Date.UTC(year+1900, (month_loop + 1)%12, 1, 0, 0, 0, 0));
    var tmpOffset = baseDate.getTimezoneOffset() - tmpDate.getTimezoneOffset()
    if (tmpOffset != 0) {
      var prev_offset = tmpOffset
      for (day = 1; day < 32; day++) {
        var tmpDayte = new Date(Date.UTC(year+1900, (month_loop)%12, day, 0, 0, 0, 0));
        var tmpDatOffset = tmpDayte.getTimezoneOffset() - tmpDate.getTimezoneOffset()
        if (prev_offset != tmpDatOffset) return [tmpDayte.getMonth() == 9 ,tmpDayte]

        prev_offset = tmpDatOffset
      }
    }
  }
}

let change_date = FindDstSwitchDate(new Date().getUTCFullYear(), new Date().getMonth())

var updateDate = change_date[1].getTime();
var is_summer = change_date[0]
// Aggiorna il countdown ogni secondo
var countdownInterval = setInterval(function () {
  var now = new Date().getTime();
  var timeRemaining = updateDate - now;

  // Calcola i giorni, ore, minuti e secondi rimanenti
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Mostra il risultato nel div con id="countdown"
  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s";

  // Se il countdown è finito, scrivi un messaggio
  if (is_summer) {
    clearInterval(countdownInterval);
    document.getElementById("time-label").innerHTML = "";
    document.getElementById("countdown").innerHTML =
      "Buona estate 🌇";
  }
}, 1000);

const trashPeople = [
  "Alessandro",
  "Baraz",
  "Cristina",
  "Meto",
  "Sara",
  "Nicolas",
  "Magra",
  "Elena",
  "Raffaele P",
  "Michele",
  "Tix",
  "Cristian"
];

const coffeePeople = [
  "Alessandro",
  "Baraz",
  "Cristina",
  "Meto",
  "Sara",
  "Nicolas",
  "Magra",
  "Raffaele P",
  "Michele",
  "Tix",
  "Cristian",
  "Elena"
];

// Function to get the current week number of the year
function getWeekNumber(date) {
  const currentDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = currentDate.getUTCDay() || 7;
  currentDate.setUTCDate(currentDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
}

// Function to select people for the shifts
function selectPeople() {
  // Get the current week number
  const currentDate = new Date();
  const currentWeek = getWeekNumber(currentDate);

  let shiftIndex = null ? 0 : currentWeek % trashPeople.length;

  // Select one person for trash and another for coffee machine cleaning
  const trashPerson = trashPeople[(shiftIndex + 4) % trashPeople.length];
  const nextTrashPerson = trashPeople[(shiftIndex + 5) % trashPeople.length];
  const nextNextTrashPerson = trashPeople[(shiftIndex + 6) % trashPeople.length]
  const coffeePerson = coffeePeople[(shiftIndex + 9) % coffeePeople.length];
  const nextCoffeePerson = coffeePeople[(shiftIndex + 10) % coffeePeople.length];
  const nextNextCoffeePerson = coffeePeople[(shiftIndex + 11) % coffeePeople.length]

  // Display the results
  document.getElementById("trash").innerText = trashPerson;
  document.getElementById("coffee").innerText = coffeePerson;
  document.getElementById("next-trash").innerText = nextTrashPerson;
  document.getElementById("next-coffee").innerText = nextCoffeePerson;
  document.getElementById("next-next-trash").innerText = nextNextTrashPerson;
  document.getElementById("next-next-coffee").innerText = nextNextCoffeePerson;
}

// Run the function when the page loads
window.onload = selectPeople;
