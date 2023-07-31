import { useEffect, useState } from 'react';

import { Loading } from '../components';
import { supabase } from '../supabaseClient';

interface TrainingSession {
  completed_at: string | null;
  id: number;
  started_at: string;
  user_id: string;
}

export const TrainingHistory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [trainingHistory, setTrainingHistory] = useState<TrainingSession[]>([]);

  useEffect(() => {
    async function getTrainingHistory() {
      setLoading(true);

      let { data, error } = await supabase.from('training_history').select(`*`);

      if (error) {
        console.warn(error);
      } else if (data) {
        setTrainingHistory(data);
      }

      setLoading(false);
    }

    getTrainingHistory();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        trainingHistory.map((trainingSession) => (
          <div key={trainingSession.id} className="font-bold">
            {trainingSession.started_at}
          </div>
        ))
      )}
    </div>
  );
};
