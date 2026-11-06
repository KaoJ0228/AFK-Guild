const objectiveData = {
  clashfronts: {
    name: "Clashfronts",
    duration: "11/1 ~ 11/4",

    missions: [
      {
        name: "TEST",
        description: "TEST",
        progress: 60,
        progressText: "6 / 10 TEST"
      }
    ],

    recap: {
      totalEarning: "0 WIP",
      topContributor: "Player 1"
    }
  },

  "guild-duel": {
    name: "Guild Duel",
    duration: "11/5 ~ 11/8",

    missions: [
      {
        name: "TEST",
        description: "TEST",
        progress: 60,
        progressText: "6 / 10 TEST"
      }
    ],

    recap: {
      totalEarning: "0 WIP",
      topContributor: "Player 1"
    }
  },

  "battle-drills": {
    name: "Battle Drills",
    duration: "11/9 ~ 11/10",

    missions: [
      {
        name: "TEST",
        description: "TEST",
        progress: 60,
        progressText: "6 / 10 TEST"
      }
    ],

    recap: {
      totalEarning: "0 WIP",
      topContributor: "Player 1"
    }
  }
};

function displayEventObjectives() {
  const parameters = new URLSearchParams(window.location.search);
  const eventId = parameters.get("event");
  const selectedEvent = objectiveData[eventId];

  const eventTitle = document.getElementById("event-title");
  const eventDuration = document.getElementById("event-duration");
  const missionList = document.getElementById("mission-list");
  const recapContent = document.getElementById("recap-content");

  if (!selectedEvent) {
    eventTitle.textContent = "Event Not Found";
    eventDuration.textContent = "";
    return;
  }

  eventTitle.textContent = selectedEvent.name;
  eventDuration.textContent = `Duration: ${selectedEvent.duration}`;

  selectedEvent.missions.forEach((mission) => {
    const missionCard = document.createElement("div");
    missionCard.className = "mission-card";

    missionCard.innerHTML = `
      <h3>${mission.name}</h3>
      <p>${mission.description}</p>

      <div class="mission-progress-bar">
        <div
          class="mission-progress-fill"
          style="width: ${mission.progress}%">
        </div>
      </div>

      <span class="mission-progress-text">
        ${mission.progressText}
      </span>
    `;

    missionList.appendChild(missionCard);
  });

  recapContent.innerHTML = `
    <div class="recap-item">
      <span>Total Earning</span>
      <strong>${selectedEvent.recap.totalEarning}</strong>
    </div>

    <div class="recap-item">
      <span>Top Contributor</span>
      <strong>${selectedEvent.recap.topContributor}</strong>
    </div>
  `;
}

displayEventObjectives();