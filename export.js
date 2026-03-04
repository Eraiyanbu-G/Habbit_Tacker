import { loadData } from "./storage.js";

function exportCSV() {
  console.log("exportCSV started"); // DEBUG

  const { logs } = loadData();

  if (!logs || logs.length === 0) {
    alert("No data to export");
    return;
  }

  let csv = "Date,Sleep,Water,Exercise\n";

  logs.forEach(log => {
    csv += `${log.date},${log.sleep},${log.water},${log.exercise}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "life-stats.csv";
  a.click();

  URL.revokeObjectURL(url);
}

export { exportCSV };