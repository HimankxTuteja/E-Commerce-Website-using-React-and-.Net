import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './app/layout/App'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';
//import { StoreProvider } from './app/context/StoreContext';
//import { configureStore } from './app/store/configureStore';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
//import { fetchProductAsync } from './features/catalog/catalogSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const root =  ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//store.dispatch(fetchProductAsync());
root.render(
  <React.StrictMode>
  
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);


