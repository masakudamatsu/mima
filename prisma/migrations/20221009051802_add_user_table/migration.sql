-- CreateTable
CREATE TABLE "User" (
    "issuer" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("issuer")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
