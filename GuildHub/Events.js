const events = [
  {
    id: "clashfronts",
    name: "Clashfronts",
    start: "2026-11-01",
    end: "2026-11-04",
    status: "WIP",
    description: "WIP",
    objectives: "WIP",
  },
  {
    id: "guild-duel",
    name: "Guild Duel",
    start: "2026-11-03",
    end: "2026-11-08",
    status: "WIP",
    description: "WIP",
    objectives: "WIP",
  },
  {
    id: "battle-drills",
    name: "Battle Drills",
    start: "2026-11-09",
    end: "2026-11-10",
    status: "WIP",
    description: "WIP",
    objectives: "WIP",
  }
];

let currentYear = 2026;
let currentMonth = 10;
let selectedDate = "2026-11-01";
let selectedEventId = null;

function createDateKey(year, month, day) {
  const monthText = String(month + 1).padStart(2, "0");
  const dayText = String(day).padStart(2, "0");

  return `${year}-${monthText}-${dayText}`;
}

function formatDate(dateKey) {
  const [year, month, day] = dateKey.split("-");

  return `${month}/${day}/${year}`;
}

function eventOccursOnDate(event, dateKey) {
  return dateKey >= event.start && dateKey <= event.end;
}

function getEventsForDate(dateKey) {
  return events.filter((event) => eventOccursOnDate(event, dateKey));
}

function renderCalendar() {
  const calendarDays = document.getElementById("calendar-days");
  const calendarMonth = document.getElementById("calendar-month");

  calendarDays.innerHTML = "";

  const monthName = new Date(
    currentYear,
    currentMonth
  ).toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  calendarMonth.textContent = monthName;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const numberOfDays = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarDays.appendChild(emptyDay);
  }

  for (let day = 1; day <= numberOfDays; day++) {
    const dateKey = createDateKey(currentYear, currentMonth, day);
    const dayEvents = getEventsForDate(dateKey);

    const dayButton = document.createElement("button");
    dayButton.className = "calendar-day";

    if (dateKey === selectedDate) {
      dayButton.classList.add("selected-day");
    }

    dayButton.innerHTML = `
      <span class="day-number">${day}</span>

      <div class="calendar-event-dots">
        ${dayEvents.map(() => `<span class="event-dot"></span>`).join("")}
      </div>
    `;

    dayButton.addEventListener("click", () => {
      selectedDate = dateKey;
      renderCalendar();
      displayEventsForSelectedDate();
    });

    calendarDays.appendChild(dayButton);
  }
}

function displayEventsForSelectedDate() {
  const dayEventList = document.getElementById("day-event-list");
  const selectedDateTitle = document.getElementById("selected-date-title");

  selectedDateTitle.textContent = `Events on ${formatDate(selectedDate)}`;
  dayEventList.innerHTML = "";

  const dayEvents = getEventsForDate(selectedDate);

  if (dayEvents.length === 0) {
    dayEventList.innerHTML = `
      <p class="no-events">There are no events on this date.</p>
    `;

    document.getElementById("event-details").innerHTML = `
      <p>Select an event to view its details.</p>
    `;

    return;
  }

  dayEvents.forEach((event) => {
    const eventButton = document.createElement("button");
    eventButton.className = "day-event-button";

    if (event.id === selectedEventId) {
      eventButton.classList.add("selected-event");
    }

    eventButton.innerHTML = `
      <span>${event.name}</span>
      <span class="small-status">${event.status}</span>
    `;

    eventButton.addEventListener("click", () => {
      selectedEventId = event.id;
      displayEventsForSelectedDate();
      displayEventDetails(event);
    });

    dayEventList.appendChild(eventButton);
  });

  if (!selectedEventId || !dayEvents.some((event) => event.id === selectedEventId)) {
    selectedEventId = dayEvents[0].id;
    displayEventDetails(dayEvents[0]);
  }
}

function displayEventDetails(event) {
  const eventDetails = document.getElementById("event-details");

  eventDetails.innerHTML = `
    <h3>${event.name}</h3>

    <span class="detail-status">${event.status}</span>

    <div class="detail-row">
      <strong>Duration</strong>
      <span>${formatDate(event.start)} ~ ${formatDate(event.end)}</span>
    </div>

    <div class="detail-block">
      <strong>Description</strong>
      <p>${event.description}</p>
    </div>

    <div class="detail-block">
      <strong>Objectives</strong>
      <p>${event.objectives}</p>
    </div>
  `;
}

document.getElementById("previous-month").addEventListener("click", () => {
  currentMonth--;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  selectedEventId = null;
  renderCalendar();
  displayEventsForSelectedDate();
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  selectedEventId = null;
  renderCalendar();
  displayEventsForSelectedDate();
});

function getTodayDateKey() {
  const today = new Date();

  return createDateKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
}

document.getElementById("today-button").addEventListener("click", () => {
  const today = new Date();

  currentYear = today.getFullYear();
  currentMonth = today.getMonth();
  selectedDate = getTodayDateKey();
  selectedEventId = null;

  renderCalendar();
  displayEventsForSelectedDate();
});

function openEventFromDashboard() {
  const parameters = new URLSearchParams(window.location.search);
  const eventId = parameters.get("event");

  if (!eventId) {
    return;
  }

  const selectedEvent = events.find((event) => event.id === eventId);

  if (!selectedEvent) {
    return;
  }

  selectedEventId = selectedEvent.id;

  if (selectedEvent.active) {
    selectedDate = getTodayDateKey();
  } else {
    selectedDate = selectedEvent.start;
  }

  const [year, month, day] = selectedDate
    .split("T")[0]
    .split("-")
    .map(Number);

  currentYear = year;
  currentMonth = month - 1;

  renderCalendar();
  displayEventsForSelectedDate();
  displayEventDetails(selectedEvent);
}

renderCalendar();
displayEventsForSelectedDate();
openEventFromDashboard();