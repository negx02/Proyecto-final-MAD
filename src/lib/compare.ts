export interface Operador {
  id: string;
  nombre: string;
  bando: string;
  anio: number;
  unidad: string;
  pais: string;
  velocidad: number;
  salud: number;
}

export type Estado = "correcto" | "incorrecto" | "mayor" | "menor";

export interface Pista {
  campo: keyof Operador;
  valor: string | number;
  estado: Estado;
}

const CAMPOS_TEXTO = ["bando", "unidad", "pais"] as const;
const CAMPOS_NUMERO = ["anio", "velocidad", "salud"] as const;

export function comparar(intento: Operador, objetivo: Operador): Pista[] {
  const pistas: Pista[] = [];

  for (const campo of CAMPOS_TEXTO) {
    pistas.push({
      campo,
      valor: intento[campo],
      estado: intento[campo] === objetivo[campo] ? "correcto" : "incorrecto",
    });
  }

  for (const campo of CAMPOS_NUMERO) {
    let estado: Estado = "correcto";
    // "mayor" = el objetivo tiene un valor MAYOR al intento (flecha arriba)
    if (objetivo[campo] > intento[campo]) estado = "mayor";
    else if (objetivo[campo] < intento[campo]) estado = "menor";
    pistas.push({ campo, valor: intento[campo], estado });
  }

  return pistas;
}