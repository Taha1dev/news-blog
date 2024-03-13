import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import Article from './pages/Article'
import Home from './pages'
import { NavBar } from './components/NavBar/Nav'
import NavList from './components/NavBar/NavList'
import { DataContext } from './context/ContextProvider'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="sd" element={<NavList />} />
        <Route index element={<Home />} />
        <Route path="Article/:date/:author" element={<Article />} />
      </Route>
    )
  )
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
