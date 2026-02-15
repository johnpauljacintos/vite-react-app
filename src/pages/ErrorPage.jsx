import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="mt-2 text-red-700">Page not found.</p>
        <Link
          to="/home"
          className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
