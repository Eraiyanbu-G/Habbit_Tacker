function addXP(state) {
  state.xp += 10;

  if (state.xp >= state.level * 100) {
    state.xp = 0;
    state.level++;
    alert("🎉 Level Up!");
  }
}

function updateStreak(state, today) {
  if (!state.lastDate) {
    state.streak = 1;
  } else {
    const last = new Date(state.lastDate);
    const curr = new Date(today);
    const diff = (curr - last) / (1000 * 60 * 60 * 24);

    if (diff === 1) state.streak++;
    else if (diff > 1) state.streak = 1;
  }

  state.lastDate = today;
}

export { addXP, updateStreak };
