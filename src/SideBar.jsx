import React from "react";
import TreeNode from "./TreeNode";
import root from "./menuTree";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Menú</h2>
      <div>
        <ul>
          <li>
            <TreeNode node={root} />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
