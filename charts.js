import { loadData } from "./storage.js";

let sleepChartInstance = null;

function renderSleepChart() {
  const { logs } = loadData();
  const last7 = logs.slice(-7);

  if (last7.length === 0) return;

  const labels = last7.map(l => l.date);
  const sleepData = last7.map(l => l.sleep);

  const ctx = document.getElementById("sleepChart");

  // destroy old chart to avoid duplicates
  if (sleepChartInstance) {
    sleepChartInstance.destroy();
  }

  sleepChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Sleep (hours)",
          data: sleepData,
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });
}

export { renderSleepChart };



let waterChartInstance = null;

// existing renderSleepChart() stays as-is

function renderWaterChart() {
  const { logs } = loadData();
  const last7 = logs.slice(-7);
  if (last7.length === 0) return;

  const labels = last7.map(l => l.date);
  const waterData = last7.map(l => l.water);

  const ctx = document.getElementById("waterChart");

  if (waterChartInstance) {
    waterChartInstance.destroy();
  }

  waterChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Water (glasses)",
        data: waterData,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}

export { renderWaterChart };

let exerciseChartInstance = null;

function renderExerciseChart() {
  const { logs } = loadData();
  const last7 = logs.slice(-7);
  if (last7.length === 0) return;

  const labels = last7.map(l => l.date);
  const exerciseData = last7.map(l => l.exercise);

  const ctx = document.getElementById("exerciseChart");

  if (exerciseChartInstance) {
    exerciseChartInstance.destroy();
  }

  exerciseChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Exercise (minutes)",
        data: exerciseData,
        borderWidth: 2,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}

export { renderExerciseChart };

