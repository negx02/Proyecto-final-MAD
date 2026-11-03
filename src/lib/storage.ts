import { getDayNumber } from "./daily";

export interface Progreso {
  day: number;
  guesses: string[]; // ids de operadores intentados
  won: boolean;
}

export interface Stats {
  jugadas: number;
  ganadas: number;
  racha: number;
  mejorRacha: number;
  ultimoDiaGanado: number;
}

const statsPorDefecto: Stats = {
  jugadas: 0,
  ganadas: 0,
  racha: 0,
  mejorRacha: 0,
  ultimoDiaGanado: -1,
};

export function cargarProgreso(modo: string): Progreso {
  const hoy = getDayNumber();
  try {
    const raw = localStorage.getItem(`r6sdle:${modo}:progreso`);
    if (raw) {
      const p = JSON.parse(raw) as Progreso;
      if (p.day === hoy) return p;
    }
  } catch {}
  return { day: hoy, guesses: [], won: false };
}

export function guardarProgreso(modo: string, p: Progreso) {
  try {
    localStorage.setItem(`r6sdle:${modo}:progreso`, JSON.stringify(p));
  } catch {}
}

export function cargarStats(modo: string): Stats {
  try {
    const raw = localStorage.getItem(`r6sdle:${modo}:stats`);
    if (raw) return { ...statsPorDefecto, ...JSON.parse(raw) };
  } catch {}
  return { ...statsPorDefecto };
}

export function registrarVictoria(modo: string) {
  const s = cargarStats(modo);
  const hoy = getDayNumber();
  s.jugadas += 1;
  s.ganadas += 1;
  s.racha = s.ultimoDiaGanado === hoy - 1 ? s.racha + 1 : 1;
  s.mejorRacha = Math.max(s.mejorRacha, s.racha);
  s.ultimoDiaGanado = hoy;
  try {
    localStorage.setItem(`r6sdle:${modo}:stats`, JSON.stringify(s));
  } catch {}
}