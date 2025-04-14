
import { seedServers } from '@/lib/firebase';

// Sample data for MCP servers
const initialServers = [
  {
    name: 'ModelContextProtocol.io',
    description: 'The official MCP server for Model Context Protocol',
    url: 'https://modelcontextprotocol.io',
    stars: 35867,
    tags: ['official', 'featured'],
    owner: 'ModelContextProtocol',
    imageUrl: '/lovable-uploads/2ce94374-c89f-4ad8-87b9-eb712b25482d.png',
    featured: true
  },
  {
    name: 'MCPServers.org',
    description: 'A collection of MCP servers for various use cases',
    url: 'https://mcpservers.org',
    stars: 12450,
    tags: ['collection', 'featured'],
    owner: 'MCP Community',
    imageUrl: '/lovable-uploads/2ce94374-c89f-4ad8-87b9-eb712b25482d.png',
    featured: true
  },
  {
    name: 'MCP.so',
    description: 'Featured MCP servers with detailed information',
    url: 'https://mcp.so',
    stars: 18932,
    tags: ['featured', 'curated'],
    owner: 'MCP.so Team',
    imageUrl: '/lovable-uploads/2ce94374-c89f-4ad8-87b9-eb712b25482d.png',
    featured: true
  },
  {
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
    name: 'Open Context Hub',
    description: 'Open source implementation of the Model Context Protocol',
    url: 'https://opencontexthub.org',
    stars: 14532,
    tags: ['open-source', 'community'],
    owner: 'Open Context Community',
    imageUrl: '/placeholder.svg',
    featured: false
  }
];

// Function to seed the database with initial data
export const seedInitialData = async () => {
  try {
    const results = await seedServers(initialServers);
    console.log(`Successfully seeded ${results.length} servers`);
    return results;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
