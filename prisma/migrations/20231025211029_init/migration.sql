-- CreateTable
CREATE TABLE "Korisnici" (
    "KorisnikID" SERIAL NOT NULL,
    "Auth0ID" TEXT NOT NULL,
    "ImeKorisnika" TEXT NOT NULL,
    "EmailKorisnika" TEXT NOT NULL,

    CONSTRAINT "Korisnici_pkey" PRIMARY KEY ("KorisnikID")
);

-- CreateTable
CREATE TABLE "Natjecanja" (
    "NatjecanjeID" SERIAL NOT NULL,
    "NazivNatjecanja" TEXT NOT NULL,
    "SustavBodovanja" TEXT NOT NULL,
    "StvarateljID" INTEGER NOT NULL,
    "PoveznicaNatjecanja" TEXT NOT NULL,

    CONSTRAINT "Natjecanja_pkey" PRIMARY KEY ("NatjecanjeID")
);

-- CreateTable
CREATE TABLE "Natjecatelji" (
    "NatjecateljID" SERIAL NOT NULL,
    "NatjecanjeID" INTEGER NOT NULL,
    "ImeNatjecatelja" TEXT NOT NULL,

    CONSTRAINT "Natjecatelji_pkey" PRIMARY KEY ("NatjecateljID")
);

-- CreateTable
CREATE TABLE "Rezultati" (
    "RezultatID" SERIAL NOT NULL,
    "NatjecanjeID" INTEGER NOT NULL,
    "Kolo" INTEGER NOT NULL,
    "Natjecatelj1ID" INTEGER NOT NULL,
    "Natjecatelj2ID" INTEGER NOT NULL,
    "RezultatNatjecatelj1" INTEGER,
    "RezultatNatjecatelj2" INTEGER,

    CONSTRAINT "Rezultati_pkey" PRIMARY KEY ("RezultatID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Korisnici_Auth0ID_key" ON "Korisnici"("Auth0ID");

-- CreateIndex
CREATE UNIQUE INDEX "Korisnici_EmailKorisnika_key" ON "Korisnici"("EmailKorisnika");

-- CreateIndex
CREATE UNIQUE INDEX "Natjecanja_PoveznicaNatjecanja_key" ON "Natjecanja"("PoveznicaNatjecanja");

-- AddForeignKey
ALTER TABLE "Natjecanja" ADD CONSTRAINT "Natjecanja_StvarateljID_fkey" FOREIGN KEY ("StvarateljID") REFERENCES "Korisnici"("KorisnikID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Natjecatelji" ADD CONSTRAINT "Natjecatelji_NatjecanjeID_fkey" FOREIGN KEY ("NatjecanjeID") REFERENCES "Natjecanja"("NatjecanjeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rezultati" ADD CONSTRAINT "Rezultati_NatjecanjeID_fkey" FOREIGN KEY ("NatjecanjeID") REFERENCES "Natjecanja"("NatjecanjeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rezultati" ADD CONSTRAINT "Rezultati_Natjecatelj1ID_fkey" FOREIGN KEY ("Natjecatelj1ID") REFERENCES "Natjecatelji"("NatjecateljID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rezultati" ADD CONSTRAINT "Rezultati_Natjecatelj2ID_fkey" FOREIGN KEY ("Natjecatelj2ID") REFERENCES "Natjecatelji"("NatjecateljID") ON DELETE RESTRICT ON UPDATE CASCADE;
