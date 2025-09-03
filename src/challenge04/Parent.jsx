import { useState } from "react";
import Child from "./Child";

const Parent = () => {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const handleInputChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAddCategory = () => {
    if (category.trim().length === 0) return;

    setCategories([...categories, category]); 
    setCategory(""); 
    };

    return (
        <div>
    <h2>Challenge 04</h2>


    <input
        type="text"
        placeholder="Escribe una categoría"
        value={category}
        onChange={handleInputChange}
    />

    <button onClick={handleAddCategory}>Agregar</button>

    <Child categories={categories} />
        </div>
);
};

export default Parent;