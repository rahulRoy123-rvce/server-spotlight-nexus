
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ServerCard from '@/components/ServerCard';
import TagFilter from '@/components/TagFilter';
import MobileFilters from '@/components/MobileFilters';
import NoResults from '@/components/NoResults';
import { useServers } from '@/hooks/useServers';
import { useCategories } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useTags';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: servers = [], isLoading: isLoadingServers, error: serversError } = useServers(selectedCategory, selectedTags);
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: tags = [], isLoading: isLoadingTags } = useTags();
  const { user } = useAuth();

  const handleSelectTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter servers by search query
  const searchFilteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoadingServers || isLoadingCategories || isLoadingTags) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mcp-purple"></div>
      </div>
    );
  }

  if (serversError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold text-red-500">Error loading servers</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

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
              <div className="flex items-center gap-2">
                <MobileFilters 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </div>
            
            <TagFilter 
              tags={tags} 
              selectedTags={selectedTags} 
              onSelectTag={handleSelectTag} 
            />
            
            {servers.length === 0 && !isLoadingServers && (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No Servers Found</h3>
                <p className="text-gray-500 mt-2">There are no servers in the database. Let's add some!</p>
              </div>
            )}
            
            {searchFilteredServers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchFilteredServers.map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            ) : (
              searchQuery && <NoResults />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
