import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeedbackPage from './pages/FeedbackPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedbackPage />,
    errorElement: <NotFoundPage />
  }
])

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
