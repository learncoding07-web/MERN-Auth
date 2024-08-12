import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './utils/routes.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={routes} >
        <App />
    </RouterProvider>,
    </Provider>
)



// z6bCIc6D05XpHQZM
