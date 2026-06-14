const NotFound = () => (
  <main className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
    <div className="text-7xl mb-4">🧭</div>
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
    <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist or has moved.</p>
    <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Home</a>
  </main>
);

export default NotFound;


