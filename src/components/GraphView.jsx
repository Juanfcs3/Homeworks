import React from 'react';
import { Graph } from 'react-d3-graph';
import './GraphView.css';

const GraphView = ({ data, onClickNode }) => {
  const myConfig = {
    nodeHighlightBehavior: true,
    automaticRearrangeAfterDropNode: true,
    directed: true,
    node: {
      size: 400,
      fontSize: 10,
      renderLabel: true,
      labelProperty: 'label',
    },
    link: {
      highlightColor: 'blue',
      renderLabel: false,
    },
    d3: {
      gravity: -400,
      linkLength: 200,
    },
  };

  const handleClickNode = function(nodeId) {
    if (onClickNode) onClickNode(nodeId);
  };

  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ddd', borderRadius: 8, padding: 8 }}>
      <Graph
        id="graph-id"
        data={data}
        config={myConfig}
        onClickNode={handleClickNode}
      />
    </div>
  );
};

export default GraphView;
