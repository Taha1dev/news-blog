import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import Article from './pages/Article'
import Home from './pages'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Home />} />
        <Route    path="Article/:date/:author" element={<Article />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
