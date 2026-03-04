import { loadData } from "./storage.js";

function renderHeader() {
  const { level, xp, streak } = loadData();

  document.getElementById("level").textContent = `Level ${level}`;
  document.getElementById("xp").textContent = `${xp} XP`;
  document.getElementById("streak").textContent = streak;
}

function renderWeeklySummary() {
  const { logs } = loadData();
  const last7 = logs.slice(-7);

  let sleep = 0, water = 0, exercise = 0;

  last7.forEach(l => {
    sleep += l.sleep;
    water += l.water;
    exercise += l.exercise;
  });

  document.getElementById("avgSleep").textContent =
    last7.length ? (sleep / last7.length).toFixed(1) : "0";

  document.getElementById("totalWater").textContent = water;
  document.getElementById("totalExercise").textContent = exercise;
}

function renderAchievements() {
  const { achievements = [] } = loadData();

  const ul = document.getElementById("achievementList");

  ul.innerHTML = "";

  if (achievements.length === 0) {
    ul.innerHTML = "<li>No achievements yet</li>";
    return;
  }

  achievements.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    ul.appendChild(li);
  });
}

function setupTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  const toggleBtn = document.getElementById("themeToggle");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

export {
  renderHeader,
  renderWeeklySummary,
  renderAchievements,
  setupTheme
};
