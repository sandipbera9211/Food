import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ message, linkText, linkTo }) => {
  return (
    <div className="text-center p-8">
      <div className="inline-block p-4 bg-orange-100 rounded-full">
        <svg
          className="h-12 w-12 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {message || 'No items found'}
      </h3>
      {linkText && linkTo && (
        <Link
          to={linkTo}
          className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;