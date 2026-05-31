export interface Exercicios {
   id: number;
   name: string;
   desc: string;
   sets: number;
   reps: number;
   rest: number;
   weight: string;
   tag: string;
   finalizado?: boolean;
}

export interface Treino {
    id: number;
    name: string;
    category: string;
    color: string;
    duration: number;
    kcal: number;
    difficulty: number;
    description?: string;
    muscles: string[];
    exercises: Exercicios[];
}

export interface DiasTreino {
   abbr: string;
   fullName: string;
   num: number;
   isRest: boolean;
   title: string;
   treino?: Treino | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  available?: string[];
}