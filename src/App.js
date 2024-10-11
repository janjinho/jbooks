import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css'; 

// Estado inicial
const initialState = {
  books: []
};

// Reducer
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    case 'REMOVE_BOOK':
      return {
        ...state,
        books: state.books.filter((_, index) => index !== action.payload)
      };
    default:
      return state;
  }
};

const store = createStore(
  bookReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  const [bookName, setBookName] = useState('');
  const [bookCategory, setBookCategory] = useState('ficcao'); // Categoria padrão
  const [themeDark, setThemeDark] = useState(false);
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleAddBook = () => {
    dispatch({ type: 'ADD_BOOK', payload: { name: bookName || 'Sem título', category: bookCategory } });
    setBookName('');
    setBookCategory('ficcao');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddBook();
    }
  };

  const handleRemoveBook = (index) => {
    dispatch({ type: 'REMOVE_BOOK', payload: index });
  };

  return (
    <div className={`app-container ${themeDark ? 'tema-escuro' : 'tema-claro'}`}>
      <header>
        <h1>Lista de livros</h1>
        <button onClick={() => setThemeDark(!themeDark)}>
          {themeDark ? 'Tema Claro' : 'Tema Escuro'}
        </button>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Título do livro"
        />
        <select value={bookCategory} onChange={(e) => setBookCategory(e.target.value)}>
          <option value="ficcao">Ficção</option>
          <option value="romance">Romance</option>
          <option value="aventura">Aventura</option>
          <option value="fantasia">Fantasia</option>
          <option value="nao-ficcao">Não-ficção</option>
          <option value="ciencia">Ciência</option>
          <option value="historia">História</option>
          <option value="autoajuda">Autoajuda</option>
          <option value="biografia">Biografia</option>
          <option value="sem-categoria">Sem Categoria</option>
        </select>
       
        <button onClick={handleAddBook}>Adicionar Livro</button>
        
      </header>

      <div className="books-container">
        {books.map((book, index) => (
          <div
            key={index}
            className={`book ${book.category}`} 
            onClick={() => handleRemoveBook(index)} 
          >
            <h3>{book.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
