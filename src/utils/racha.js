
const CLAVE = 'r6sdle-racha';

function claveFecha(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

function diaAnterior(fecha) {
  const ayer = new Date(fecha);
  ayer.setDate(ayer.getDate() - 1);
  return ayer;
}

function leerEstado() {
  try {
    const estado = JSON.parse(localStorage.getItem(CLAVE));
    if (
      estado &&
      Number.isInteger(estado.racha) &&
      estado.racha >= 0 &&
      typeof estado.ultimoAcierto === 'string'
    ) {
      return estado;
    }
  } catch {
  }
  return { racha: 0, ultimoAcierto: null };
}

function guardarEstado(estado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
  }
}

export function leerRacha(hoy = new Date()) {
  const estado = leerEstado();
  if (estado.racha === 0) return 0;

  const ultimo = estado.ultimoAcierto;
  if (ultimo === claveFecha(hoy) || ultimo === claveFecha(diaAnterior(hoy))) {
    return estado.racha;
  }

  guardarEstado({ racha: 0, ultimoAcierto: null });
  return 0;
}

export function registrarAcierto(hoy = new Date()) {
  const actual = leerRacha(hoy);
  const estado = leerEstado();
  const clave = claveFecha(hoy);

  if (estado.ultimoAcierto === clave) return actual;

  const nueva = actual + 1;
  guardarEstado({ racha: nueva, ultimoAcierto: clave });
  return nueva;
}

export function reiniciarRacha() {
  guardarEstado({ racha: 0, ultimoAcierto: null });
}