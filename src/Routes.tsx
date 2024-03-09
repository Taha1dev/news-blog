import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import App from './App'
import Article from './pages/Article'

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="home" element={<App />} />
        <Route path="article/:date/:author" element={<Article />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default Routes
