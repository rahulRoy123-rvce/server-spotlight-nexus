
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { seedInitialData } from '@/utils/seedDatabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Only allow authenticated users
  if (!user) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>You need to be logged in to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleSeedData = async () => {
    setLoading(true);
    try {
      await seedInitialData();
      toast({
        title: "Database Seeded",
        description: "Initial server data has been added to Firestore.",
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        title: "Error",
        description: "There was a problem seeding the database.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Admin</CardTitle>
          <CardDescription>Manage your MCP server database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Seed Database</h3>
              <p className="text-sm text-gray-500">
                This will add initial server data to your Firestore database.
                Use this to populate your database with sample MCP servers.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSeedData} 
            disabled={loading}
            className="bg-mcp-purple hover:bg-mcp-purple/90"
          >
            {loading ? 'Seeding...' : 'Seed Initial Data'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Admin;
