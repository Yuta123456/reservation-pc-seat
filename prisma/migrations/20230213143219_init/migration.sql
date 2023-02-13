-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "seat" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationStudent" (
    "reservationStudentId" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "ReservationStudent_pkey" PRIMARY KEY ("reservationStudentId")
);

-- CreateTable
CREATE TABLE "StudentLedger" (
    "id" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "studentLedget" INTEGER NOT NULL,

    CONSTRAINT "StudentLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eventImgUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");

-- AddForeignKey
ALTER TABLE "ReservationStudent" ADD CONSTRAINT "ReservationStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationStudent" ADD CONSTRAINT "ReservationStudent_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLedger" ADD CONSTRAINT "StudentLedger_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LA" ADD CONSTRAINT "LA_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_laId_fkey" FOREIGN KEY ("laId") REFERENCES "LA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
