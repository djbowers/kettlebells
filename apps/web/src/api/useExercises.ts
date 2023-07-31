import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from '../supabaseClient';

export interface Exercise {
  id: number;
  name: string;
  movements: string[];
}

export const useExercises = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    async function getExercises() {
      setLoading(true);

      const { data, error } = await supabase.from('exercises').select(`*`);

      if (error) {
        setError(error);
        console.error(error);
      } else if (data) {
        setExercises(data);
      }

      setLoading(false);
    }

    getExercises();
  }, []);

  return { data: { exercises }, loading, error };
};
