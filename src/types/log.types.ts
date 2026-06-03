import type { ExercicioCatalogo, TreinoExercicio } from './workout.types';

export interface ExercicioSet {
  id:         number;
  logId:      number;
  setNum:     number;
  reps:       number;
  weightUsed: number;
  createdAt?: string;
}

export interface ExerciseLog {
  id:                number;
  sessionId:         number;
  treinoExercicioId: number;
  treinoExercicio?:  TreinoExercicio;
  substituidoPorId?: number | null;
  substituidoPor?:   ExercicioCatalogo | null;  // exercício usado no lugar
  setsDone:          number;
  completed:         boolean;
  weightUsed?:       number | null;
  sets:              ExercicioSet[];
  createdAt?:        string;
}

export interface WorkoutSession {
  id:           number;
  usuarioId:    number;
  treinoId:     number;
  planoId?:     number | null;
  trainedAt:    string;
  durationMin?: number | null;
  notes?:       string | null;
  logs:         ExerciseLog[];
}

export interface UpsertLogDTO {
  sessionId:         number;
  treinoExercicioId: number;
  setsDone:          number;
  completed:         boolean;
  weightUsed?:       number;
  substituidoPorId?: number;   // ID do ExercicioCatalogo substituto
}

export interface AddSetDTO {
  logId:      number;
  setNum:     number;
  reps:       number;
  weightUsed: number;
}