import levels from "./levelsDB.js";
import { addXP, removeXP, initializeXPBar } from "./xp.js";

let completedCategories = JSON.parse(localStorage.getItem("completedCategories")) || [];
let currentCategoryIndex = JSON.parse(localStorage.getItem("currentCategoryIndex")) || 0;
let currentClassIndex = 0;
let userCheckpoint = JSON.parse(localStorage.getItem("userCheckpoint")) || 0;

function loadHomePage() {
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <h1 class="title">Welcome to my gitgudPTCB study guide</h1>
    <p class="quiz-passage">Finish the quiz if you can! This is for mobile. :(</p>
    <h3 class="subtitle">Completed Categories:</h3>
    <ul class="achievement-list">
      ${
        completedCategories.length
          ? completedCategories.map(
              (cat, index) => `
                <li class="achievement-item">
                  ${cat}
                  <button class="replay-btn" data-index="${index}">Replay</button>
                </li>`
            ).join("")
          : "<li class='achievement-item'>No categories completed yet!</li>"
      }
    </ul>
    <button id="start-btn" class="button-primary">Start Quiz</button>
  `;

  initializeXPBar(); // Initialize XP Bar

  document.getElementById("start-btn").addEventListener("click", () => {
    loadCategory(currentCategoryIndex);
  });

  document.querySelectorAll(".replay-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.dataset.index, 10);
      replayCategory(index);
    });
  });
}

function loadCategory(categoryIndex) {
  const category = levels[categoryIndex];
  if (!category) {
    document.getElementById("game-container").innerHTML = `
      <h2>Congratulations! You've completed the entire game!</h2>
      <p>All categories are finished.</p>
      <button id="home-btn">Return to Home</button>
    `;
    document.getElementById("home-btn").addEventListener("click", loadHomePage);
    return;
  }

  // Ensure progress resumes from userCheckpoint
  if (userCheckpoint > currentCategoryIndex) {
    currentCategoryIndex = userCheckpoint;
    currentClassIndex = 0;
    loadClass(currentCategoryIndex, currentClassIndex);
    return;
  }

  currentClassIndex = 0; // Reset class index for the new category
  loadClass(categoryIndex, currentClassIndex);
}

function loadClass(categoryIndex, classIndex) {
  const category = levels[categoryIndex];
  const drugClass = category.classes[classIndex];
  if (!drugClass) {
    // Mark category as completed
    saveCompletedCategory(category.category);
    document.getElementById("game-container").innerHTML = `
      <h2>Congratulations! You've completed ${category.category}!</h2>
      <p>Returning to the home page...</p>
    `;
    userCheckpoint = currentCategoryIndex + 1; // Move checkpoint to the next category
    saveUserCheckpoint();
    setTimeout(loadHomePage, 3000); // Move to the home page after 3 seconds
    return;
  }

  const container = document.getElementById("game-container");
  container.innerHTML = `
    <h2 class="quiz-title">${drugClass.class}</h2>
    <p class="quiz-passage">${drugClass.description}</p>
    <h3 class="subtitle">Enter the brand names for the following generic drugs:</h3>
    <form id="brand-form">
      ${drugClass.drugs.map((drug, index) => `
        <label>${drug.generic}:</label>
        <input type="text" id="brand-${index}" data-answer="${drug.brand}" />
        <br>
      `).join('')}
      <button class="button-primary" type="submit">Submit</button>
      <button id="reset-btn" class="button-secondary">Exit Game</button>
    </form>
  `;

  document.getElementById("brand-form").addEventListener("submit", function (event) {
    event.preventDefault();
    checkBrandAnswers(drugClass.drugs);
  });

  document.getElementById("reset-btn").addEventListener("click", exitGame);
}

function checkBrandAnswers(drugs) {
  let allCorrect = true;

  drugs.forEach((drug, index) => {
    const input = document.getElementById(`brand-${index}`);
    if (input.value.trim().toLowerCase() !== drug.brand.toLowerCase()) {
      input.style.border = "2px solid red";
      allCorrect = false;
    } else {
      input.style.border = "2px solid green";
    }
  });

  if (allCorrect) {
    addXP(50); // Add XP for correct answers
    loadGenericChallenge();
  } else {
    removeXP(28); // Deduct XP for incorrect answers
    resetGame();
  }
}

function loadGenericChallenge() {
  const category = levels[currentCategoryIndex];
  const drugClass = category.classes[currentClassIndex];
  const drugs = [...drugClass.drugs].sort(() => Math.random() - 0.5); // Shuffle drugs
  const container = document.getElementById("game-container");

  container.innerHTML = `
    <h3>Now, match the following brand names to their generic names:</h3>
    <form id="generic-form">
      ${drugs.map((drug, index) => `
        <label>${drug.brand}:</label>
        <input type="text" id="generic-${index}" data-answer="${drug.generic}" />
        <br>
      `).join('')}
      <button type="submit" class="button-primary">Submit</button>
    </form>
  `;

  document.getElementById("generic-form").addEventListener("submit", function (event) {
    event.preventDefault();
    checkGenericAnswers(drugs);
  });
}

function checkGenericAnswers(drugs) {
  let allCorrect = true;

  drugs.forEach((drug, index) => {
    const input = document.getElementById(`generic-${index}`);
    if (input.value.trim().toLowerCase() !== drug.generic.toLowerCase()) {
      input.style.border = "2px solid red";
      allCorrect = false;
    } else {
      input.style.border = "2px solid green";
    }
  });

  if (allCorrect) {
    currentClassIndex++;
    loadClass(currentCategoryIndex, currentClassIndex);
  } else {
    resetGame(); // Restart the game on a wrong answer
  }
}

function exitGame() {
  loadHomePage();
}

function saveCompletedCategory(category) {
  if (!completedCategories.includes(category)) {
    completedCategories.push(category);
    localStorage.setItem("completedCategories", JSON.stringify(completedCategories));
  }
}

function saveUserCheckpoint() {
  localStorage.setItem("userCheckpoint", JSON.stringify(userCheckpoint));
  localStorage.setItem("currentCategoryIndex", JSON.stringify(currentCategoryIndex));
}

function resetGame() {
  currentCategoryIndex = 0;
  currentClassIndex = 0;
  userCheckpoint = 0;
  saveUserCheckpoint();
  alert("Wrong answer! Game restarting...");
  loadCategory(currentCategoryIndex);
}

function replayCategory(categoryIndex) {
  if (completedCategories[categoryIndex]) {
    const categoryName = completedCategories[categoryIndex];
    const category = levels.find(level => level.category === categoryName);

    if (category) {
      currentCategoryIndex = levels.indexOf(category); // Set the category index
      currentClassIndex = 0; // Reset class index
      loadClass(currentCategoryIndex, currentClassIndex);
    } else {
      alert("Category data not found!");
    }
  }
}

// Initialize the game with the Home Page
loadHomePage();
