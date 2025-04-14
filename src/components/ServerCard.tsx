
import React from 'react';
import { MCPServer } from '@/lib/types';
import { Star, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ServerCardProps {
  server: MCPServer;
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-100 relative">
        <img 
          src={server.imageUrl} 
          alt={server.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        {server.featured && (
          <span className="absolute top-2 right-2 bg-mcp-purple text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold truncate">{server.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm text-gray-700">{server.stars.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{server.description}</p>
        <div className="mb-3 flex flex-wrap gap-1">
          {server.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-gray-50">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">By {server.owner}</span>
          <a
            href={server.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mcp-purple hover:text-purple-700 flex items-center text-sm font-medium"
          >
            Visit <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
