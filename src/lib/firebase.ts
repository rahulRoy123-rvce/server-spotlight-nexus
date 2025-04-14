
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { MCPServer } from './types';

// Use dummy values for Firebase config to prevent authentication errors
// In a real app, you would use environment variables
const firebaseConfig = {
  apiKey: "demo-mode-key",
  authDomain: "demo-mode.firebaseapp.com",
  projectId: "demo-mode",
  storageBucket: "demo-mode.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Mock data to use instead of Firestore in demo mode
export const mockServers: MCPServer[] = [
  {
    id: "1",
    name: "ModelContextProtocol.io",
    description: "The official MCP server for Model Context Protocol",
    url: "https://modelcontextprotocol.io",
    stars: 35867,
    tags: ["official", "featured"],
    owner: "ModelContextProtocol",
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: "2",
    name: "MCPServers.org",
    description: "A collection of MCP servers for various use cases",
    url: "https://mcpservers.org",
    stars: 12450,
    tags: ["collection", "featured"],
    owner: "MCP Community",
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: "3",
    name: "MCP.so",
    description: "Featured MCP servers with detailed information",
    url: "https://mcp.so",
    stars: 18932,
    tags: ["featured", "curated"],
    owner: "MCP.so Team",
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: "4",
    name: "LLM Context Server",
    description: "Specialized MCP server for LLM context management",
    url: "https://llmcontextserver.net",
    stars: 5672,
    tags: ["llm", "ai"],
    owner: "AI Research Group",
    imageUrl: "/placeholder.svg",
    featured: false
  },
  {
    id: "5",
    name: "ContextFlow",
    description: "Streaming context protocol implementation",
    url: "https://contextflow.dev",
    stars: 8743,
    tags: ["streaming", "real-time"],
    owner: "FlowTeam",
    imageUrl: "/placeholder.svg",
    featured: false
  },
  {
    id: "6",
    name: "Enterprise MCP",
    description: "Enterprise-grade MCP server with security features",
    url: "https://enterprisemcp.com",
    stars: 9245,
    tags: ["enterprise", "security"],
    owner: "Enterprise Solutions",
    imageUrl: "/placeholder.svg",
    featured: false
  },
  {
    id: "7",
    name: "Open Context Hub",
    description: "Open source implementation of the Model Context Protocol",
    url: "https://opencontexthub.org",
    stars: 14532,
    tags: ["open-source", "community"],
    owner: "Open Context Community",
    imageUrl: "/placeholder.svg",
    featured: false
  }
];
