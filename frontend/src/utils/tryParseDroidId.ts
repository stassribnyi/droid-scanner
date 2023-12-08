// TODO: revisit, review, remove
export function tryParseDroidId(data: string | undefined) {
  try {
    if (!data) {
      return null;
    }

    const url = new URL(data);
    const droidId = url.searchParams.get('droidId');

    if (!droidId) {
      return null;
    }

    return parseInt(droidId, 10);
  } catch (err) {
    return -1;
  }
}
