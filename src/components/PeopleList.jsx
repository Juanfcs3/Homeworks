import React from 'react';

const PeopleList = ({ cityName, people }) => {
  return (
    <div style={{ padding: 12 }}>
      <h3>Personas en {cityName || '...'}</h3>
      {(!cityName) && <p>Selecciona una ciudad para ver residentes.</p>}
      {cityName && people.length === 0 && <p>No hay personas registradas en {cityName}.</p>}
      {people.length > 0 && (
        <ul>
          {people.map(p => (
            <li key={p.id}>{p.name} {p.age ? `- ${p.age} años` : ''}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PeopleList;
