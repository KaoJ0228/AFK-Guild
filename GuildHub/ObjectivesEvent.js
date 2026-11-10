const eventData = {
  clashfronts: {
    name: "Clashfronts",
    duration: "11/1 ~ 11/4",
    mapImage: "images/clashfronts-map.png",

    game: "3/4",
    round: "3/5",

    otherGuilds: [
      {
        name: "Enemy Guild 1",
        icon: "images/guild-placeholder.png"
      },
      {
        name: "Enemy Guild 2",
        icon: "images/guild-placeholder.png"
      },
      {
        name: "Enemy Guild 3",
        icon: "images/guild-placeholder.png"
      }
    ],

    contributions: [
      {
        name: "Player 1",
        points: 950
      },
      {
        name: "Player 2",
        points: 875
      },
      {
        name: "Player 3",
        points: 820
      },
      {
        name: "Player 4",
        points: 760
      }
    ]
  },

  "battle-drills": {
    name: "Battle Drills",
    duration: "11/9 ~ 11/10",
    mapImage: "images/battle-drills-map.png",

    bosses: [
      {
        name: "BOSS1",
        currentHealth: 7500,
        maxHealth: 10000
      },
      {
        name: "BOSS2",
        currentHealth: 4200,
        maxHealth: 12000
      },
      {
        name: "BOSS3",
        currentHealth: 1500,
        maxHealth: 15000
      }
    ],

    contributions: [
      {
        name: "Player 1",
        points: 950
      },
      {
        name: "Player 2",
        points: 875
      },
      {
        name: "Player 3",
        points: 820
      },
      {
        name: "Player 4",
        points: 760
      }
    ]
  },

  "guild-duel": {
    name: "Guild Duel",
    duration: "11/5 ~ 11/8",

    missions: [
      {
        name: "Mission 1",
        description: "WIP.",
        current: 5,
        target: 10
      },
      {
        name: "Mission 2",
        description: "WIP.",
        current: 320,
        target: 1000
      },
      {
        name: "Mission 3",
        description: "WIP.",
        current: 7200,
        target: 10000
      }
    ],

    recap: {
      gainedResource: "8,200 Crests",

      contributions: [
        {
          name: "Player One",
          points: 950
        },
        {
          name: "Player Two",
          points: 875
        },
        {
          name: "Player Three",
          points: 820
        }
      ]
    }
  }
};

function displayContributions(contributions) {
  const contributionList = document.getElementById("contribution-list");

  contributionList.innerHTML = "";

  contributions.forEach((player) => {
    const playerRow = document.createElement("div");
    playerRow.className = "contribution-row";

    playerRow.innerHTML = `
      <span class="contributor-name">${player.name}</span>
      <strong>${player.points} pts</strong>
    `;

    contributionList.appendChild(playerRow);
  });
}

function displayClashfronts(event) {
  const leftTitle = document.getElementById("left-panel-title");
  const leftContent = document.getElementById("left-content");

  const middleTitle = document.getElementById("middle-panel-title");
  const middleContent = document.getElementById("middle-content");

  const rightTitle = document.getElementById("right-panel-title");

  leftTitle.textContent = "Map Layout";
  middleTitle.textContent = "Game Information";
  rightTitle.textContent = "Contribution";

  leftContent.innerHTML = `
    <img
      class="map-image"
      src="${event.mapImage}"
      alt="${event.name} map"
    >
  `;

  middleContent.innerHTML = `
    <div class="game-round-block">
      <div class="game-info-row">
        <span>Game</span>
        <strong>${event.game}</strong>
      </div>

      <div class="game-info-row">
        <span>Round</span>
        <strong>${event.round}</strong>
      </div>
    </div>

    <div class="guild-list-block">
      <h2>Other Guilds</h2>
      <div id="guild-list"></div>
    </div>
  `;

  const guildList = document.getElementById("guild-list");

  event.otherGuilds.forEach((guild) => {
    const guildRow = document.createElement("div");
    guildRow.className = "other-guild-row";

    guildRow.innerHTML = `
      <img src="${guild.icon}" alt="${guild.name}">
      <span>${guild.name}</span>
    `;

    guildList.appendChild(guildRow);
  });

  displayContributions(event.contributions);
}

