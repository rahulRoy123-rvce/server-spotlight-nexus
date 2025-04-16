import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ServerCard from '@/components/ServerCard';
import TagFilter from '@/components/TagFilter';
import MobileFilters from '@/components/MobileFilters';
import NoResults from '@/components/NoResults';
import { MCPServer, Category } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredServers, setFilteredServers] = useState<MCPServer[]>([]);
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const serversSnapshot = await getDocs(collection(db, 'servers'));
      const serversData = serversSnapshot.docs.map(doc => doc.data() as MCPServer);
      setServers(serversData);

      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categoriesData = categoriesSnapshot.docs
        .map(doc => doc.data() as Category)
        .sort((a, b) => a.order - b.order);
      setCategories(categoriesData);

      // Compute unique tags
      const tagSet = new Set<string>();
      serversData.forEach(server => server.tags.forEach(tag => tagSet.add(tag)));
      setTags(Array.from(tagSet));
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...servers];

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

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'featured') {
        filtered = filtered.filter((server) => server.featured);
      } else {
        filtered = filtered.filter((server) => {
          switch (selectedCategory) {
            case 'ai-ml':
              return server.tags.some(tag => ['ai', 'coding-agents', 'memory'].includes(tag));
            case 'browser-web':
              return server.tags.some(tag => ['browser', 'browser-automation', 'art', 'art-&-culture'].includes(tag));
            case 'cloud-infra':
              return server.tags.some(tag => ['cloud', 'cloud-platforms', 'filesystem', 'file-systems'].includes(tag));
            case 'data-platforms':
              return server.tags.some(tag => ['data', 'data-platforms', 'data-science-tools', 'database', 'databases'].includes(tag));
            case 'developer-tools':
              return server.tags.some(tag => ['developer-tools', 'code', 'code-execution', 'developer'].includes(tag));
            case 'integration':
              return server.tags.some(tag => ['communication', 'customer-data', 'customer-data-platforms', 'other-tools-and-integrations'].includes(tag));
            case 'research':
              return server.tags.some(tag => ['research', 'culture'].includes(tag));
            case 'system':
              return server.tags.some(tag => ['embedded', 'embedded-system', 'cli', 'command-line'].includes(tag));
            default:
              return server.tags.includes(selectedCategory);
          }
        });
      }
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((server) =>
        selectedTags.every((tag) => server.tags.includes(tag))
      );
    }

    setFilteredServers(filtered);
  }, [searchQuery, selectedCategory, selectedTags, servers]);

  const handleSelectTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
              <h2 className="text-2xl font-bold text-foreground">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
