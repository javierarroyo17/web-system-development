import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecipes = () => {
    fetch('http://localhost:3000/api/recipes')
      .then(res => res.ok ? res.json() : Promise.reject('Error de conexión'))
      .then(data => setRecipes(data))
      .catch(err => setError(err));
  };

  useEffect(() => { fetchRecipes(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta receta?")) return;
    try {
      await fetch(`http://localhost:3000/api/recipes/${id}`, { method: 'DELETE' });
      setRecipes(recipes.filter(r => r.id !== id));
    } catch (err) { alert("Error al borrar"); }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', borderBottom: '3px solid var(--primary)', display: 'inline-block', paddingBottom: '5px' }}>
          Mis Recetas
        </h2>
      </div>

      {error && <div style={{ color: 'var(--danger)', textAlign: 'center', fontWeight: 'bold' }}>⚠️ {error}</div>}

      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            
            {/* Botones Flotantes */}
            <div className="card-actions">
              <Link to={`/edit/${recipe.id}`} className="btn-icon btn-edit" title="Editar">
                ✎
              </Link>
              <button onClick={() => handleDelete(recipe.id)} className="btn-icon btn-delete" title="Borrar">
                ×
              </button>
            </div>

            {/* Categoría */}
            <span className="category-tag">
              {recipe.category_name || 'General'}
            </span>
            
            {/* Título */}
            <h3 className="recipe-title">{recipe.title}</h3>
            
            {/* Resumen Ingredientes */}
            <p className="ingredient-preview">
              🥘 {recipe.ingredients.length > 45 ? recipe.ingredients.substring(0, 45) + '...' : recipe.ingredients}
            </p>
            
            {/* Detalles desplegables */}
            <details>
              <summary>Ver instrucciones</summary>
              <p style={{ marginTop: '10px', fontSize: '0.95rem', whiteSpace: 'pre-line', color: '#555' }}>
                {recipe.instructions}
              </p>
            </details>
          </div>
        ))}
      </div>

      {/* Mensaje si está vacío */}
      {recipes.length === 0 && !error && (
        <div style={{ textAlign: 'center', marginTop: '50px', opacity: 0.6 }}>
          <div style={{ fontSize: '3rem' }}>🥣</div>
          <h3>No hay recetas aún</h3>
          <p>¡Dale al botón de arriba y añade tu primera creación!</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;