docker run --name gymflow  -e POSTGRES_USER=willianguimaraes  -e POSTGRES_PASSWORD=33381504  -e POSTGRES_DB=gymflow -p 5432:5432 -d postgres:16

src/
├── docs/
├── data/
├── types/
├── routes/
│   └── workouts.routes.ts
├── repositories/          ← novo!
│   ├── workout.repository.ts
│   ├── session.repository.ts
│   └── exerciseLog.repository.ts
├── lib/
│   └── prisma.ts          ← novo! instância única do Prisma
├── app.ts
└── server.ts