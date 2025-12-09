import NewRecipeForm from '../components/NewRecipeForm';
import { useNavigate } from 'react-router-dom';

function NewRecipePage() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} className="btn btn-back">
        ← Volver al listado
      </button>
      
      <div style={{ marginTop: '20px' }}>
        <NewRecipeForm onRecipeAdded={() => navigate('/')} />
      </div>
    </div>
  );
}

export default NewRecipePage;