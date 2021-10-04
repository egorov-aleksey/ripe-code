export function getChangesInPercent(newValue: number, oldValue: number): number {
  return Number(((newValue - oldValue) * 100 / newValue).toFixed(2));
}
