
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MCPServer } from '@/lib/types';

export const useServers = (category?: string, tags?: string[]) => {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const serversRef = collection(db, 'servers');
        let q = query(serversRef);

        if (category && category !== 'all') {
          q = query(q, where('category', '==', category));
        }

        if (tags && tags.length > 0) {
          q = query(q, where('tags', 'array-contains-any', tags));
        }

        const querySnapshot = await getDocs(q);
        const fetchedServers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as MCPServer));

        setServers(fetchedServers);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchServers();
  }, [category, tags]);

  return { servers, loading, error };
};
