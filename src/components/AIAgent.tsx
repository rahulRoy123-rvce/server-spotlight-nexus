import React, { useState, useEffect } from 'react';
import { queryAgent, checkHealth } from '@/services/aiAgent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MessageSquare, X, ChevronUp, ChevronDown } from 'lucide-react';

const AIAgent: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isHealthy, setIsHealthy] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const checkServiceHealth = async () => {
            const healthy = await checkHealth();
            setIsHealthy(healthy);
            if (!healthy) {
                setError('AI service is currently unavailable. Please try again later.');
            }
        };
        
        checkServiceHealth();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
        if (!isHealthy) {
            setError('AI service is currently unavailable. Please try again later.');
            return;
        }

        setLoading(true);
        setError(null);
        setAnswer('');

        try {
            console.log('Sending request to AI agent:', question);
            const response = await queryAgent(question);
            console.log('Received response from AI agent:', response);
            
            if (response.startsWith('Echo:')) {
                setError('The AI service is returning an echo response. It might be in debug mode or misconfigured.');
                setAnswer(response);
            } else {
                setAnswer(response);
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'Unknown error';
            setError(`Failed to get response from AI agent: ${errorMessage}`);
            console.error('Detailed error:', err);
            setAnswer('');
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isExpanded ? (
                <Card className="w-full max-w-md shadow-lg transition-all duration-300 ease-in-out">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Ask the AI Agent</CardTitle>
                        <div className="flex items-center gap-2">
                            {!isHealthy && (
                                <div className="text-sm text-destructive">
                                    Service Unavailable
                                </div>
                            )}
                            <Button variant="ghost" size="icon" onClick={toggleExpand}>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Ask a question about MCP servers..."
                                    className="flex-1"
                                    disabled={loading || !isHealthy}
                                />
                                <Button type="submit" disabled={loading || !isHealthy}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Thinking...
                                        </>
                                    ) : (
                                        'Ask'
                                    )}
                                </Button>
                            </div>
                        </form>

                        {error && (
                            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
                                {error}
                            </div>
                        )}

                        {answer && (
                            <div className="mt-4 p-4 bg-muted rounded-md max-h-40 overflow-y-auto">
                                <p className="whitespace-pre-wrap">{answer}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <Button 
                    onClick={toggleExpand} 
                    variant="outline" 
                    className="rounded-full h-12 w-12 bg-primary text-primary-foreground shadow-lg p-0 flex items-center justify-center"
                >
                    <MessageSquare className="h-6 w-6" />
                </Button>
            )}
        </div>
    );
};

export default AIAgent; 