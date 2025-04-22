import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ServerCard from '@/components/ServerCard';
import TagFilter from '@/components/TagFilter';
import MobileFilters from '@/components/MobileFilters';
import NoResults from '@/components/NoResults';
import AIAgent from '@/components/AIAgent';
import { MCPServer, Category } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CARDS_PER_PAGE = 32;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredServers, setFilteredServers] = useState<MCPServer[]>([]);
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedTags, servers]);

  const handleSelectTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredServers.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentServers = filteredServers.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-1">
        <Sidebar 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        <main className="flex-1 p-4 md:p-6 pb-20">
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
            
            {currentServers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {currentServers.map((server) => (
                    <ServerCard key={server.id} server={server} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <NoResults />
            )}
          </div>
        </main>
      </div>
      
      <AIAgent />
    </div>
  );
};

export default Index;
