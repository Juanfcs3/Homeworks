import { createId } from '../utils/id';

export function createZoneNode(name) {
  return { id: createId(), name, children: [] };
}

export function cloneZoneTree(node) {
  if (!node) return null;
  return {
    id: node.id,
    name: node.name,
    children: node.children.map(cloneZoneTree),
  };
}

export function findZoneById(node, id) {
  if (!node) return null;
  if (node.id === id) return node;
  for (const c of node.children) {
    const f = findZoneById(c, id);
    if (f) return f;
  }
  return null;
}

export function countZones(node) {
  if (!node) return 0;
  return 1 + node.children.reduce((a, c) => a + countZones(c), 0);
}

export function calculateHeight(node) {
  if (!node) return 0;
  if (node.children.length === 0) return 1;
  return 1 + Math.max(...node.children.map(calculateHeight));
}

export function flattenZones(node, depth = 0, arr = []) {
  if (!node) return arr;
  arr.push({ id: node.id, name: node.name, depth });
  node.children.forEach((c) => flattenZones(c, depth + 1, arr));
  return arr;
}
