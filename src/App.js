import React, { useEffect, useState } from 'react';
import './App.css';
import GraphModel from './utils/GraphModel';
import { sampleNodes, sampleLinks } from './data/sampleData';
import GraphView from './components/GraphView';
import PeopleList from './components/PeopleList';

function App() {
  const [model] = useState(new GraphModel());
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedCity, setSelectedCity] = useState('');
  const [residents, setResidents] = useState([]);

  const [personName, setPersonName] = useState('');
  const [personAge, setPersonAge] = useState('');
  const [personCity, setPersonCity] = useState('');
  const [newCityName, setNewCityName] = useState('');

  useEffect(() => {
    model.loadFrom(sampleNodes, sampleLinks);
    setGraphData(model.toGraphData());
  }, [model]);

  const refresh = () => {
    setGraphData(model.toGraphData());
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    model.addCity(newCityName.trim());
    setNewCityName('');
    refresh();
  };


  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!personName.trim() || !personCity.trim()) return;
    const ageNumber = personAge ? Number(personAge) : null;
    model.addPerson(personName.trim(), ageNumber, personCity.trim());
    setPersonName('');
    setPersonAge('');
    setPersonCity('');
    refresh();
  };

  const handleClickNode = (nodeId) => {
    if (nodeId.startsWith('city:')) {
      const cityName = nodeId.replace('city:', '');
      setSelectedCity(cityName);
      setResidents(model.peopleInCity(cityName));
    } else if (nodeId.startsWith('person:')) {
      const personLinks = model.links.filter(l => l.source === nodeId);
      const cityLink = personLinks.find(l => l.target?.startsWith('city:'));
      if (cityLink) {
        const cityName = cityLink.target.replace('city:', '');
        setSelectedCity(cityName);
        setResidents(model.peopleInCity(cityName));
      }
    }
  };

  const cityNames = graphData.nodes
    .filter(n => n.type === 'city' || n.id?.startsWith('city:'))
    .map(n => n.label || (n.id && n.id.replace('city:', '')))
    .filter(Boolean);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Challenge 16 </h1>
        <p>Cada persona y ciudad es un nodo. Las personas están referenciadas a una ciudad.</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, padding: 16 }}>
        <section>
          <GraphView data={graphData} onClickNode={handleClickNode} />
        </section>

        <aside style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <h2>Administrar</h2>

          <form onSubmit={handleAddCity} style={{ marginBottom: 12 }}>
            <label><strong>Añadir Ciudad</strong></label>
            <input value={newCityName} onChange={e => setNewCityName(e.target.value)} placeholder="Nombre ciudad" />
            <button type="submit">Agregar ciudad</button>
          </form>

          <form onSubmit={handleAddPerson} style={{ marginBottom: 12 }}>
            <label><strong>Añadir Persona</strong></label>
            <input value={personName} onChange={e => setPersonName(e.target.value)} placeholder="Nombre persona" />
            <input value={personAge} onChange={e => setPersonAge(e.target.value)} placeholder="Edad (opcional)" />
            <select value={personCity} onChange={e => setPersonCity(e.target.value)}>
              <option value="">-- Selecciona ciudad --</option>
              {cityNames.map(c => <option value={c} key={c}>{c}</option>)}
            </select>
            <button type="submit">Agregar persona</button>
          </form>

          <div style={{ marginTop: 8 }}>
            <h3>Filtrar por ciudad</h3>
            <select value={selectedCity} onChange={e => {
              const city = e.target.value;
              setSelectedCity(city);
              setResidents(city ? model.peopleInCity(city) : []);
            }}>
              <option value="">-- Seleccionar ciudad --</option>
              {cityNames.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <hr style={{ margin: '12px 0' }} />

          <PeopleList cityName={selectedCity} people={residents} />

          <div style={{ marginTop: 12 }}>
            <small>Haz click en un nodo del grafo para seleccionarlo (ciudad o persona).</small>
          </div>
        </aside>
      </main>

      <footer style={{ padding: 12, textAlign: 'center' }}>
        <small>CHALLENGE 16 </small>
      </footer>
    </div>
  );
}

export default App;
