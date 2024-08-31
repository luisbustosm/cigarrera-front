import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { Records } from './components/Records'
import { SmokeCigarrete } from './components/SmokeCigarrete'
import { Charts } from './components/Charts'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'records',
        element: <Records />
      },
      {
        path: 'smoke',
        element: <SmokeCigarrete />
      },
      {
        path: 'charts',
        element: <Charts />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
)
