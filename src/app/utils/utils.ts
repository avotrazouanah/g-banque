export function generateId() {
  return Math.floor(Math.random() * 1000000);
}

export function roundTo(value: number, place: number) {
  const factor = 10 ** place;
  return Math.round(value * factor) / factor;
}
