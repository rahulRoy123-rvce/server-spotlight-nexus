
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const AdminButton: React.FC = () => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="fixed bottom-4 right-4 flex items-center gap-1"
      onClick={() => window.open('https://supabase.com/dashboard/project/htmvkmxeicqzzwhdwdub', '_blank')}
    >
      <span>Manage Data</span>
      <ExternalLink className="h-4 w-4" />
    </Button>
  );
};

export default AdminButton;
