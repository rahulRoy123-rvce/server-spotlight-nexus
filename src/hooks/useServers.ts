
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MCPServer } from '@/lib/types';

const fetchServers = async (category?: string, tags?: string[]) => {
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
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MCPServer));
  } catch (error) {
    console.error('Error fetching servers:', error);
    throw error;
  }
};

export const useServers = (category?: string, tags?: string[]) => {
  return useQuery({
    queryKey: ['servers', category, tags],
    queryFn: () => fetchServers(category, tags)
  });
};
