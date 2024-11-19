import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/WowReddits/',
    element: <App />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

const render = () => {
  root.render(
    <RouterProvider router={router} />
  )
};

render();

store.subscribe(render);
