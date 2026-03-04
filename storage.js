const KEY = "lifeStats";

function loadData() {
  const saved = JSON.parse(localStorage.getItem(KEY));

  if (saved) return saved;

  return {
    xp: 0,
    level: 1,
    streak: 0,
    lastDate: null,
    logs: [],
    achievements: [],
    goals: {
      sleep: 8,
      water: 8,
      exercise: 30
    }
  };
}

function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export { loadData, saveData };