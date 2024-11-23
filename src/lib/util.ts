interface LatitudeLongitude {
  latitude: number;
  longitude: number;
}
interface Location {
  origin: LatitudeLongitude;
  target: LatitudeLongitude;
}

export const getDistanceBetweenLocations = (location: Location): number => {
  const { origin, target } = location;

  const R = 6371e3;
  const p1 = (origin.latitude * Math.PI) / 180;
  const p2 = (target.latitude * Math.PI) / 180;
  const deltaP = p2 - p1;
  const deltaLon = target.longitude - origin.longitude;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;

  return d / 1000;
};

export const getRandomNumber = (min: number, max: number = 10): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffleArray = <T>(array: Array<T>): T[] => {
  const randomValue = getRandomNumber(0);

  for (let i = 0; i < getRandomNumber(1, randomValue); i++) {
    array.sort(() => 0.5 - Math.random());
  }

  return array;
};
