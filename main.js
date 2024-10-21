// Imposta la data dell'aggiornamento
var updateDate = new Date("November 4, 2024 09:00:00").getTime();

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
      "L'aggiornamento è arrivato!";
  }
}, 1000);

const people = [
  "Tix",
  "Magra",
  "Nicole",
  "Cristina",
  "Raffaele P",
  "Raffaele T",
  "Meto",
  "Nicolas",
  "Cristian",
  "Baraz",
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

  // Retrieve the saved week and shift index from localStorage
  const savedWeek = localStorage.getItem("savedWeek");
  let shiftIndex = localStorage.getItem("shiftIndex");

  // If the week has changed or no week is saved, update the shifts
  if (savedWeek != currentWeek) {
    shiftIndex =
      shiftIndex === null ? 0 : (parseInt(shiftIndex) + 1) % people.length;

    // Save the new week and updated shift index
    localStorage.setItem("savedWeek", currentWeek);
    localStorage.setItem("shiftIndex", shiftIndex);
  }

  // Convert the shift index to an integer
  shiftIndex = parseInt(shiftIndex, 10);

  // Select one person for trash and another for machine cleaning
  const trashPerson = people[(shiftIndex + 1) % people.length];
  const machinePerson = people[(shiftIndex + 5) % people.length];

  // Display the results
  document.getElementById("trash").innerText = trashPerson;
  document.getElementById("machine").innerText = machinePerson;
}

// Run the function when the page loads
window.onload = selectPeople;
