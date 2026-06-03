/*
  Warnings:

  - You are about to drop the column `exercicioId` on the `ExerciseLog` table. All the data in the column will be lost.
  - You are about to drop the `Exercicio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionId,treinoExercicioId]` on the table `ExerciseLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `treinoExercicioId` to the `ExerciseLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercicio" DROP CONSTRAINT "Exercicio_treinoId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseLog" DROP CONSTRAINT "ExerciseLog_exercicioId_fkey";

-- DropIndex
DROP INDEX "ExerciseLog_sessionId_exercicioId_key";

-- AlterTable
ALTER TABLE "ExerciseLog" DROP COLUMN "exercicioId",
ADD COLUMN     "substituidoPorId" INTEGER,
ADD COLUMN     "treinoExercicioId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Exercicio";

-- CreateTable
CREATE TABLE "ExercicioCatalogo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "musculoPrimario" TEXT NOT NULL,
    "musculosSecund" TEXT[],
    "equipamento" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExercicioCatalogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreinoExercicio" (
    "id" SERIAL NOT NULL,
    "treinoId" INTEGER NOT NULL,
    "exercicioId" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TreinoExercicio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseLog_sessionId_treinoExercicioId_key" ON "ExerciseLog"("sessionId", "treinoExercicioId");

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "ExercicioCatalogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_treinoExercicioId_fkey" FOREIGN KEY ("treinoExercicioId") REFERENCES "TreinoExercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_substituidoPorId_fkey" FOREIGN KEY ("substituidoPorId") REFERENCES "ExercicioCatalogo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
