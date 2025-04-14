
import { MCPServer, Category } from '@/lib/types';

export const servers: MCPServer[] = [
  {
    id: '1',
    name: 'ModelContextProtocol.io',
    description: 'The official MCP server for Model Context Protocol',
    url: 'https://modelcontextprotocol.io',
    stars: 35867,
    tags: ['official', 'featured'],
    owner: 'ModelContextProtocol',
    imageUrl: '/lovable-uploads/c1f2357a-3db3-4633-9b1c-b4cd3b759662.png',
    featured: true
  },
  {
    id: '2',
    name: 'MCPServers.org',
    description: 'A collection of MCP servers for various use cases',
    url: 'https://mcpservers.org',
    stars: 12450,
    tags: ['collection', 'featured'],
    owner: 'MCP Community',
    imageUrl: '/lovable-uploads/b2c663dd-0029-429f-ae95-80a08470de87.png',
    featured: true
  },
  {
    id: '3',
    name: 'MCP.so',
    description: 'Featured MCP servers with detailed information',
    url: 'https://mcp.so',
    stars: 18932,
    tags: ['featured', 'curated'],
    owner: 'MCP.so Team',
    imageUrl: '/lovable-uploads/98eadc5b-1d55-43fb-b002-c691e9638f02.png',
    featured: true
  },
  {
    id: '4',
    name: 'LLM Context Server',
    description: 'Specialized MCP server for LLM context management',
    url: 'https://llmcontextserver.net',
    stars: 5672,
    tags: ['llm', 'ai'],
    owner: 'AI Research Group',
    imageUrl: '/placeholder.svg',
    featured: false
  },
  {
    id: '5',
    name: 'ContextFlow',
    description: 'Streaming context protocol implementation',
    url: 'https://contextflow.dev',
    stars: 8743,
    tags: ['streaming', 'real-time'],
    owner: 'FlowTeam',
    imageUrl: '/placeholder.svg',
    featured: false
  },
  {
    id: '6',
    name: 'Enterprise MCP',
    description: 'Enterprise-grade MCP server with security features',
    url: 'https://enterprisemcp.com',
    stars: 9245,
    tags: ['enterprise', 'security'],
    owner: 'Enterprise Solutions',
    imageUrl: '/placeholder.svg',
    featured: false
  },
  {
    id: '7',
    name: 'Open Context Hub',
    description: 'Open source implementation of the Model Context Protocol',
    url: 'https://opencontexthub.org',
    stars: 14532,
    tags: ['open-source', 'community'],
    owner: 'Open Context Community',
    imageUrl: '/placeholder.svg',
    featured: false
  },
  {
    id: '8',
    name: 'Research MCP',
    description: 'MCP server optimized for research purposes',
    url: 'https://researchmcp.edu',
    stars: 3921,
    tags: ['research', 'academic'],
    owner: 'University Research Lab',
    imageUrl: '/placeholder.svg',
    featured: false
  },
  {
    id: '9',
    name: 'Lightweight MCP',
    description: 'Minimal MCP server for edge devices',
    url: 'https://lightmcp.io',
    stars: 6734,
    tags: ['lightweight', 'edge'],
    owner: 'Edge Computing Group',
    imageUrl: '/placeholder.svg',
    featured: false
  },
  {
    id: '10',
    name: 'ContextStore',
    description: 'MCP server with advanced storage capabilities',
    url: 'https://contextstore.net',
    stars: 7812,
    tags: ['storage', 'database'],
    owner: 'DataStore Inc',
    imageUrl: '/placeholder.svg',
    featured: false
  }
];

export const categories: Category[] = [
  { id: 'featured', name: 'Featured', count: servers.filter(s => s.featured).length },
  { id: 'all', name: 'All Servers', count: servers.length },
  { id: 'official', name: 'Official', count: servers.filter(s => s.tags.includes('official')).length },
  { id: 'community', name: 'Community', count: servers.filter(s => s.tags.includes('community') || s.tags.includes('open-source')).length },
  { id: 'enterprise', name: 'Enterprise', count: servers.filter(s => s.tags.includes('enterprise')).length },
  { id: 'research', name: 'Research', count: servers.filter(s => s.tags.includes('research') || s.tags.includes('academic')).length },
  { id: 'ai', name: 'AI & LLM', count: servers.filter(s => s.tags.includes('llm') || s.tags.includes('ai')).length }
];

// Get all unique tags from servers
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  servers.forEach(server => {
    server.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  return Array.from(tagsSet);
};
