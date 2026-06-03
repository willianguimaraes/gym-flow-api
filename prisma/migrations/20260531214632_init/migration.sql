-- CreateTable
CREATE TABLE "Treino" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "kcal" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "description" TEXT,
    "muscles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Treino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" SERIAL NOT NULL,
    "treinoId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL,
    "weight" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiasTreino" (
    "id" SERIAL NOT NULL,
    "abbr" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "isRest" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "treinoId" INTEGER,

    CONSTRAINT "DiasTreino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" SERIAL NOT NULL,
    "treinoId" INTEGER NOT NULL,
    "trainedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMin" INTEGER,
    "notes" TEXT,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseLog" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "exercicioId" INTEGER NOT NULL,
    "setsDone" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "weightUsed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseLog_sessionId_exercicioId_key" ON "ExerciseLog"("sessionId", "exercicioId");

-- AddForeignKey
ALTER TABLE "Exercicio" ADD CONSTRAINT "Exercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiasTreino" ADD CONSTRAINT "DiasTreino_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
