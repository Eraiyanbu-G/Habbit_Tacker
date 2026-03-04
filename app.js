import { loadData, saveData } from "./storage.js";
import { addXP, updateStreak } from "./stats.js";
import { checkAchievements } from "./achievements.js";
import {
  renderHeader,
  renderWeeklySummary,
  renderAchievements,
  setupTheme
} from "./ui.js";
import {
  renderSleepChart,
  renderWaterChart,
  renderExerciseChart
} from "./charts.js";
import { exportCSV } from "./export.js";

function init() {
  setupTheme();
  renderAll();
  setupTodayForm();
  setupExport();
}

function renderAll() {
  renderHeader();
  renderWeeklySummary();
  renderAchievements();
  renderSleepChart();
  renderWaterChart();
  renderExerciseChart();
}

function setupExport() {
  document
    .getElementById("exportBtn")
    .addEventListener("click", exportCSV);
}

function setupTodayForm() {
  const form = document.getElementById("dailyForm");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const state = loadData();

    const sleep = Number(sleepInput.value);
    const water = Number(waterInput.value);
    const exercise = Number(exerciseInput.value);

    const today = new Date().toISOString().split("T")[0];

    if (state.logs.some(l => l.date === today)) {
      alert("Already logged today");
      return;
    }

    const entry = { date: today, sleep, water, exercise };
    state.logs.push(entry);

    updateStreak(state, today);
    addXP(state);
    applyGoalBonus(state, entry);
    checkAchievements(state);

    saveData(state);
    renderAll();
    form.reset();
  });
}

function applyGoalBonus(state, entry) {
  const { goals } = state;

  let bonus = 0;

  if (entry.sleep >= goals.sleep) bonus += 5;
  if (entry.water >= goals.water) bonus += 5;
  if (entry.exercise >= goals.exercise) bonus += 5;

  state.xp += bonus;
}

init();