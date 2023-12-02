import Navbar from './components/Navbar';
import Login from './components/login';
import SignUp from './components/SignUp';
import Contents from './components/contents';
import Debe from './components/Debe';
import Problematics from './components/Problematics';
import Spor from './components/Spor'
import RelationShip from './components/RelationShip'
import Politics from './components/Politics'

import './App.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children:[
      {
        index: true,
        element: <Contents />,
      },
      {
        path: '/giris',
        element: <Login />
      },
      {
        path: '/kayitOl',
        element: <SignUp /> 
      },
      {
        path: '/debe',
        element: <Debe />
      },
      {
        path: '/sorunsallar',
        element: <Problematics />
      },
      {
        path: '/spor',
        element: <Spor />
      },
      {
        path: '/iliskiler',
        element: <RelationShip />
      },
      {
        path: '/siyaset',
        element: <Politics />
      },
    ],
  }
])

function Home() {

  return (
    <>
      <div className="m-0 p-0 eksi-font font-semibold flex flex-col select-none">
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  /* </React.StrictMode>, */
)
