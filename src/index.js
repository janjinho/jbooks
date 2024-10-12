import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Se estiver usando o react-router-dom, configure o basename (opcional)
import { BrowserRouter as Router } from 'react-router-dom';

// Cria a raiz do app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Router pode ser necessário se você estiver usando rotas */}
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </React.StrictMode>
);

// Inicia a medição de performance da aplicação
reportWebVitals();
