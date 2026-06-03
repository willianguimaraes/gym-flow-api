/*
  Warnings:

  - The `weightUsed` column on the `ExerciseLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[logId,setNum]` on the table `ExercicioSet` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `weight` on the `Exercicio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weightUsed` on the `ExercicioSet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Exercicio.weight: String -> Float
ALTER TABLE "Exercicio" 
  ALTER COLUMN "weight" TYPE DOUBLE PRECISION 
  USING CASE 
    WHEN "weight" = 'Corpo' THEN 0
    WHEN "weight" ~ '^[0-9]+(\.[0-9]+)?(kg)?(/lado)?$' 
      THEN REGEXP_REPLACE("weight", '[^0-9.]', '', 'g')::DOUBLE PRECISION
    ELSE 0
  END;

-- ExerciseLog.weightUsed: String -> Float (nullable)
ALTER TABLE "ExerciseLog"
  ALTER COLUMN "weightUsed" TYPE DOUBLE PRECISION
  USING CASE
    WHEN "weightUsed" IS NULL THEN NULL
    WHEN "weightUsed" = 'Corpo' THEN 0
    WHEN "weightUsed" ~ '^[0-9]+(\.[0-9]+)?(kg)?(/lado)?$'
      THEN REGEXP_REPLACE("weightUsed", '[^0-9.]', '', 'g')::DOUBLE PRECISION
    ELSE 0
  END;

-- ExercicioSet.weightUsed: String -> Float
ALTER TABLE "ExercicioSet"
  ALTER COLUMN "weightUsed" TYPE DOUBLE PRECISION
  USING CASE
    WHEN "weightUsed" = 'Corpo' THEN 0
    WHEN "weightUsed" ~ '^[0-9]+(\.[0-9]+)?(kg)?(/lado)?$'
      THEN REGEXP_REPLACE("weightUsed", '[^0-9.]', '', 'g')::DOUBLE PRECISION
    ELSE 0
  END;

-- CreateIndex
CREATE UNIQUE INDEX "ExercicioSet_logId_setNum_key" ON "ExercicioSet"("logId", "setNum");
