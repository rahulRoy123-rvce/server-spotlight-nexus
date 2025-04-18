import React from 'react';
import { MCPServer } from '@/lib/types';
import { Star, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ServerCardProps {
  server: MCPServer;
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  return (
    <div className="group relative rounded-xl bg-background/50 backdrop-blur-sm text-card-foreground overflow-hidden transition-all duration-300">
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      {/* Card Content */}
      <div className="relative p-6 flex flex-col gap-4 border-2 border-border/80 rounded-xl bg-background/50 backdrop-blur-sm group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate pr-4 group-hover:text-primary transition-colors duration-300">
              {server.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {server.description}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-amber-500 dark:text-amber-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{server.stars.toLocaleString()}</span>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-1.5">
          {server.featured && (
            <Badge variant="default" className="bg-primary/15 text-primary border-primary/10 hover:bg-primary/20">
              Featured
            </Badge>
          )}
          {server.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/60"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t-2 border-border/80 group-hover:border-primary/30 transition-colors duration-300">
          <a
            href={`https://github.com/${server.owner}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5 mr-1" />
            {server.owner}
          </a>
          <a
            href={server.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Visit <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
