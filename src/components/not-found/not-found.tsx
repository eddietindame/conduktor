import { Link } from 'react-router'

export const NotFound = () => (
  <div className="flex h-full flex-col items-center justify-center p-4 pb-[40%]">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <Link to="/" className="text-blue-500">
      Go back home
    </Link>
  </div>
)
