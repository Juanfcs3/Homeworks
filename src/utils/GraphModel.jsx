// src/utils/GraphModel.js
export default class GraphModel {
  constructor() {
    this.nodes = [];
    this.links = [];
  }

  addCity(cityName) {
    const id = `city:${cityName}`;
    if (!this.nodes.find(n => n.id === id)) {
      this.nodes.push({ id, label: cityName, type: 'city' });
    }
  }

  addPerson(name, age, cityName) {
    if (!name) return;
    const personId = `person:${name}`;

    const existing = this.nodes.find(n => n.id === personId);
    if (existing) {
      existing.age = age;
    } else {
      this.nodes.push({ id: personId, label: name, type: 'person', age });
    }

    const cityId = `city:${cityName}`;
    if (!this.nodes.find(n => n.id === cityId)) {
      this.addCity(cityName);
    }


    this.links = this.links.filter(l => !(l.source === personId && l.target?.startsWith('city:')));
    this.links.push({ source: personId, target: cityId });
  }

  peopleInCity(cityName) {
    const cityId = `city:${cityName}`;
    const persons = this.links
      .filter(l => l.target === cityId)
      .map(l => {
        const personNode = this.nodes.find(n => n.id === l.source);
        return personNode ? { name: personNode.label, age: personNode.age || null, id: personNode.id } : null;
      })
      .filter(Boolean);
    return persons;
  }

  toGraphData() {
    return {
      nodes: this.nodes.map(n => ({ id: n.id, label: n.label, type: n.type, age: n.age })),
      links: this.links.map(l => ({ source: l.source, target: l.target })),
    };
  }


  loadFrom(initialNodes = [], initialLinks = []) {
    this.nodes = initialNodes.map(n => ({...n}));
    this.links = initialLinks.map(l => ({...l}));
  }
}
