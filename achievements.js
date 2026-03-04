function checkAchievements(state) {
  if (state.streak >= 7 && !state.achievements.includes("7 Day Streak")) {
    state.achievements.push("7 Day Streak");
  }
}

export { checkAchievements };
