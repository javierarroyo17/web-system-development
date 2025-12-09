import { useState, useEffect } from 'react';

// Ahora acepta "initialData" para el modo edición
function NewRecipeForm({ onRecipeAdded, initialData = null }) {
  const [categories, setCategories] = useState([]);
  
  // Estado inicial: si hay initialData, lo usamos; si no, vacío.
  const [formData, setFormData] = useState(initialData || {
    title: '',
    ingredients: '',
    instructions: '',
    category_id: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, category_id: Number(formData.category_id) };

    // LÓGICA DINÁMICA: Si hay ID, es EDITAR (PUT). Si no, es CREAR (POST).
    const url = initialData 
      ? `http://localhost:3000/api/recipes/${initialData.id}` 
      : 'http://localhost:3000/api/recipes';
    
    const method = initialData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(initialData ? '¡Receta actualizada!' : '¡Receta creada!');
        if (!initialData) {
            setFormData({ title: '', ingredients: '', instructions: '', category_id: '' }); // Solo limpiar si es crear
        }
        onRecipeAdded(); // Callback para redirigir o refrescar
      } else {
        alert('Error al guardar');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '2px solid #eee', padding: '20px', borderRadius: '10px' }}>
      <h2>{initialData ? '✏️ Editar Receta' : '📝 Añadir Nueva Receta'}</h2>
      
      {/* ... (LOS INPUTS SIGUEN IGUAL QUE ANTES) ... */}
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" name="title" placeholder="Título" 
          value={formData.title} onChange={handleChange} required 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <select 
          name="category_id" value={formData.category_id} onChange={handleChange} required
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="">Selecciona categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea 
          name="ingredients" placeholder="Ingredientes..." 
          value={formData.ingredients} onChange={handleChange} required
          style={{ width: '100%', padding: '8px', height: '60px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea 
          name="instructions" placeholder="Instrucciones..." 
          value={formData.instructions} onChange={handleChange} required
          style={{ width: '100%', padding: '8px', height: '80px' }}
        />
      </div>

      <button type="submit" style={{ backgroundColor: '#3498db', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
        {initialData ? 'Actualizar Cambios' : 'Guardar Receta'}
      </button>
    </form>
  );
}

export default NewRecipeForm;