// Levels Definition
const levels = [
  { name: "Pill Sorter", xpRequired: 0, image: "./images/lv0.png"},
  { name: "Label Peeler", xpRequired: 500 },
  { name: "Counting Tray Enthusiast", xpRequired: 1000 },
  { name: "OTC person", xpRequired: 2000 },
  { name: "Cash Register Employee", xpRequired: 3000 },
  { name: "Pharmacy Learner", xpRequired: 4000 },
  { name: "Insurance Whisperer", xpRequired: 5000 },
  { name: "Rx Wrangler", xpRequired: 7000 },
  { name: "CPhT-in-Training", xpRequired: 9000 },
  { name: "CPhT", xpRequired: 12000 },
  { name: "Pill Machine Whisperer", xpRequired: 15000 },
  { name: "Orange Book Guru", xpRequired: 18000 },
  { name: "Pharmacist's Sidekick", xpRequired: 22000 },
  { name: "Stock Bottle Warrior", xpRequired: 26000 },
  { name: "Prior Auth Ninja", xpRequired: 31000 },
  { name: "DEA Form Filler", xpRequired: 37000 },
  { name: "Pill Counter Extraordinaire", xpRequired: 44000 },
  { name: "Inventory Houdini", xpRequired: 52000 },
  { name: "Insurance Overlord", xpRequired: 61000 },
  { name: "Formulary Gatekeeper", xpRequired: 71000 },
  { name: "CPhT Wizard", xpRequired: 82000 },
  { name: "Pharmacy Mastermind", xpRequired: 94000 },
  { name: "Patient Care Legend", xpRequired: 107000 },
  { name: "Pharmacist In training", xpRequired: 121000 },
  { name: "Rx Wizard", xpRequired: 136000 },
  { name: "Pharmacy Inhabitant", xpRequired: 152000 },
  { name: "Master of Medications", xpRequired: 169000 },
  { name: "Chronic Disease", xpRequired: 187000 },
  { name: "Lord of the Pharmacy", xpRequired: 206000 },
  { name: "Rx God", xpRequired: 226000 },
  { name: "OTC Overlord", xpRequired: 247000 },
  { name: "Insurance Denier", xpRequired: 269000 },
  { name: "Master of Pharmacy", xpRequired: 316000 },
  { name: "Legend of CPhT", xpRequired: 341000 }
];

let userXP = JSON.parse(localStorage.getItem("userXP")) || 0;
let userLevel = JSON.parse(localStorage.getItem("userLevel")) || 0;

// Save XP and Level to Local Storage
function saveProgress() {
  localStorage.setItem("userXP", JSON.stringify(userXP));
  localStorage.setItem("userLevel", JSON.stringify(userLevel));
}

// Add XP and Handle Level Up
function addXP(amount) {
  userXP += amount;
  const nextLevel = levels[userLevel + 1];

  // Check for level up
  if (nextLevel && userXP >= nextLevel.xpRequired) {
    userLevel++;
    alert(`Congratulations! You've reached level ${userLevel} - ${levels[userLevel].name}!`);
  }

  saveProgress();
  updateXPBar();
}

function removeXP(amount) {
  if (userXP - amount < 0) {
    userXP = 0;
  }
  else {
    userXP -= amount;
  }
  saveProgress();
  updateXPBar();
}

// Update XP Bar Display
function updateXPBar() {
  const xpBarContainer = document.getElementById("xp-bar-container");
  if (!xpBarContainer) return;

  const nextLevelXP = levels[userLevel + 1] ? levels[userLevel + 1].xpRequired : userXP;
  const currentLevelXP = levels[userLevel].xpRequired;
  const xpProgress = Math.min((userXP - currentLevelXP) / (nextLevelXP - currentLevelXP), 1) * 100;

  xpBarContainer.innerHTML = `
    <div class="xp-bar">
      <div class="xp-bar-fill" style="width: ${xpProgress}%;"></div>
    </div>
    <img src="${levels[userLevel].image}" alt="Level Image" />
    <p>Level: ${levels[userLevel].name} (${userLevel})</p>
    <p>XP: ${userXP} / ${nextLevelXP}</p>
  `;
}

// Initialize XP Bar on Page Load
function initializeXPBar() {
  const container = document.getElementById("game-container");
  const xpBarContainer = document.createElement("div");
  xpBarContainer.id = "xp-bar-container";
  container.prepend(xpBarContainer);
  updateXPBar();
}

export { addXP, removeXP, initializeXPBar };
