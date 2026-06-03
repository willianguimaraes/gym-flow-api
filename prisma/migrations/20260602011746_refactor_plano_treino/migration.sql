/*
  Warnings:

  - You are about to drop the `DiasTreino` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioId` to the `Treino` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DiasTreino" DROP CONSTRAINT "DiasTreino_treinoId_fkey";

-- AlterTable
ALTER TABLE "Treino" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutSession" ADD COLUMN     "planoId" INTEGER;

-- DropTable
DROP TABLE "DiasTreino";

-- CreateTable
CREATE TABLE "PlanoTreino" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "inicioEm" TIMESTAMP(3) NOT NULL,
    "fimEm" TIMESTAMP(3),
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanoTreino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoTreinoDia" (
    "id" SERIAL NOT NULL,
    "planoId" INTEGER NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "isRest" BOOLEAN NOT NULL DEFAULT false,
    "treinoId" INTEGER,

    CONSTRAINT "PlanoTreinoDia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanoTreino" ADD CONSTRAINT "PlanoTreino_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoTreinoDia" ADD CONSTRAINT "PlanoTreinoDia_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "PlanoTreino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoTreinoDia" ADD CONSTRAINT "PlanoTreinoDia_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treino" ADD CONSTRAINT "Treino_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "PlanoTreino"("id") ON DELETE SET NULL ON UPDATE CASCADE;
