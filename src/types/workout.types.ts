export interface ExercicioCatalogo {
  id:              number;
  name:            string;
  desc:            string;
  musculoPrimario: string;
  musculosSecund:  string[];
  equipamento:     string;
  tag:             string;
  createdAt?:      string;
}

export interface TreinoExercicio {
  id:          number;
  treinoId:    number;
  exercicioId: number;
  exercicio?:  ExercicioCatalogo;
  ordem:       number;
  sets:        number;
  reps:        number;
  rest:        number;
  weight:      number;        // 0 = peso corporal
  finalizado?: boolean;
  observacao?: string;
}

export interface Treino {
  id:           number;
  usuarioId:    number;
  name:         string;
  category:     string;
  color:        string;
  duration:     number;
  kcal:         number;
  difficulty:   number;
  description?: string;
  muscles:      string[];
  exercises:    TreinoExercicio[];
  createdAt?:   string;
}

export interface PlanoTreinoDia {
  id:        number;
  planoId:   number;
  diaSemana: number;
  isRest:    boolean;
  treinoId?: number | null;
  treino?:   Treino | null;
}

export interface PlanoTreino {
  id:         number;
  usuarioId:  number;
  nome:       string;
  descricao?: string;
  inicioEm:   string;
  fimEm?:     string | null;
  ativo:      boolean;
  dias:       PlanoTreinoDia[];
  createdAt?: string;
}

export interface TreinoDoDia {
  plano: PlanoTreino;
  dia:   PlanoTreinoDia | null;
}