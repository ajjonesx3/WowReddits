import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/WowReddits/',
    element: <App />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

const render = () => {
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
};
render();

store.subscribe(render);