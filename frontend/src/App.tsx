import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FeedbackPage from './pages/FeedbackPage'
import NotFoundPage from './pages/NotFoundPage'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedbackPage />,
    errorElement: <NotFoundPage />
  }
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}
