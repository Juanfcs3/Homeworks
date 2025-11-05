import React, { useEffect, useState } from "react";
import BinaryTree from "./BinaryTree";
import { sampleSequence } from "./data";
import TreeVisualization from "./TreeVisualization";
import "./index.css";

function App() {
  const [tree] = useState(new BinaryTree());
  const [d3Data, setD3Data] = useState(null);

  useEffect(() => {
    console.log("CHALLENGE 14");

    sampleSequence.forEach((num) => tree.insert(num));

    console.log("Recorrido InOrder:", tree.inorder());
    console.log("Recorrido PreOrder:", tree.preorder());
    console.log("Recorrido PostOrder:", tree.postorder());
    console.log("¿Contiene 40?:", tree.contains(40));
    console.log("¿Contiene 99?:", tree.contains(99));

    setD3Data(tree.toD3Tree());
  }, [tree]);

  return (
    <div className="app">
      <h1>Challenge 14</h1>
      <p>
        Abrir consola para ver recorridos del árbol.  
        El arbol de abajo muestra la estructura.
      </p>

      <div className="controls">
        <p>Secuencia usada: {sampleSequence.join(", ")}</p>
      </div>

      <TreeVisualization treeData={d3Data} />
    </div>
  );
}

export default App;
