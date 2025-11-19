import { countZones, calculateHeight } from '../../models/zoneTree';

export function computeStats(city) {
  const r = city.rootZone;
  return {
    total: r ? countZones(r) : 0,
    height: r ? calculateHeight(r) : 0,
  };
}
