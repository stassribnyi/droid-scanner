// TODO: reuse collectedToRank
export function collectedToColor(collected: number, total: number) {
    if (total === 0) {
        return 'white';
    }

    const coefficient = collected / total;

    if (coefficient < 0.5) {
        return '#9CD0B2';
    }

    if (coefficient >= 0.5 && coefficient < 0.75) {
        return '#c1aaff';
    }

    if (coefficient >= 0.75) {
        return '#ffc05f';
    }
}