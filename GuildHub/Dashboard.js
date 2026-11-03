const guild = {
    name: "Placeholder Guild",
    level: 7,
    image: "images/guild-placeholder.png",
    description: "A test guild"
};

const players = [
  {
    name: "Player One",
    image: "images/player-placeholder.png",
    activePoints: 950
  },
  {
    name: "Player Two",
    image: "images/player-placeholder.png",
    activePoints: 875
  },
  {
    name: "Player Three",
    image: "images/player-placeholder.png",
    activePoints: 820
  },
  {
    name: "Player Four",
    image: "images/player-placeholder.png",
    activePoints: 760
  },
  {
    name: "Player Five",
    image: "images/player-placeholder.png",
    activePoints: 720
  },
  {
    name: "Player Six",
    image: "images/player-placeholder.png",
    activePoints: 690
  },
  {
    name: "Player Seven",
    image: "images/player-placeholder.png",
    activePoints: 640
  },
  {
    name: "Player Eight",
    image: "images/player-placeholder.png",
    activePoints: 590
  },
  {
    name: "Player Nine",
    image: "images/player-placeholder.png",
    activePoints: 540
  },
  {
    name: "Player Ten",
    image: "images/player-placeholder.png",
    activePoints: 500
  }
];

function displayGuild() {
    document.getElementById("guild-image").src = guild.image;
    document.getElementById("guild-name").textContent = guild.name;
    document.getElementById("guild-level").textContent = `Level ${guild.level}`;
    document.getElementById("guild-description").textContent = guild.description;
}

function displayPlayers() {
    const playerGrid = document.getElementById("player-grid");

    players.forEach((player) => {
        const playerCard = document.createElement("div");
        playerCard.className = "player-card";

        playerCard.innerHTML = `
            <img 
                class="player-image"
                src="${player.image}"
                alt="${player.name}"
            >

            <div>
                <div class="player-name">${player.name}</div>
                <div class="player-points">
                Active Points: ${player.activePoints}
                </div>
            </div>
        `;

        playerGrid.appendChild(playerCard);
  });
}

const events = [
  {
    id: "clashfronts",
    name: "Clashfronts",
    active: true,
    image: "images/Battle_Mode_Clashfronts.png",
    start: "2026-11-01T20:00:00",
    end: "2026-11-04T20:00:00",
    nextStart: "2026-11-10T20:00:00",
    nextEnd: "2026-11-13T20:00:00"
  },
  {
    id: "guild-duel",
    name: "Guild Duel",
    active: false,
    image: "images/Battle_Mode_Guild_Duel.png",
    start: "2026-11-05T20:00:00",
    end: "2026-11-08T20:00:00",
    nextStart: "2026-11-05T20:00:00",
    nextEnd: "2026-11-08T20:00:00"
  },
  {
    id: "battle-drills",
    name: "Battle Drills",
    active: true,
    image: "images/Battle_Drill_Mode_Card.png",
    start: "2026-11-01T18:00:00",
    end: "2026-11-02T18:00:00",
    nextStart: "2026-11-09T18:00:00",
    nextEnd: "2026-11-10T18:00:00"
  }
];

function formatDate(dateString) {
  const [year, month, day] = dateString
    .split("T")[0]
    .split("-")
    .map(Number);

  return `${month}/${day}/${year}`;
}

function displayEvents() {
    const eventList = document.getElementById("event-list");

    eventList.innerHTML = "";

    events.forEach((event) => {
        const eventCard = document.createElement("article");
        eventCard.className = "event-card";

        eventCard.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
        url("${event.image}")
        `;

        const durationText = event.active
        ? `Duration: ${formatDate(event.start)} ~ ${formatDate(event.end)}`
        : `Next duration: ${formatDate(event.nextStart)} ~ ${formatDate(event.nextEnd)}`;

        eventCard.innerHTML = `
        <p class="event-time">${durationText}</p>
        `;

        eventCard.style.cursor = "pointer";

        eventCard.addEventListener("click", () => {
          window.location.href = `events.html?event=${event.id}`;
        });

        eventList.appendChild(eventCard);
  });
}

displayGuild();
displayPlayers();
displayEvents();