export interface Coordinate {
  latitude: number
  longitude: number
}

/**
 * Gera uma coordenada aleatória que está dentro de uma distância mínima e máxima de uma coordenada de referência.
 *
 * @param {Coordinate} reference - A coordenada de referência.
 * @param {number} minDistance - A distância mínima em quilômetros.
 * @param {number} maxDistance - A distância máxima em quilômetros.
 * @returns {Coordinate} A coordenada gerada.
 */
export function generateRandomCoordinate(
  reference: Coordinate,
  minDistance: number,
  maxDistance: number,
): Coordinate {
  const R = 6371 // Raio médio da Terra em quilômetros
  const lat1 = (reference.latitude * Math.PI) / 180 // Latitude da coordenada de referência em radianos
  const lon1 = (reference.longitude * Math.PI) / 180 // Longitude da coordenada de referência em radianos
  const d = Math.random() * (maxDistance - minDistance) + minDistance // Distância aleatória em quilômetros

  // Fórmula para calcular a nova latitude em radianos
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d / R) +
      Math.cos(lat1) * Math.sin(d / R) * Math.cos(Math.random() * 2 * Math.PI),
  )

  // Fórmula para calcular a nova longitude em radianos
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(Math.random() * 2 * Math.PI) * Math.sin(d / R) * Math.cos(lat1),
      Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2),
    )

  // Conversão para graus e criação do objeto Coordinate
  const latitude = (lat2 * 180) / Math.PI
  const longitude = (lon2 * 180) / Math.PI
  return { latitude, longitude }
}
