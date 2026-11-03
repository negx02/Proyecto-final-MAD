const EPOCH = Date.UTC(2026, 0, 1);

// Número de día según la fecha LOCAL del jugador
export function getDayNumber(): number {
  const hoy = new Date();
  const localMidnightUTC = Date.UTC(
    hoy.getFullYear(),
    hoy.getMonth(),
    hoy.getDate()
  );
  return Math.floor((localMidnightUTC - EPOCH) / 86_400_000);
}

// Índice "aleatorio" pero igual para todos ese día
export function getDailyIndex(total: number, modeSeed: number): number {
  const day = getDayNumber();
  let h = Math.imul(day + 1, 2654435761) ^ Math.imul(modeSeed, 40503);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = h ^ (h >>> 13);
  return (h >>> 0) % total;
}