import { cloneZoneTree, createZoneNode, findZoneById } from '../../models/zoneTree';

export function addZone(city, name, parentId) {
  const node = createZoneNode(name);
  if (!city.rootZone) return { ...city, rootZone: node };

  const root = cloneZoneTree(city.rootZone);
  if (!parentId) root.children.push(node);
  else {
    const parent = findZoneById(root, parentId);
    if (parent) parent.children.push(node);
  }
  return { ...city, rootZone: root };
}
