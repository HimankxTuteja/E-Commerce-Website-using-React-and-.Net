import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Route.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';

export {default as ReactFromModule} from 'react'


//export const history = createBrowserHistory();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)


// function createBrowserHistory() {
//   throw new Error('Function not implemented.');
// }
// reportWebVitals();


