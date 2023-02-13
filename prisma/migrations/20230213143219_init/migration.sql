
-- CreateTable
CREATE TABLE "LA" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "avatarURL" TEXT NOT NULL,
    "experts" TEXT[],
    "hobbies" TEXT[],
    "basicStartShiftTime" TIMESTAMP(3) NOT NULL,
    "basicEndShiftTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "laId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "LA" ADD CONSTRAINT "LA_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_laId_fkey" FOREIGN KEY ("laId") REFERENCES "LA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
