const eventObjectives = [
  {
    id: "clashfronts",
    name: "Clashfronts",
    image: "images/Battle_Mode_Clashfronts.png",
    description: "Strategize, Deploy, and Conquer"
  },
  {
    id: "guild-duel",
    name: "Guild Duel",
    image: "images/Battle_Mode_Guild_Duel.png",
    description: "WIP"
  },
  {
    id: "battle-drills",
    name: "Battle Drills",
    image: "images/Battle_Drill_Mode_Card.png",
    description: "WIP"
  }
];

function displayObjectiveEvents() {
  const eventList = document.getElementById("objective-event-list");

  eventObjectives.forEach((event) => {
    const eventCard = document.createElement("button");
    eventCard.className = "objective-event-card";

    eventCard.style.backgroundImage = `
      linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)),
      url("${event.image}")
    `;

    eventCard.innerHTML = `
      <span class="objective-event-name">${event.name}</span>
      <span class="objective-event-description">
        ${event.description}
      </span>
    `;

    eventCard.addEventListener("click", () => {
      window.location.href =
        `ObjectivesEvent.html?event=${event.id}`;
    });

    eventList.appendChild(eventCard);
  });
}

displayObjectiveEvents();