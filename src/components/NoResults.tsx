
import React from 'react';
import { SearchX } from 'lucide-react';

const NoResults: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <SearchX className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No servers found</h3>
      <p className="text-gray-500 max-w-md">
        We couldn't find any MCP servers matching your search criteria. Try adjusting your filters or search terms.
      </p>
    </div>
  );
};

export default NoResults;
