
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ServerCard from '@/components/ServerCard';
import TagFilter from '@/components/TagFilter';
import MobileFilters from '@/components/MobileFilters';
import NoResults from '@/components/NoResults';
import { servers, categories, getAllTags } from '@/data/mockData';
import { MCPServer } from '@/lib/types';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredServers, setFilteredServers] = useState<MCPServer[]>([]);
  const tags = getAllTags();

  useEffect(() => {
    // Filter servers based on search query, category, and tags
    let filtered = [...servers];

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (server) =>
          server.name.toLowerCase().includes(lowercaseQuery) ||
          server.description.toLowerCase().includes(lowercaseQuery) ||
          server.owner.toLowerCase().includes(lowercaseQuery) ||
          server.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'featured') {
        filtered = filtered.filter((server) => server.featured);
      } else {
        filtered = filtered.filter((server) => 
          server.tags.includes(selectedCategory) || 
          // Handle special categories
          (selectedCategory === 'community' && 
           (server.tags.includes('community') || server.tags.includes('open-source'))) ||
          (selectedCategory === 'ai' && 
           (server.tags.includes('ai') || server.tags.includes('llm'))) ||
          (selectedCategory === 'research' && 
           (server.tags.includes('research') || server.tags.includes('academic')))
        );
      }
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((server) =>
        selectedTags.every((tag) => server.tags.includes(tag))
      );
    }

    setFilteredServers(filtered);
  }, [searchQuery, selectedCategory, selectedTags]);

  const handleSelectTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-1">
        <Sidebar 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {categories.find(c => c.id === selectedCategory)?.name || 'All Servers'}
              </h2>
              <MobileFilters 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
            
            <TagFilter 
              tags={tags} 
              selectedTags={selectedTags} 
              onSelectTag={handleSelectTag} 
            />
            
            {filteredServers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServers.map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            ) : (
              <NoResults />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
