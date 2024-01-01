import Navbar from './components/Navbar';
import Login from './components/login';
import SignUp from './components/SignUp';
import Profil from './components/Profil';
import Contents from './components/contents';
import Debe from './components/Debe';
import Problematics from './components/Problematics';
import Spor from './components/Spor'
import RelationShip from './components/RelationShip'
import Politics from './components/Politics'

import './App.css'
import './index.css'

import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import EntryDetail from './components/EntryDetail';
import SideBar from './components/SideBar';
import { GlobalContext, GlobalProvider } from './Context/GlobalContext';

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
        path: '/birisi/:profil',
        element: <Profil />
      },
      {
        path: '/:entrydetail',
        element: <EntryDetail />
      },
      {
        path: '/debe',
        element: <Contents />
      },
      {
        path: '/sorunsallar',
        element: <Contents />
      },
      {
        path: '/spor',
        element: <Contents />
      },
      {
        path: '/iliskiler',
        element: <Contents />
      },
      {
        path: '/siyaset',
        element: <Contents />
      },
    ],
  }
])

function Home() {

  return (
    <>
      <div className="m-0 p-0 eksi-font font-semibold flex flex-col select-none">
        <GlobalProvider>
          <Navbar />
          <SideBar />
          <div className="mb-9"></div>
          <Outlet />
        </GlobalProvider>
      </div>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  /* </React.StrictMode>, */
)
