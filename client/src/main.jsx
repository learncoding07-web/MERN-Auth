import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './utils/routes.jsx'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} >
      <App />
  </RouterProvider>,
)
