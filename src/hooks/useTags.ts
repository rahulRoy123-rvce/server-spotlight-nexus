
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const fetchTags = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('tags')
    .select('name');
  
  if (error) {
    console.error('Error fetching tags:', error);
    throw new Error(error.message);
  }
  
  return data?.map(tag => tag.name) || [];
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });
};
