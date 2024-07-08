-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'SuperAdmin', 'User');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "age" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "resetToken" TEXT,
    "resetTokenExpired" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
