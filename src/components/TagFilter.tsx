
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onSelectTag }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          className={`cursor-pointer ${
            selectedTags.includes(tag) 
              ? 'bg-mcp-purple hover:bg-mcp-purple/90' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelectTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TagFilter;
