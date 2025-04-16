export interface MCPServer {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  tags: string[];
  owner: string;
  imageUrl: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  order: number;
}
