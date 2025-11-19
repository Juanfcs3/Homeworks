function ZoneTree({ node, selectedId, onSelect }) {
  if (!node) return <p>No hay zonas.</p>;
  return (
    <ul className="zone-tree">
      <li className="zone-item">
        <span
          onClick={() => onSelect(node.id)}
          className={selectedId === node.id ? 'selected' : ''}
        >
          {node.name}
        </span>
        {node.children.map((c) => (
          <ZoneTree key={c.id} node={c} selectedId={selectedId} onSelect={onSelect} />
        ))}
      </li>
    </ul>
  );
}

export default ZoneTree;
