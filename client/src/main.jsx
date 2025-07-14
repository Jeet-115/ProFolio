import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // ✅ import Redux Provider
import './index.css';
import App from './App.jsx';
import { store } from './redux/store'; // ✅ import the configured store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* ✅ wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
