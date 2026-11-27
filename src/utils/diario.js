
const INICIO = Date.UTC(2025, 8, 25);
const MS_POR_DIA = 24 * 60 * 60 * 1000;

export function numeroOperativo(fecha = new Date()) {
  const hoy = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  return Math.max(1, Math.floor((hoy - INICIO) / MS_POR_DIA) + 1);
}

function dosDigitos(numero) {
  return String(numero).padStart(2, '0');
}

export function cuentaRegresiva(ahora = new Date()) {
  const medianoche = new Date(ahora);
  medianoche.setHours(24, 0, 0, 0);

  const totalSegundos = Math.max(0, Math.floor((medianoche.getTime() - ahora.getTime()) / 1000));
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  return `${dosDigitos(horas)}:${dosDigitos(minutos)}:${dosDigitos(segundos)}`;
}