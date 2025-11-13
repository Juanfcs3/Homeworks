export const sampleNodes = [
  { id: 'city:Medellín', label: 'Medellín', type: 'city' },
  { id: 'city:Bogotá', label: 'Bogotá', type: 'city' },
  { id: 'person:Ana', label: 'Ana', type: 'person', age: 20 },
  { id: 'person:Carlos', label: 'Carlos', type: 'person', age: 23 },
  { id: 'person:María', label: 'María', type: 'person', age: 21 },
];

export const sampleLinks = [
  { source: 'person:Ana', target: 'city:Medellín' },
  { source: 'person:Carlos', target: 'city:Bogotá' },
  { source: 'person:María', target: 'city:Medellín' },
];
