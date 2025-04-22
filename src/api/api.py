from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai
from typing import List, Dict
import tiktoken

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AI Agent API",
    description="API for AI agent that answers questions about GitHub repos and MCP servers",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize tokenizer
tokenizer = tiktoken.encoding_for_model("gpt-3.5-turbo")

class Query(BaseModel):
    query: str

class Response(BaseModel):
    response: str

class HealthResponse(BaseModel):
    status: str

def count_tokens(text: str) -> int:
    """Count the number of tokens in a text string."""
    return len(tokenizer.encode(text))

def get_relevant_servers(query: str, servers: List[Dict], max_tokens: int = 2000) -> List[Dict]:
    """Get servers that are most relevant to the query, staying within token limits."""
    query = query.lower()
    relevant_servers = []
    current_tokens = 0
    
    for server in servers:
        # Check if query matches server name, description, or tags
        if (query in server['name'].lower() or 
            query in server['description'].lower() or 
            any(query in tag.lower() for tag in server['tags'])):
            
            server_text = f"{server['name']}: {server['description']}"
            server_tokens = count_tokens(server_text)
            
            if current_tokens + server_tokens > max_tokens:
                break
                
            relevant_servers.append(server)
            current_tokens += server_tokens
            
    return relevant_servers

def get_relevant_categories(query: str, categories: List[Dict], max_tokens: int = 500) -> List[Dict]:
    """Get categories that are most relevant to the query, staying within token limits."""
    query = query.lower()
    relevant_categories = []
    current_tokens = 0
    
    for category in categories:
        if query in category['name'].lower():
            category_text = f"{category['name']}: {category['count']} servers"
            category_tokens = count_tokens(category_text)
            
            if current_tokens + category_tokens > max_tokens:
                break
                
            relevant_categories.append(category)
            current_tokens += category_tokens
            
    return relevant_categories

@app.post("/query", response_model=Response)
async def query_agent(query: Query):
    try:
        # Get the mock data for context
        from data.mockData import servers, categories
        
        # Get relevant servers and categories based on the query
        relevant_servers = get_relevant_servers(query.query, servers)
        relevant_categories = get_relevant_categories(query.query, categories)
        
        # Create a focused context
        context = f"""
        Relevant MCP Servers:
        {[f"{server['name']}: {server['description']}" for server in relevant_servers]}
        
        Relevant Categories:
        {[f"{category['name']}: {category['count']} servers" for category in relevant_categories]}
        """
        
        # Verify we're within token limits
        total_tokens = count_tokens(context) + count_tokens(query.query)
        if total_tokens > 3500:  # Leave room for response
            context = "I have limited information about MCP servers. Please ask a more specific question."
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an AI assistant that helps users find and understand MCP servers. Use the provided context to answer questions accurately. If you don't have enough information in the context, say so."},
                {"role": "user", "content": f"Context: {context}\n\nQuestion: {query.query}"}
            ],
            max_tokens=500
        )
        
        return Response(response=response.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="healthy")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 