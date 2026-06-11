// import { Treino } from '../types/workout.types';

// const workoutsData = [
//   {
//       id: 1, name: 'peito', category: 'Musculação', color: '#E85D04',
//       duration: 55, kcal: 420, difficulty: 3,
//       muscles: ['Peitoral', 'Tríceps', 'Deltóide Ant.'],
//       exercises: [
//           { id: 1, name: 'Supino Reto com Barra', desc: 'Movimento base para o peitoral maior. Descida controlada em 3 segundos.', sets: 4, reps: 10, rest: 5, weight: '80kg', tag: 'Base', finalizado: false },
//           { id: 2, name: 'Supino Inclinado com Halteres', desc: 'Foco na porção superior do peitoral. Cotovelos a 45°.', sets: 3, reps: 12, rest: 75, weight: '24kg', tag: 'Iso', finalizado: false },
//           { id: 3, name: 'Crucifixo Inclinado', desc: 'Amplitude máxima para estiramento do peitoral. Arco leve no cotovelo.', sets: 3, reps: 15, rest: 60, weight: '14kg', tag: 'Iso', finalizado: false },
//           { id: 4, name: 'Crossover no Cabo', desc: 'Finalização com pegada alta, média e baixa. 2 sets em cada posição.', sets: 3, reps: 15, rest: 60, weight: '15kg/lado', tag: 'Cable', finalizado: false },
//           { id: 5, name: 'Fundos (Paralelas)', desc: 'Tronco levemente inclinado para enfatizar o peitoral inferior.', sets: 3, reps: 12, rest: 60, weight: 'Corpo', tag: 'Peso', finalizado: false },
//       ]
//   },
//   {
//       id: 2, name: 'costas', category: 'Musculação', color: '#1D9E75',
//       duration: 60, kcal: 460, difficulty: 4,
//       muscles: ['Latíssimo', 'Trapézio', 'Rombóides', 'Bíceps'],
//       exercises: [
//       { id: 1, name: 'Barra Fixa Pronada', desc: 'Pull-up completo com amplitude total. Puxe o peito até a barra.', sets: 4, reps: 8, rest: 120, weight: 'Corpo', tag: 'Base', finalizado: false },
//       { id: 2, name: 'Remada Curvada com Barra', desc: 'Cotovelos paralelos ao corpo, puxe até o abdômen inferior.', sets: 4, reps: 10, rest: 90, weight: '70kg', tag: 'Base', finalizado: false },
//       { id: 3, name: 'Remada Unilateral', desc: 'Apoio no banco, rotação de ombro ao final do movimento.', sets: 3, reps: 12, rest: 75, weight: '30kg', tag: 'Uni', finalizado: false },
//       { id: 4, name: 'Pulldown na Polia', desc: 'Pegada aberta, puxada até a clavícula. Controle na volta.', sets: 3, reps: 12, rest: 60, weight: '65kg', tag: 'Cable', finalizado: false },
//       { id: 5, name: 'Face Pull', desc: 'Corda no rosto, rotação externa de ombro. Essencial para saúde do manguito.', sets: 3, reps: 20, rest: 45, weight: '25kg', tag: 'Prev.', finalizado: false },
//       ]
//   },
//   {
//       id: 3, name: 'pernas', category: 'Musculação', color: '#7F77DD',
//       duration: 70, kcal: 580, difficulty: 5,
//       muscles: ['Quadríceps', 'Posterior', 'Glúteos', 'Panturrilha'],
//       exercises: [
//       { id: 1, name: 'Agachamento Livre', desc: 'Rei dos exercícios. Profundidade até a linha do quadril. Core ativado.', sets: 5, reps: 8, rest: 150, weight: '100kg', tag: 'Base', finalizado: false },
//       { id: 2, name: 'Leg Press 45°', desc: 'Pés no alto para glúteos, no baixo para quadríceps. Hoje: posição alta.', sets: 4, reps: 12, rest: 90, weight: '160kg', tag: 'Comp.', finalizado: false },
//       { id: 3, name: 'Cadeira Extensora', desc: 'Finalização de quadríceps. Pausa de 1s no pico.', sets: 3, reps: 15, rest: 60, weight: '50kg', tag: 'Iso', finalizado: false },
//       { id: 4, name: 'Mesa Flexora', desc: 'Bíceps femoral. Descida lenta em 4 segundos.', sets: 3, reps: 12, rest: 75, weight: '45kg', tag: 'Iso', finalizado: false },
//       { id: 5, name: 'Stiff com Halteres', desc: 'Alongamento máximo do posterior. Joelhos semiflexionados.', sets: 3, reps: 12, rest: 75, weight: '30kg', tag: 'Comp.', finalizado: false },
//       { id: 6, name: 'Panturrilha em Pé', desc: 'Amplitude total, pausa embaixo. 3 sets de 20 reps.', sets: 3, reps: 20, rest: 45, weight: '80kg', tag: 'Iso', finalizado: false },
//       ]
//   },
//   {
//       id: 4, name: 'ombros', category: 'Musculação', color: '#D4537E',
//       duration: 50, kcal: 380, difficulty: 3,
//       muscles: ['Deltóide Ant.', 'Deltóide Med.', 'Deltóide Post.'],
//       exercises: [
//       { id: 1, name: 'Desenvolvimento Militar', desc: 'Barra na altura do pescoço, extensão total sem travar cotovelo.', sets: 4, reps: 10, rest: 90, weight: '50kg', tag: 'Base', finalizado: false },
//       { id: 2, name: 'Elevação Lateral', desc: 'Cotovelo levemente flexionado. Sobe até 90°. Sem balanço.', sets: 4, reps: 15, rest: 60, weight: '12kg', tag: 'Iso', finalizado: false },
//       { id: 3, name: 'Elevação Frontal', desc: 'Foco no deltóide anterior. Alternar os braços.', sets: 3, reps: 12, rest: 60, weight: '10kg', tag: 'Iso', finalizado: false },
//       { id: 4, name: 'Pássaro (Posterior)', desc: 'Tronco paralelo ao solo, cotovelos levemente flexionados.', sets: 3, reps: 15, rest: 60, weight: '10kg', tag: 'Post.', finalizado: false },
//       { id: 5, name: 'Arnold Press', desc: 'Rotação no início e fim. Trabalha todas as cabeças do deltóide.', sets: 3, reps: 12, rest: 75, weight: '20kg', tag: 'Comp.', finalizado: false },
//       ]
//   },
//   {
//       id: 5, name: 'bracos', category: 'Musculação', color: '#BA7517',
//       duration: 45, kcal: 310, difficulty: 2,
//       muscles: ['Bíceps', 'Tríceps', 'Braquial'],
//       exercises: [
//       { id: 1, name: 'Rosca Direta com Barra', desc: 'Cotovelos fixos ao longo do corpo. Controle total na descida.', sets: 4, reps: 10, rest: 75, weight: '40kg', tag: 'Base', finalizado: false },
//       { id: 2, name: 'Rosca Martelo', desc: 'Pegada neutra, braquiorradial e bíceps. Excelente complemento.', sets: 3, reps: 12, rest: 60, weight: '16kg', tag: 'Bíc.', finalizado: false },
//       { id: 3, name: 'Tríceps Testa', desc: 'Skull crusher. Cotovelos apontados para cima, descida até a testa.', sets: 4, reps: 12, rest: 75, weight: '30kg', tag: 'Base', finalizado: false },
//       { id: 4, name: 'Triceps Polia Alta', desc: 'Corda ou barra. Cotovelos fixos, extensão completa.', sets: 3, reps: 15, rest: 60, weight: '30kg', tag: 'Tri.', finalizado: false },
//       { id: 5, name: 'Rosca Concentrada', desc: 'Isolamento máximo. Cotovelo apoiado na coxa. Supinação no topo.', sets: 3, reps: 12, rest: 60, weight: '14kg', tag: 'Iso', finalizado: false },
//       ]
//   }
// ];
// const treino: Treino[] | null = [];
// workoutsData.forEach(element => {
//   const exercicios: ExerciciosCatalogo[] = element.exercises;
//   (treino as Treino[]).push({
//           id: element.id,
//           name: element.name,
//           category: element.category,
//           color: element.color,
//           duration: element.duration,
//           kcal: element.kcal,
//           difficulty: element.difficulty,
//           description: `Treino focado em ${element.name}, visando trabalhar os músculos ${element.muscles.join(', ')}. Ideal para quem busca ${element.category.toLowerCase()} de forma eficiente.`,
//           muscles: element.muscles,
//           exercises: exercicios
//       });
// });
// const treinoSemana: DiasTreino[] = [
//     { abbr: 'SEG', num: 1, isRest: false, fullName: 'Segunda-feira', title: 'Peito', treino: treino?.find(t => t.name === 'peito') ?? null },
//     { abbr: 'TER', num: 2, isRest: false, fullName: 'Terça-feira', title: 'Costas', treino: treino?.find(t => t.name === 'costas') ?? null },
//     { abbr: 'QUA', num: 3, isRest: false, fullName: 'Quarta-feira', title: 'Pernas', treino: treino?.find(t => t.name === 'pernas') ?? null },
//     { abbr: 'QUI', num: 4, isRest: false, fullName: 'Quinta-feira', title: 'Ombros', treino: treino?.find(t => t.name === 'ombros') ?? null },
//     { abbr: 'SEX', num: 5, isRest: false, fullName: 'Sexta-feira', title: 'Braços', treino: treino?.find(t => t.name === 'bracos') ?? null },
//     { abbr: 'SAB', num: 6, isRest: true, fullName: 'Sábado', title: 'Descanso', treino: treino?.find(t => t.name === 'pernas') ?? null },
//     { abbr: 'DOM', num: 7, isRest: true, fullName: 'Domingo', title: 'Descanso', treino: treino?.find(t => t.name === 'peito') ?? null }
//   ];

// export default treinoSemana;