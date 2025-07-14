import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-center bg-blue-200 p-3">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4">Oops! Page not found.</p>
        <p className="mt-2 text-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
