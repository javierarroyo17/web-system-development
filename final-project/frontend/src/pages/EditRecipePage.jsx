import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewRecipeForm from '../components/NewRecipeForm';

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  useEffect(() => {
    // Obtenemos todas las recetas y filtramos (en una app grande haríamos un fetch por ID específico)
    fetch('http://localhost:3000/api/recipes')
      .then(res => res.json())
      .then(data => {
        const found = data.find(r => r.id === Number(id));
        if (found) setRecipeToEdit(found);
      })
      .catch(err => console.error("Error cargando receta:", err));
  }, [id]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} className="btn btn-back">
        ← Cancelar y volver
      </button>
      
      <div style={{ marginTop: '20px' }}>
        {recipeToEdit ? (
          <NewRecipeForm 
              initialData={recipeToEdit} 
              onRecipeAdded={() => navigate('/')} 
          />
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando datos de la receta...</p>
        )}
      </div>
    </div>
  );
}

export default EditRecipePage;