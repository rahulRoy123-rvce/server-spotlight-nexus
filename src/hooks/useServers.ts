
import { useQuery } from '@tanstack/react-query';
import { mockServers } from '@/lib/firebase';
import { MCPServer } from '@/lib/types';

const fetchServers = async (category?: string, tags?: string[]): Promise<MCPServer[]> => {
  // Simulate a small delay to mimic network request
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredServers = [...mockServers];

  // Filter by category
  if (category && category !== 'all') {
    if (category === 'featured') {
      filteredServers = filteredServers.filter(server => server.featured);
    } else if (category === 'community') {
      filteredServers = filteredServers.filter(server => 
        server.tags.includes('community') || server.tags.includes('open-source'));
    } else if (category === 'enterprise') {
      filteredServers = filteredServers.filter(server => 
        server.tags.includes('enterprise') || server.tags.includes('security'));
    }
  }

  // Filter by tags
  if (tags && tags.length > 0) {
    filteredServers = filteredServers.filter(server => 
      tags.some(tag => server.tags.includes(tag))
    );
  }

  return filteredServers;
};

export const useServers = (category?: string, tags?: string[]) => {
  return useQuery({
    queryKey: ['servers', category, tags],
    queryFn: () => fetchServers(category, tags)
  });
};
