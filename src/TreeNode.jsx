import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/*
 * TreeNode renderiza cada nodo con:
 *  - un toggle (▶/▼) si tiene hijos
 *  - un Link funcional hacia su ruta
 *  - recursión para mostrar los hijos cuando está abierto
 */

const TreeNode = ({ node }) => {
  const [open, setOpen] = useState(node.title === "Inicio"); // que Inicio empiece abierto
  const location = useLocation();

  const toggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const isActive = location.pathname === node.link || location.hash === `#${node.link}`;

  return (
    <div>
      <div className="node-title">
        {node.children.length > 0 && (
          <span className="toggle" onClick={toggle}>
            {open ? "▼" : "▶"}
          </span>
        )}

        <Link
          to={node.link || "/"}
          className={`node-link ${isActive ? "active" : ""}`}
          onClick={() => {
            if (node.children.length > 0 && node.title !== "Inicio") setOpen(true);
          }}
        >
          {node.title}
        </Link>
      </div>

      {open && node.children.length > 0 && (
        <ul>
          {node.children.map((child, i) => (
            <li key={i}>
              <TreeNode node={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNode;
