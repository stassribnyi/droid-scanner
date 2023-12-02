export function collectedToRank(collected: number, total: number) {
  if (total === 0) {
    return 'Padawan';
  }

  const coefficient = collected / total;

  if (coefficient < 0.5) {
    return 'Padawan';
  }

  if (coefficient >= 0.5 && coefficient < 0.75) {
    return 'Jedi';
  }

  if (coefficient >= 0.75) {
    return 'Magister';
  }
}
