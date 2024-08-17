import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new method
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';


// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <Provider store={store}>
   
    <App />
  </Provider>
);