function displayBattleDrills(event) {
  const leftTitle = document.getElementById("left-panel-title");
  const leftContent = document.getElementById("left-content");

  const middleTitle = document.getElementById("middle-panel-title");
  const middleContent = document.getElementById("middle-content");

  const rightTitle = document.getElementById("right-panel-title");

  leftTitle.textContent = "Map Layout";
  middleTitle.textContent = "Bosses";
  rightTitle.textContent = "Contribution";

  leftContent.innerHTML = `
    <img
      class="map-image"
      src="${event.mapImage}"
      alt="${event.name} map"
    >
  `;

  middleContent.innerHTML = `
    <div id="boss-list" class="boss-list"></div>
  `;

  const bossList = document.getElementById("boss-list");

  event.bosses.forEach((boss) => {
    const healthPercentage =
      (boss.currentHealth / boss.maxHealth) * 100;

    const bossCard = document.createElement("div");
    bossCard.className = "boss-card";

    bossCard.innerHTML = `
      <div class="boss-header">
        <strong>${boss.name}</strong>
        <span>
          ${boss.currentHealth.toLocaleString()} /
          ${boss.maxHealth.toLocaleString()} HP
        </span>
      </div>

      <div class="boss-health-bar">
        <div
          class="boss-health-fill"
          style="width: ${healthPercentage}%">
        </div>
      </div>

      <p>${Math.round(healthPercentage)}% remaining</p>
    `;

    bossList.appendChild(bossCard);
  });

  displayContributions(event.contributions);
}

function displayContributions(contributions) {
  const rightContent = document.getElementById("right-content");

  rightContent.innerHTML = "";

  contributions.forEach((player) => {
    const playerRow = document.createElement("div");
    playerRow.className = "contribution-row";

    playerRow.innerHTML = `
      <span class="contributor-name">${player.name}</span>
      <strong>${player.points} pts</strong>
    `;

    rightContent.appendChild(playerRow);
  });
}

function displayGuildDuel(event) {
  const leftTitle = document.getElementById("left-panel-title");
  const leftContent = document.getElementById("left-content");

  const middleTitle = document.getElementById("middle-panel-title");
  const middleContent = document.getElementById("middle-content");

  const rightTitle = document.getElementById("right-panel-title");
  const rightContent = document.getElementById("right-content");

  leftTitle.textContent = "Mission List";
  middleTitle.textContent = "Mode Detail";
  rightTitle.textContent = "Last Recap";

  leftContent.innerHTML = "";

  event.missions.forEach((mission) => {
    const progressPercentage =
      (mission.current / mission.target) * 100;

    const missionCard = document.createElement("div");
    missionCard.className = "mission-card";

    missionCard.innerHTML = `
      <h3>${mission.name}</h3>
      <p>${mission.description}</p>

      <div class="mission-progress-bar">
        <div
          class="mission-progress-fill"
          style="width: ${progressPercentage}%">
        </div>
      </div>

      <span class="mission-progress-text">
        ${mission.current.toLocaleString()} /
        ${mission.target.toLocaleString()}
      </span>
    `;

    leftContent.appendChild(missionCard);
  });

  middleContent.innerHTML = `
    <div class="empty-placeholder">
      Mode details will be added here later.
    </div>
  `;

  rightContent.innerHTML = `
    <div class="recap-resource">
      <span>Gained Resource</span>
      <strong>${event.recap.gainedResource}</strong>
    </div>

    <h3 class="recap-heading">Contribution</h3>

    <div id="duel-contribution-list"></div>
  `;

  const contributionList =
    document.getElementById("duel-contribution-list");

  event.recap.contributions.forEach((player) => {
    const contributionRow = document.createElement("div");
    contributionRow.className = "contribution-row";

    contributionRow.innerHTML = `
      <span>${player.name}</span>
      <strong>${player.points} pts</strong>
    `;

    contributionList.appendChild(contributionRow);
  });
}

function displayEventPage() {
  const parameters = new URLSearchParams(window.location.search);
  const eventId = parameters.get("event");
  const selectedEvent = eventData[eventId];

  if (!selectedEvent) {
    document.getElementById("event-title").textContent =
      "Event Not Found";

    return;
  }

  document.getElementById("event-title").textContent =
    selectedEvent.name;

  document.getElementById("event-duration").textContent =
    selectedEvent.duration;

  if (eventId === "clashfronts") {
    displayClashfronts(selectedEvent);
  }

  if (eventId === "battle-drills") {
    displayBattleDrills(selectedEvent);
  }

  if (eventId === "guild-duel") {
    displayGuildDuel(selectedEvent);
  }
}

displayEventPage();