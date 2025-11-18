function ProductCard({ product, isCheapest }) {
  const platformColors = {
    'Blinkit': 'bg-yellow-500',
    'Instamart': 'bg-orange-500',
    'Zepto': 'bg-purple-500',
    'DMart Ready': 'bg-blue-500'
  };

  const platformColor = platformColors[product.source] || 'bg-gray-500';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200 relative">
      {isCheapest && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg font-bold text-sm z-10">
          💰 Best Price
        </div>
      )}
      
      <div className="p-6">
        {/* Platform Badge */}
        <div className={`${platformColor} text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4`}>
          {product.source}
        </div>

        {/* Product Image */}
        {product.image && (
          <div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
            {product.priceText && (
              <span className="text-sm text-gray-500 ml-2">({product.priceText})</span>
            )}
          </div>
        </div>

        {/* View Product Button */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          View Product
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
