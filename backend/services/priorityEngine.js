function normalize(x, min = 0, max = 10) {
  if (x === null || x === undefined || isNaN(x)) return 5;
  return Math.max(min, Math.min(max, Number(x)));
}

exports.computePriority = (features) => {
  const urgency = normalize(features.urgencyScore);
  const importance = normalize(features.importanceScore);
  let deadlineFactor = 4;
  if (features.deadline) {
    const d = new Date(features.deadline);
    const now = new Date();
    const diffHours = (d - now) / (1000 * 60 * 60);
    if (diffHours <= 24) deadlineFactor = 10;
    else if (diffHours <= 72) deadlineFactor = 7;
    else deadlineFactor = 4;
  }
  let timeFactor = 5;
  if (features.estimatedDuration) {
    const mins = Number(features.estimatedDuration);
    if (mins <= 15) timeFactor = 8;
    else if (mins <= 60) timeFactor = 6;
    else timeFactor = 3;
  }
  const score = (urgency * 0.4) + (importance * 0.3) + (deadlineFactor * 0.2) + (timeFactor * 0.1);
  let label = "Low";
  if (score >= 8) label = "Critical";
  else if (score >= 6) label = "High";
  else if (score >= 4) label = "Medium";
  else label = "Low";

  return { score: Number(score.toFixed(2)), label };
};
