import { useEffect, useState } from 'react';
import './index.css';

import CityList from './components/CityList';
import CityConnections from './components/CityConnections';
import ZoneTree from './components/ZoneTree';

import { createEmptyNetwork } from './models/network';
import { addCity } from './features/cities/addCity';
import { deleteCity } from './features/cities/deleteCity';
import { connectCities } from './features/cities/connectCities';
import { addZone } from './features/zones/addZone';
import { editZone } from './features/zones/editZone';
import { computeStats } from './features/zones/computeStats';
import { flattenZones } from './models/zoneTree';

function App() {
  const [network, setNetwork] = useState(createEmptyNetwork());
  const [selected, setSelected] = useState(null);

  const [newCity, setNewCity] = useState('');
  const [cityA, setCityA] = useState('');
  const [cityB, setCityB] = useState('');

  const [zoneName, setZoneName] = useState('');
  const [parentZone, setParentZone] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');

  const [stats, setStats] = useState({ total: 0, height: 0 });

  useEffect(() => {
    const s = localStorage.getItem('net');
    if (s) setNetwork(JSON.parse(s));
  }, []);

  useEffect(() => {
    localStorage.setItem('net', JSON.stringify(network));
  }, [network]);

  const city = network.cities.find((c) => c.id === selected);

  function addCityHandler() {
    const n = addCity(network, newCity);
    setNetwork(n);
    setNewCity('');
  }

  function deleteCityHandler(id) {
    setNetwork(deleteCity(network, id));
    if (selected === id) setSelected(null);
  }

  function connectHandler() {
    setNetwork(connectCities(network, cityA, cityB));
  }

  function addZoneHandler() {
    const updated = network.cities.map((c) =>
      c.id === selected ? addZone(c, zoneName, parentZone) : c
    );
    setNetwork({ ...network, cities: updated });
    setZoneName('');
  }

  function editZoneHandler() {
    const updated = network.cities.map((c) =>
      c.id === selected ? editZone(c, editId, editName) : c
    );
    setNetwork({ ...network, cities: updated });
    setEditName('');
  }

  function statsHandler() {
    setStats(city ? computeStats(city) : { total: 0, height: 0 });
  }

  const flat = city?.rootZone ? flattenZones(city.rootZone) : [];

  return (
    <div className="app-container">
      <h1>Parcial 3</h1>

      <div className="section">
        <h2>Ciudades</h2>
        <input value={newCity} onChange={(e) => setNewCity(e.target.value)} />
        <button className="primary" onClick={addCityHandler}>Agregar</button>
        <CityList
          cities={network.cities}
          selectedId={selected}
          onSelect={setSelected}
          onDelete={deleteCityHandler}
        />
      </div>

      <div className="section">
        <h2>Conectar ciudades</h2>
        <select value={cityA} onChange={(e) => setCityA(e.target.value)}>
          <option value="">A</option>
          {network.cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={cityB} onChange={(e) => setCityB(e.target.value)}>
          <option value="">B</option>
          {network.cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <button className="primary" onClick={connectHandler}>Conectar</button>
      </div>

      {city && (
        <>
          <CityConnections network={network} cityId={selected} />

          <div className="section">
            <h2>{city.name}</h2>

            <div className="flex-row">
              <div className="flex-col">
                <ZoneTree node={city.rootZone} selectedId={editId} onSelect={setEditId} />
              </div>

              <div className="flex-col">
                <h3>Agregar zona</h3>
                <input value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
                <select value={parentZone} onChange={(e) => setParentZone(e.target.value)}>
                  <option value="">(raíz)</option>
                  {flat.map((z) => (
                    <option key={z.id} value={z.id}>{'— '.repeat(z.depth) + z.name}</option>
                  ))}
                </select>
                <button className="primary" onClick={addZoneHandler}>Agregar</button>

                <h3>Editar zona</h3>
                <select value={editId} onChange={(e) => setEditId(e.target.value)}>
                  <option value="">Seleccionar</option>
                  {flat.map((z) => (
                    <option key={z.id} value={z.id}>{'— '.repeat(z.depth) + z.name}</option>
                  ))}
                </select>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                <button className="secondary" onClick={editZoneHandler} disabled={!editId}>
                  Guardar
                </button>

                <h3>Estadísticas</h3>
                <button className="primary" onClick={statsHandler}>Calcular</button>
                <div className="stats-box">
                  <p>Total: {stats.total}</p>
                  <p>Altura: {stats.height}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
