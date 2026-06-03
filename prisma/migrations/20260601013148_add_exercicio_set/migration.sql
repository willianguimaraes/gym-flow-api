-- CreateTable
CREATE TABLE "ExercicioSet" (
    "id" SERIAL NOT NULL,
    "logId" INTEGER NOT NULL,
    "setNum" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weightUsed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExercicioSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExercicioSet" ADD CONSTRAINT "ExercicioSet_logId_fkey" FOREIGN KEY ("logId") REFERENCES "ExerciseLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
