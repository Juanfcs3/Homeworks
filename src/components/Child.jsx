import React from 'react';

export default function Child({ numero, increment }) {
  console.log('Child renderizado...');

  return (
    <button 
      className="btn btn-primary mr-3" 
      onClick={() => increment(numero)}
    >
      {numero}
    </button>
  );
}