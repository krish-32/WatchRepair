import React from 'react';

const WatchCard = ({ watch, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={watch.image}
          alt={`${watch.brand} ${watch.model}`}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
          watch.status === 'repaired' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {watch.status === 'repaired' ? 'Completed' : 'In Progress'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {watch.brand} {watch.model}
          </h3>
          <p className="text-sm text-gray-600">{watch.year} • {watch.condition}</p>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {watch.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">
            ${watch.price.toLocaleString()}
          </span>
          <button
            onClick={() => onViewDetails(watch)}
            className="bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;