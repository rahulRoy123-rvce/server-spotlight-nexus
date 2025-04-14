
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MCPServer } from '@/lib/types';

const fetchServers = async (category?: string, tags?: string[]): Promise<MCPServer[]> => {
  let query = supabase
    .from('servers')
    .select(`
      *,
      server_tags!inner(
        tag_id,
        tags(name)
      )
    `);
  
  // Filter by category
  if (category && category !== 'all') {
    if (category === 'featured') {
      query = query.eq('featured', true);
    } else if (category === 'community') {
      // For community servers, we'll need to filter by tags in the application code
    } else if (category === 'enterprise') {
      // For enterprise servers, we'll need to filter by tags in the application code
    }
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching servers:', error);
    throw new Error(error.message);
  }
  
  // Transform the data to match the MCPServer interface
  const servers = data?.map(server => {
    // Extract tags from the nested server_tags structure
    const serverTags = server.server_tags.map((st: any) => st.tags.name);
    
    return {
      id: server.id,
      name: server.name,
      description: server.description,
      url: server.url,
      stars: server.stars || 0,
      owner: server.owner,
      imageUrl: server.image_url || '/placeholder.svg',
      featured: server.featured || false,
      tags: serverTags
    };
  }) || [];
  
  // Apply category filters that couldn't be done at the database level
  let filteredServers = [...servers];
  
  if (category === 'community') {
    filteredServers = filteredServers.filter(server => 
      server.tags.includes('community') || server.tags.includes('open-source'));
  } else if (category === 'enterprise') {
    filteredServers = filteredServers.filter(server => 
      server.tags.includes('enterprise') || server.tags.includes('security'));
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
