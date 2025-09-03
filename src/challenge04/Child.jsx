const Child = ({ categories }) => {
    return (
    <div>
        <h3>Lista de Categorías</h3>
            <ul>
    {categories.map((cat, index) => (
        <li key={index}>{cat}</li>
    ))}
            </ul>
    </div>
    );
};

export default Child;