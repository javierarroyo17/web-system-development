import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewRecipePage from './pages/NewRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        
        {/* Header Elegante */}
        <header className="main-header">
          <Link to="/" className="logo">
            Recetario Pro
          </Link>
          <nav>
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/new" className="nav-link btn-nav">
              + Añadir Receta
            </Link>
          </nav>
        </header>

        {/* Contenido */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewRecipePage />} />
          <Route path="/edit/:id" element={<EditRecipePage />} />
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;