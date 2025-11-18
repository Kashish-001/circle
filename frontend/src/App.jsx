import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import LoadingSkeleton from './components/LoadingSkeleton';

const API_URL = 'http://localhost:5000';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setHasSearched(true);
    setProducts([]);

    try {
      const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products || []);
      
      if (data.products.length === 0) {
        setError('No products found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to search products. Please make sure the backend server is running.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  const cheapestPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🛒 Grocery Price Comparison
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Compare prices across Blinkit, Instamart, Zepto & DMart Ready
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {/* Refresh Button */}
        {hasSearched && !loading && (
          <div className="text-center mb-6">
            <button
              onClick={handleRefresh}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-semibold shadow-md"
            >
              🔄 Refresh Prices
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4 text-lg">Searching across all platforms...</p>
              <p className="text-gray-500 text-sm">This may take 30-60 seconds</p>
            </div>
            <LoadingSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-red-800">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && products.length > 0 && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Found {products.length} products for "{searchQuery}"
              </h2>
              <p className="text-gray-600 mt-2">Sorted by lowest price first</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={`${product.source}-${index}`}
                  product={product}
                  isCheapest={product.price === cheapestPrice}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && hasSearched && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-600">Try searching for a different product</p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !hasSearched && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🛍️</span>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Start Your Search</h3>
            <p className="text-gray-600">Search for any grocery item to compare prices</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleSearch('Amul Milk 1L')}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
              >
                Amul Milk 1L
              </button>
              <button
                onClick={() => handleSearch('Bread')}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors"
              >
                Bread
              </button>
              <button
                onClick={() => handleSearch('Rice 5kg')}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition-colors"
              >
                Rice 5kg
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>Compare grocery prices and save money! 💰</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
