import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';


const App = () => {
  return (
    <>
       <NavBar />
       <Outlet />
    </>
  )
}

export default App