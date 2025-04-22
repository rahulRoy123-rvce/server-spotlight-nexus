const API_URL = 'https://ai-agent-179588397378.us-central1.run.app';

export const queryAgent = async (question: string): Promise<string> => {
    console.log('Starting API request to:', `${API_URL}/query`);
    try {
        // Check service health first
        const isHealthy = await checkHealth();
        if (!isHealthy) {
            console.error('AI service is not healthy');
            return 'Error: AI service is currently unavailable. Please try again later.';
        }

        // Make the API request
        console.log('Making request with question:', question);
        const response = await fetch(`${API_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify({
                query: question
            })
        });

        console.log('API response status:', response.status);
        const responseText = await response.text();
        console.log('API raw response:', responseText);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
        }

        try {
            const data = JSON.parse(responseText);
            return data.response || 'No response received from the AI agent';
        } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
            return responseText || 'Error: Received invalid response format';
        }
    } catch (error) {
        console.error('Error querying AI agent:', error);
        throw error;
    }
};

export const checkHealth = async (): Promise<boolean> => {
    try {
        console.log('Checking AI service health');
        const response = await fetch(`${API_URL}/health`, {
            headers: {
                'Accept': 'application/json',
                'Origin': window.location.origin
            }
        });
        
        console.log('Health check status:', response.status);
        if (!response.ok) {
            return false;
        }
        
        const responseText = await response.text();
        console.log('Health check response:', responseText);
        
        try {
            const data = JSON.parse(responseText);
            return data.status === 'healthy';
        } catch (parseError) {
            console.error('Error parsing health check response:', parseError);
            return false;
        }
    } catch (error) {
        console.error('Error checking AI agent health:', error);
        return false;
    }
}; 