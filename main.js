// Imposta la data dell'aggiornamento
var updateDate = new Date("March 30, 2025 00:00:00").getTime();

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
  if (timeRemaining < 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML =
      "Buona estate 🌇";
  }
}, 1000);

const trashPeople = [
  "Alessandro",
  "Baraz",
  "Cristina",
  "Meto",
  "Nicolas",
  "Magra",
  "Nicole",
  "Raffaele P",
  "Tix",
  "Cristian"
];

const coffeePeople = [
  "Alessandro",
  "Baraz",
  "Cristina",
  "Meto",
  "Nicolas",
  "Magra",
  "Nicole",
  "Raffaele P",
  "Tix",
  "Cristian"
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

  let trashShiftIndex = null ? 0 : currentWeek % trashPeople.length;
  let coffeeShiftIndex = null ? 0 : currentWeek % coffeePeople.length;

  // Select one person for trash and another for machine cleaning
  const trashPerson = trashPeople[(trashShiftIndex + 0) % trashPeople.length];
  const nextTrashPerson = trashPeople[(trashShiftIndex + 1 ) % trashPeople.length];
  const machinePerson = coffeePeople[(coffeeShiftIndex + 3) % coffeePeople.length];
  const nextMachinePerson = coffeePeople[(coffeeShiftIndex + 4) % coffeePeople.length];

  // Display the results
  document.getElementById("trash").innerText = trashPerson;
  document.getElementById("machine").innerText = machinePerson;
  document.getElementById("next-trash").innerText = nextTrashPerson;
  document.getElementById("next-machine").innerText = nextMachinePerson;
}

// Run the function when the page loads
window.onload = selectPeople;
