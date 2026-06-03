import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { readFileSync } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const envFile = readFileSync(path.join(__dirname, '../.env'), 'utf-8');
const env: Record<string, string> = {};
envFile.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...rest] = trimmed.split('=');
  if (key && rest.length) {
    env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
  }
});

const adapter = new PrismaPg({ connectionString: env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpa na ordem correta por causa das foreign keys
  await prisma.exercicioSet.deleteMany();
  await prisma.exerciseLog.deleteMany();
  await prisma.workoutSession.deleteMany();
  await prisma.planoTreinoDia.deleteMany();
  await prisma.planoTreino.deleteMany();
  await prisma.treinoExercicio.deleteMany();
  await prisma.treino.deleteMany();
  await prisma.exercicioCatalogo.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('🗑️  Banco limpo, inserindo dados...');

  // ─── USUARIO ADMIN ───────────────────────────────────────────
  const admin = await prisma.usuario.create({
    data: {
      nome:    'Administrador',
      usuario: 'admin',
      email:   'admin@gymflow.com',
      senha:   await bcrypt.hash('123456', 10),
      altura:  1.78,
      peso:    80,
    }
  });
  console.log('✅ Usuário admin criado!');

  // ─── CATALOGO DE EXERCICIOS ──────────────────────────────────

  // PEITO
  const supino          = await prisma.exercicioCatalogo.create({ data: { name: 'Supino Reto com Barra',        desc: 'Movimento base para o peitoral maior. Descida controlada em 3 segundos.',          musculoPrimario: 'Peitoral',   musculosSecund: ['Tríceps', 'Deltóide Ant.'],          equipamento: 'Barra',         tag: 'Base'  } });
  const supinoInc       = await prisma.exercicioCatalogo.create({ data: { name: 'Supino Inclinado com Halteres', desc: 'Foco na porção superior do peitoral. Cotovelos a 45°.',                            musculoPrimario: 'Peitoral',   musculosSecund: ['Tríceps', 'Deltóide Ant.'],          equipamento: 'Haltere',       tag: 'Iso'   } });
  const crucifixo       = await prisma.exercicioCatalogo.create({ data: { name: 'Crucifixo Inclinado',           desc: 'Amplitude máxima para estiramento do peitoral. Arco leve no cotovelo.',            musculoPrimario: 'Peitoral',   musculosSecund: ['Deltóide Ant.'],                     equipamento: 'Haltere',       tag: 'Iso'   } });
  const crossover       = await prisma.exercicioCatalogo.create({ data: { name: 'Crossover no Cabo',             desc: 'Finalização com pegada alta, média e baixa. 2 sets em cada posição.',              musculoPrimario: 'Peitoral',   musculosSecund: ['Tríceps'],                           equipamento: 'Cabo',          tag: 'Cable' } });
  const fundos          = await prisma.exercicioCatalogo.create({ data: { name: 'Fundos (Paralelas)',            desc: 'Tronco levemente inclinado para enfatizar o peitoral inferior.',                   musculoPrimario: 'Peitoral',   musculosSecund: ['Tríceps', 'Deltóide Ant.'],          equipamento: 'Peso Corporal', tag: 'Peso'  } });
  const supinoDecl      = await prisma.exercicioCatalogo.create({ data: { name: 'Supino Declinado',              desc: 'Foco na porção inferior do peitoral. Agarre firme na barra.',                     musculoPrimario: 'Peitoral',   musculosSecund: ['Tríceps'],                           equipamento: 'Barra',         tag: 'Base'  } });

  // COSTAS
  const barraFixa       = await prisma.exercicioCatalogo.create({ data: { name: 'Barra Fixa Pronada',           desc: 'Pull-up completo com amplitude total. Puxe o peito até a barra.',                 musculoPrimario: 'Latíssimo',  musculosSecund: ['Bíceps', 'Rombóides'],               equipamento: 'Peso Corporal', tag: 'Base'  } });
  const remadaCurv      = await prisma.exercicioCatalogo.create({ data: { name: 'Remada Curvada com Barra',     desc: 'Cotovelos paralelos ao corpo, puxe até o abdômen inferior.',                      musculoPrimario: 'Latíssimo',  musculosSecund: ['Trapézio', 'Rombóides', 'Bíceps'],   equipamento: 'Barra',         tag: 'Base'  } });
  const remadaUni       = await prisma.exercicioCatalogo.create({ data: { name: 'Remada Unilateral',            desc: 'Apoio no banco, rotação de ombro ao final do movimento.',                         musculoPrimario: 'Latíssimo',  musculosSecund: ['Rombóides', 'Bíceps'],               equipamento: 'Haltere',       tag: 'Uni'   } });
  const pulldown        = await prisma.exercicioCatalogo.create({ data: { name: 'Pulldown na Polia',            desc: 'Pegada aberta, puxada até a clavícula. Controle na volta.',                       musculoPrimario: 'Latíssimo',  musculosSecund: ['Bíceps', 'Rombóides'],               equipamento: 'Cabo',          tag: 'Cable' } });
  const facePull        = await prisma.exercicioCatalogo.create({ data: { name: 'Face Pull',                   desc: 'Corda no rosto, rotação externa de ombro. Essencial para saúde do manguito.',     musculoPrimario: 'Trapézio',   musculosSecund: ['Deltóide Post.', 'Manguito'],        equipamento: 'Cabo',          tag: 'Prev.' } });
  const remadaCabo      = await prisma.exercicioCatalogo.create({ data: { name: 'Remada Sentada no Cabo',       desc: 'Coluna ereta, puxe o cabo até o abdômen. Escápulas juntas no final.',              musculoPrimario: 'Rombóides',  musculosSecund: ['Latíssimo', 'Bíceps', 'Trapézio'],   equipamento: 'Cabo',          tag: 'Cable' } });

  // PERNAS
  const agachamento     = await prisma.exercicioCatalogo.create({ data: { name: 'Agachamento Livre',            desc: 'Rei dos exercícios. Profundidade até a linha do quadril. Core ativado.',           musculoPrimario: 'Quadríceps', musculosSecund: ['Glúteos', 'Posterior', 'Core'],      equipamento: 'Barra',         tag: 'Base'  } });
  const legPress        = await prisma.exercicioCatalogo.create({ data: { name: 'Leg Press 45°',                desc: 'Pés no alto para glúteos, no baixo para quadríceps. Hoje: posição alta.',         musculoPrimario: 'Quadríceps', musculosSecund: ['Glúteos', 'Posterior'],              equipamento: 'Máquina',       tag: 'Comp.' } });
  const extensora       = await prisma.exercicioCatalogo.create({ data: { name: 'Cadeira Extensora',            desc: 'Finalização de quadríceps. Pausa de 1s no pico.',                                 musculoPrimario: 'Quadríceps', musculosSecund: [],                                    equipamento: 'Máquina',       tag: 'Iso'   } });
  const flexora         = await prisma.exercicioCatalogo.create({ data: { name: 'Mesa Flexora',                 desc: 'Bíceps femoral. Descida lenta em 4 segundos.',                                    musculoPrimario: 'Posterior',  musculosSecund: [],                                    equipamento: 'Máquina',       tag: 'Iso'   } });
  const stiff           = await prisma.exercicioCatalogo.create({ data: { name: 'Stiff com Halteres',           desc: 'Alongamento máximo do posterior. Joelhos semiflexionados.',                       musculoPrimario: 'Posterior',  musculosSecund: ['Glúteos'],                           equipamento: 'Haltere',       tag: 'Comp.' } });
  const panturrilha     = await prisma.exercicioCatalogo.create({ data: { name: 'Panturrilha em Pé',            desc: 'Amplitude total, pausa embaixo. 3 sets de 20 reps.',                              musculoPrimario: 'Panturrilha',musculosSecund: [],                                    equipamento: 'Máquina',       tag: 'Iso'   } });
  const agachSmith      = await prisma.exercicioCatalogo.create({ data: { name: 'Agachamento no Smith',         desc: 'Alternativa ao agachamento livre com mais estabilidade.',                          musculoPrimario: 'Quadríceps', musculosSecund: ['Glúteos', 'Posterior'],              equipamento: 'Máquina',       tag: 'Base'  } });

  // OMBROS
  const desenvolvMil    = await prisma.exercicioCatalogo.create({ data: { name: 'Desenvolvimento Militar',      desc: 'Barra na altura do pescoço, extensão total sem travar cotovelo.',                 musculoPrimario: 'Deltóide',   musculosSecund: ['Tríceps', 'Trapézio'],               equipamento: 'Barra',         tag: 'Base'  } });
  const elevLateral     = await prisma.exercicioCatalogo.create({ data: { name: 'Elevação Lateral',             desc: 'Cotovelo levemente flexionado. Sobe até 90°. Sem balanço.',                       musculoPrimario: 'Deltóide',   musculosSecund: [],                                    equipamento: 'Haltere',       tag: 'Iso'   } });
  const elevFrontal     = await prisma.exercicioCatalogo.create({ data: { name: 'Elevação Frontal',             desc: 'Foco no deltóide anterior. Alternar os braços.',                                  musculoPrimario: 'Deltóide',   musculosSecund: ['Peitoral'],                          equipamento: 'Haltere',       tag: 'Iso'   } });
  const passaro         = await prisma.exercicioCatalogo.create({ data: { name: 'Pássaro (Posterior)',          desc: 'Tronco paralelo ao solo, cotovelos levemente flexionados.',                       musculoPrimario: 'Deltóide',   musculosSecund: ['Rombóides', 'Trapézio'],             equipamento: 'Haltere',       tag: 'Post.' } });
  const arnoldPress     = await prisma.exercicioCatalogo.create({ data: { name: 'Arnold Press',                 desc: 'Rotação no início e fim. Trabalha todas as cabeças do deltóide.',                 musculoPrimario: 'Deltóide',   musculosSecund: ['Tríceps'],                           equipamento: 'Haltere',       tag: 'Comp.' } });
  const desenvolvHalt   = await prisma.exercicioCatalogo.create({ data: { name: 'Desenvolvimento com Halteres', desc: 'Versão unilateral do desenvolvimento. Maior amplitude de movimento.',             musculoPrimario: 'Deltóide',   musculosSecund: ['Tríceps'],                           equipamento: 'Haltere',       tag: 'Base'  } });

  // BRAÇOS
  const roscaDireta     = await prisma.exercicioCatalogo.create({ data: { name: 'Rosca Direta com Barra',       desc: 'Cotovelos fixos ao longo do corpo. Controle total na descida.',                   musculoPrimario: 'Bíceps',     musculosSecund: ['Braquial'],                          equipamento: 'Barra',         tag: 'Base'  } });
  const roscaMartelo    = await prisma.exercicioCatalogo.create({ data: { name: 'Rosca Martelo',                desc: 'Pegada neutra, braquiorradial e bíceps. Excelente complemento.',                  musculoPrimario: 'Bíceps',     musculosSecund: ['Braquial', 'Braquiorradial'],         equipamento: 'Haltere',       tag: 'Bíc.' } });
  const tricepsTesta    = await prisma.exercicioCatalogo.create({ data: { name: 'Tríceps Testa',                desc: 'Skull crusher. Cotovelos apontados para cima, descida até a testa.',              musculoPrimario: 'Tríceps',    musculosSecund: [],                                    equipamento: 'Barra',         tag: 'Base'  } });
  const tricepsPolia    = await prisma.exercicioCatalogo.create({ data: { name: 'Triceps Polia Alta',           desc: 'Corda ou barra. Cotovelos fixos, extensão completa.',                             musculoPrimario: 'Tríceps',    musculosSecund: [],                                    equipamento: 'Cabo',          tag: 'Tri.'  } });
  const roscaConc       = await prisma.exercicioCatalogo.create({ data: { name: 'Rosca Concentrada',            desc: 'Isolamento máximo. Cotovelo apoiado na coxa. Supinação no topo.',                 musculoPrimario: 'Bíceps',     musculosSecund: [],                                    equipamento: 'Haltere',       tag: 'Iso'   } });
  const tricepsFrances  = await prisma.exercicioCatalogo.create({ data: { name: 'Tríceps Francês',              desc: 'Haltere acima da cabeça, cotovelos fixos. Extensão completa.',                    musculoPrimario: 'Tríceps',    musculosSecund: [],                                    equipamento: 'Haltere',       tag: 'Tri.'  } });
  const roscaScott      = await prisma.exercicioCatalogo.create({ data: { name: 'Rosca Scott',                  desc: 'Apoio no banco Scott, isolamento total do bíceps.',                               musculoPrimario: 'Bíceps',     musculosSecund: ['Braquial'],                          equipamento: 'Barra',         tag: 'Iso'   } });

  console.log('✅ Catálogo de exercícios criado!');

  // ─── TREINOS DO ADMIN ────────────────────────────────────────

  const treinoPeito = await prisma.treino.create({
    data: {
      usuarioId:   admin.id,
      name:        'peito',
      category:    'Musculação',
      color:       '#E85D04',
      duration:    55,
      kcal:        420,
      difficulty:  3,
      description: 'Treino focado em peitoral, tríceps e deltóide anterior.',
      muscles:     ['Peitoral', 'Tríceps', 'Deltóide Ant.'],
      exercises: {
        create: [
          { exercicioId: supino.id,    ordem: 1, sets: 4, reps: 10, rest: 90, weight: 80 },
          { exercicioId: supinoInc.id, ordem: 2, sets: 3, reps: 12, rest: 75, weight: 24 },
          { exercicioId: crucifixo.id, ordem: 3, sets: 3, reps: 15, rest: 60, weight: 14 },
          { exercicioId: crossover.id, ordem: 4, sets: 3, reps: 15, rest: 60, weight: 15 },
          { exercicioId: fundos.id,    ordem: 5, sets: 3, reps: 12, rest: 60, weight: 0  },
        ]
      }
    }
  });

  const treinoCostas = await prisma.treino.create({
    data: {
      usuarioId:   admin.id,
      name:        'costas',
      category:    'Musculação',
      color:       '#1D9E75',
      duration:    60,
      kcal:        460,
      difficulty:  4,
      description: 'Treino focado em latíssimo, trapézio, rombóides e bíceps.',
      muscles:     ['Latíssimo', 'Trapézio', 'Rombóides', 'Bíceps'],
      exercises: {
        create: [
          { exercicioId: barraFixa.id,  ordem: 1, sets: 4, reps: 8,  rest: 120, weight: 0  },
          { exercicioId: remadaCurv.id, ordem: 2, sets: 4, reps: 10, rest: 90,  weight: 70 },
          { exercicioId: remadaUni.id,  ordem: 3, sets: 3, reps: 12, rest: 75,  weight: 30 },
          { exercicioId: pulldown.id,   ordem: 4, sets: 3, reps: 12, rest: 60,  weight: 65 },
          { exercicioId: facePull.id,   ordem: 5, sets: 3, reps: 20, rest: 45,  weight: 25 },
        ]
      }
    }
  });

  const treinoPernas = await prisma.treino.create({
    data: {
      usuarioId:   admin.id,
      name:        'pernas',
      category:    'Musculação',
      color:       '#7F77DD',
      duration:    70,
      kcal:        580,
      difficulty:  5,
      description: 'Treino focado em quadríceps, posterior, glúteos e panturrilha.',
      muscles:     ['Quadríceps', 'Posterior', 'Glúteos', 'Panturrilha'],
      exercises: {
        create: [
          { exercicioId: agachamento.id, ordem: 1, sets: 5, reps: 8,  rest: 150, weight: 100 },
          { exercicioId: legPress.id,    ordem: 2, sets: 4, reps: 12, rest: 90,  weight: 160 },
          { exercicioId: extensora.id,   ordem: 3, sets: 3, reps: 15, rest: 60,  weight: 50  },
          { exercicioId: flexora.id,     ordem: 4, sets: 3, reps: 12, rest: 75,  weight: 45  },
          { exercicioId: stiff.id,       ordem: 5, sets: 3, reps: 12, rest: 75,  weight: 30  },
          { exercicioId: panturrilha.id, ordem: 6, sets: 3, reps: 20, rest: 45,  weight: 80  },
        ]
      }
    }
  });

  const treinoOmbros = await prisma.treino.create({
    data: {
      usuarioId:   admin.id,
      name:        'ombros',
      category:    'Musculação',
      color:       '#D4537E',
      duration:    50,
      kcal:        380,
      difficulty:  3,
      description: 'Treino focado em deltóide anterior, medial e posterior.',
      muscles:     ['Deltóide Ant.', 'Deltóide Med.', 'Deltóide Post.'],
      exercises: {
        create: [
          { exercicioId: desenvolvMil.id,  ordem: 1, sets: 4, reps: 10, rest: 90, weight: 50 },
          { exercicioId: elevLateral.id,   ordem: 2, sets: 4, reps: 15, rest: 60, weight: 12 },
          { exercicioId: elevFrontal.id,   ordem: 3, sets: 3, reps: 12, rest: 60, weight: 10 },
          { exercicioId: passaro.id,       ordem: 4, sets: 3, reps: 15, rest: 60, weight: 10 },
          { exercicioId: arnoldPress.id,   ordem: 5, sets: 3, reps: 12, rest: 75, weight: 20 },
        ]
      }
    }
  });

  const treinoBracos = await prisma.treino.create({
    data: {
      usuarioId:   admin.id,
      name:        'bracos',
      category:    'Musculação',
      color:       '#BA7517',
      duration:    45,
      kcal:        310,
      difficulty:  2,
      description: 'Treino focado em bíceps, tríceps e braquial.',
      muscles:     ['Bíceps', 'Tríceps', 'Braquial'],
      exercises: {
        create: [
          { exercicioId: roscaDireta.id,  ordem: 1, sets: 4, reps: 10, rest: 75, weight: 40 },
          { exercicioId: roscaMartelo.id, ordem: 2, sets: 3, reps: 12, rest: 60, weight: 16 },
          { exercicioId: tricepsTesta.id, ordem: 3, sets: 4, reps: 12, rest: 75, weight: 30 },
          { exercicioId: tricepsPolia.id, ordem: 4, sets: 3, reps: 15, rest: 60, weight: 30 },
          { exercicioId: roscaConc.id,    ordem: 5, sets: 3, reps: 12, rest: 60, weight: 14 },
        ]
      }
    }
  });

  console.log('✅ Treinos criados!');

  // ─── PLANO PADRÃO ────────────────────────────────────────────

  await prisma.planoTreino.create({
    data: {
      usuarioId: admin.id,
      nome:      'Plano Padrão - Hipertrofia',
      descricao: 'Plano semanal focado em hipertrofia muscular.',
      inicioEm:  new Date(),
      ativo:     true,
      dias: {
        create: [
          { diaSemana: 1, isRest: false, treinoId: treinoPeito.id   },  // Seg
          { diaSemana: 2, isRest: false, treinoId: treinoCostas.id  },  // Ter
          { diaSemana: 3, isRest: false, treinoId: treinoPernas.id  },  // Qua
          { diaSemana: 4, isRest: false, treinoId: treinoOmbros.id  },  // Qui
          { diaSemana: 5, isRest: false, treinoId: treinoBracos.id  },  // Sex
          { diaSemana: 6, isRest: true                               },  // Sab
          { diaSemana: 0, isRest: true                               },  // Dom
        ]
      }
    }
  });

  console.log('✅ Plano padrão criado!');

  // ─── RESUMO DO CATALOGO ──────────────────────────────────────
  const totalCatalogo = await prisma.exercicioCatalogo.count();
  const totalTreinos  = await prisma.treino.count();

  console.log(`\n📊 Resumo:`);
  console.log(`   Usuários:   1`);
  console.log(`   Catálogo:   ${totalCatalogo} exercícios`);
  console.log(`   Treinos:    ${totalTreinos}`);
  console.log(`   Planos:     1`);
  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n🔑 Login admin:');
  console.log('   usuário: admin');
  console.log('   senha:   123456');
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });