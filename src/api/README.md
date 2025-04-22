# AI Agent API

This is a web API for the AI agent that can answer questions about GitHub repos and MCP servers.

## Setup

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Make sure your `.env` file contains the necessary environment variables:
```
OPENAI_API_KEY=your_api_key_here
```

## Running the Server

Start the server using:
```bash
uvicorn api:app --reload
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### POST /query
Send a query to the AI agent.

Request body:
```json
{
    "query": "Your question here"
}
```

Response:
```json
{
    "response": "Agent's response"
}
```

### GET /health
Check if the API is running properly.

Response:
```json
{
    "status": "healthy"
}
```

## Using in Other Web Apps

To use this API in another web application, you can make HTTP requests to the endpoints. Here's an example using JavaScript:

```javascript
async function queryAgent(question) {
    const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: question
        })
    });
    const data = await response.json();
    return data.response;
}
```

Note: Make sure to replace `http://localhost:8000` with the actual URL where your API is hosted in production. 