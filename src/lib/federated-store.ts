// Federated learning data and logic

// We'll use React state instead of zustand to keep it simple

export interface Client {
  id: string;
  name: string;
  email: string;
  dataRows: number;
  status: 'idle' | 'training' | 'done';
  localAccuracy: number;
  weights: number[] | null;
  joinedAt: string;
}

export interface TrainingRound {
  round: number;
  globalAccuracy: number;
  participatingClients: number;
  timestamp: string;
  status: 'completed' | 'in-progress';
}

export interface Activity {
  id: string;
  type: 'upload' | 'train' | 'aggregate' | 'register';
  message: string;
  timestamp: string;
}

export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Hospital A', email: 'admin@hospitala.org', dataRows: 1250, status: 'done', localAccuracy: 0.87, weights: [0.23, -0.45, 0.12, 0.67], joinedAt: '2024-03-15' },
  { id: '2', name: 'Hospital B', email: 'admin@hospitalb.org', dataRows: 980, status: 'done', localAccuracy: 0.84, weights: [0.19, -0.38, 0.15, 0.72], joinedAt: '2024-03-16' },
  { id: '3', name: 'Clinic C', email: 'admin@clinicc.org', dataRows: 750, status: 'idle', localAccuracy: 0.81, weights: [0.25, -0.42, 0.09, 0.63], joinedAt: '2024-03-17' },
  { id: '4', name: 'Research Lab D', email: 'admin@labd.org', dataRows: 1500, status: 'done', localAccuracy: 0.89, weights: [0.21, -0.41, 0.14, 0.69], joinedAt: '2024-03-18' },
  { id: '5', name: 'University E', email: 'admin@unie.edu', dataRows: 620, status: 'idle', localAccuracy: 0.78, weights: null, joinedAt: '2024-03-20' },
];

export const MOCK_ROUNDS: TrainingRound[] = [
  { round: 1, globalAccuracy: 0.72, participatingClients: 3, timestamp: '2024-03-20 10:00', status: 'completed' },
  { round: 2, globalAccuracy: 0.78, participatingClients: 4, timestamp: '2024-03-20 10:30', status: 'completed' },
  { round: 3, globalAccuracy: 0.82, participatingClients: 4, timestamp: '2024-03-20 11:00', status: 'completed' },
  { round: 4, globalAccuracy: 0.85, participatingClients: 5, timestamp: '2024-03-20 11:30', status: 'completed' },
  { round: 5, globalAccuracy: 0.88, participatingClients: 5, timestamp: '2024-03-20 12:00', status: 'completed' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', type: 'aggregate', message: 'Global model updated — Round 5 complete', timestamp: '2 min ago' },
  { id: '2', type: 'train', message: 'Hospital A completed local training', timestamp: '5 min ago' },
  { id: '3', type: 'train', message: 'Research Lab D completed local training', timestamp: '8 min ago' },
  { id: '4', type: 'upload', message: 'Clinic C uploaded dataset (750 rows)', timestamp: '15 min ago' },
  { id: '5', type: 'register', message: 'University E joined the federation', timestamp: '1 hour ago' },
];

export function fedAvg(clients: Client[]): number[] {
  const active = clients.filter(c => c.weights);
  if (active.length === 0) return [];
  const totalSamples = active.reduce((sum, c) => sum + c.dataRows, 0);
  const numWeights = active[0].weights!.length;
  const globalWeights = new Array(numWeights).fill(0);
  for (const client of active) {
    const fraction = client.dataRows / totalSamples;
    for (let i = 0; i < numWeights; i++) {
      globalWeights[i] += fraction * client.weights![i];
    }
  }
  return globalWeights;
}
