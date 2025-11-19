export function createId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return Date.now().toString(16) + Math.random().toString(16).slice(2);
}
