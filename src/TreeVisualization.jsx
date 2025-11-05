import React from "react";
import Tree from "react-d3-tree";

export default function TreeVisualization({ treeData }) {
  if (!treeData) return <p>No hay datos para mostrar.</p>;

  return (
    <div id="treeWrapper" style={{ width: "100%", height: "500px" }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 300, y: 50 }}
      />
    </div>
  );
}
