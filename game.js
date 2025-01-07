import levels from "./levelsDB.js";
import { addXP,removeXP, initializeXPBar } from "./xp.js";


let completedCategories = JSON.parse(localStorage.getItem("completedCategories")) || [];
let currentCategoryIndex = 0;
let currentClassIndex = 0;

function saveCompletedCategory(category) {
  if (!completedCategories.includes(category)) {
    completedCategories.push(category);
    localStorage.setItem("completedCategories", JSON.stringify(completedCategories));
  }
}

function resetGame() {
  currentCategoryIndex = 0;
  currentClassIndex = 0;
  alert("Wrong answer! Game restarting...");
  loadCategory(currentCategoryIndex);
}

function loadHomePage() {
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <h1 class="title">Welcome to my gitgudPTCB study guide</h1>
    <p class="quiz-passage">Finish quiz if you can lol</p>
    <h3 class="subtitle">Completed Categories:</h3>
    <ul class="achievement-list">
      ${
        completedCategories.length
          ? completedCategories.map(cat => `<li class="achievement-item">${cat}</li>`).join("")
          : "<li class='achievement-item'>No categories completed yet lol!!!!</li>"
      }
    </ul>
    <button id="start-btn" class="button-primary">Start Quiz</button>
  `;

  initializeXPBar(); // Initialize XP Bar

  document.getElementById("start-btn").addEventListener("click", () => {
    loadCategory(currentCategoryIndex);
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

  currentClassIndex = 0; // Reset class index for the new category
  loadClass(currentCategoryIndex, currentClassIndex);
}

function loadClass(categoryIndex, classIndex) {
  const category = levels[categoryIndex];
  const drugClass = category.classes[classIndex];
  if (!drugClass) {
    // Category completed
    saveCompletedCategory(category.category);
    document.getElementById("game-container").innerHTML = `
      <h2>Congratulations! You've completed ${category.category}!</h2>
      <p>Returning to the home page...</p>
    `;
    currentCategoryIndex++;
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
    addXP(10); // Add 100 XP for each correct answer
    loadGenericChallenge();
  } else {
    removeXP(8); // Remove 100 XP for each wrong answer
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

function exitGame() {
  loadHomePage();
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

// Initialize the game with the Home Page
loadHomePage();
