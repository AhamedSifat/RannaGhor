type Coordinate = {
  lat: number;
  lng: number;
};

export function calculateDistance(
  point1: Coordinate,
  point2: Coordinate,
): number {
  const toRad = (value: number): number => (value * Math.PI) / 180;

  const R = 6371;

  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
