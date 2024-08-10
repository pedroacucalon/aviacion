-- CreateTable
CREATE TABLE "avion" (
    "codigo" SERIAL NOT NULL,
    "modelo" VARCHAR(50) NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "matricula" VARCHAR(20) NOT NULL,
    "estado" VARCHAR(30) NOT NULL,

    CONSTRAINT "avion_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "persona" (
    "codigo" SERIAL NOT NULL,
    "nombre_completo" VARCHAR(40) NOT NULL,
    "cedula" VARCHAR(15) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "celular" VARCHAR(15) NOT NULL,
    "email" VARCHAR(50) NOT NULL,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "piloto" (
    "codigo" SERIAL NOT NULL,
    "horas_vuelo" INTEGER NOT NULL,
    "fecha_contratacion" DATE NOT NULL,
    "codigo_persona" INTEGER NOT NULL,

    CONSTRAINT "piloto_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "licencia" (
    "codigo" SERIAL NOT NULL,
    "tipo_licencia" VARCHAR(5) NOT NULL,
    "fecha_emision" DATE NOT NULL,
    "fecha_expiracion" DATE NOT NULL,
    "codigo_piloto" INTEGER NOT NULL,

    CONSTRAINT "licencia_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Vuelo" (
    "num_vuelo" SERIAL NOT NULL,
    "origen" VARCHAR(30) NOT NULL,
    "destino" VARCHAR(30) NOT NULL,
    "hora_salida" TIME NOT NULL,
    "fecha" DATE NOT NULL,
    "codigo_avion" INTEGER NOT NULL,
    "codigo_piloto" INTEGER NOT NULL,

    CONSTRAINT "Vuelo_pkey" PRIMARY KEY ("num_vuelo")
);

-- CreateTable
CREATE TABLE "Carga" (
    "codigo_carga" SERIAL NOT NULL,
    "peso" DECIMAL(10,2) NOT NULL,
    "valor" DECIMAL(15,2) NOT NULL,
    "tipo_carga" VARCHAR(50) NOT NULL,
    "codigo_avion" INTEGER NOT NULL,

    CONSTRAINT "Carga_pkey" PRIMARY KEY ("codigo_carga")
);

-- CreateTable
CREATE TABLE "Ruta" (
    "codigo_ruta" SERIAL NOT NULL,
    "estado_ruta" VARCHAR(20) NOT NULL,
    "codigo_vuelo" INTEGER NOT NULL,

    CONSTRAINT "Ruta_pkey" PRIMARY KEY ("codigo_ruta")
);

-- CreateTable
CREATE TABLE "Regreso" (
    "codigo" SERIAL NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "Regreso_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Base" (
    "codigo" SERIAL NOT NULL,
    "nombre" VARCHAR(15) NOT NULL,
    "direccion" VARCHAR(25) NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "codigo_regeso" INTEGER NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "MiembroTripulacion" (
    "codigo" SERIAL NOT NULL,
    "cargo" VARCHAR(50) NOT NULL,
    "fecha_contratacion" DATE NOT NULL,
    "ped_estado" VARCHAR(255) NOT NULL,

    CONSTRAINT "MiembroTripulacion_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "VueloTripulacion" (
    "miemTripu_id" INTEGER NOT NULL,
    "vuelo_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Certificacion" (
    "codigo" SERIAL NOT NULL,
    "tipoCerti" VARCHAR(5) NOT NULL,
    "fecha_obtencion" DATE NOT NULL,
    "miemTripu_id" INTEGER NOT NULL,

    CONSTRAINT "Certificacion_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Mantenimiento" (
    "codigo" SERIAL NOT NULL,
    "fecha" DATE NOT NULL,
    "costo" DECIMAL(10,2) NOT NULL,
    "codigo_base" INTEGER NOT NULL,

    CONSTRAINT "Mantenimiento_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "avion_matricula_key" ON "avion"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "persona_cedula_key" ON "persona"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "VueloTripulacion_miemTripu_id_key" ON "VueloTripulacion"("miemTripu_id");

-- CreateIndex
CREATE UNIQUE INDEX "VueloTripulacion_vuelo_id_key" ON "VueloTripulacion"("vuelo_id");

-- CreateIndex
CREATE UNIQUE INDEX "Certificacion_miemTripu_id_key" ON "Certificacion"("miemTripu_id");

-- AddForeignKey
ALTER TABLE "piloto" ADD CONSTRAINT "piloto_codigo_persona_fkey" FOREIGN KEY ("codigo_persona") REFERENCES "persona"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licencia" ADD CONSTRAINT "licencia_codigo_piloto_fkey" FOREIGN KEY ("codigo_piloto") REFERENCES "piloto"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vuelo" ADD CONSTRAINT "Vuelo_codigo_avion_fkey" FOREIGN KEY ("codigo_avion") REFERENCES "avion"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vuelo" ADD CONSTRAINT "Vuelo_codigo_piloto_fkey" FOREIGN KEY ("codigo_piloto") REFERENCES "piloto"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carga" ADD CONSTRAINT "Carga_codigo_carga_fkey" FOREIGN KEY ("codigo_carga") REFERENCES "avion"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ruta" ADD CONSTRAINT "Ruta_codigo_ruta_fkey" FOREIGN KEY ("codigo_ruta") REFERENCES "Vuelo"("num_vuelo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Base" ADD CONSTRAINT "Base_codigo_fkey" FOREIGN KEY ("codigo") REFERENCES "Regreso"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VueloTripulacion" ADD CONSTRAINT "VueloTripulacion_miemTripu_id_fkey" FOREIGN KEY ("miemTripu_id") REFERENCES "MiembroTripulacion"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VueloTripulacion" ADD CONSTRAINT "VueloTripulacion_vuelo_id_fkey" FOREIGN KEY ("vuelo_id") REFERENCES "Vuelo"("num_vuelo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificacion" ADD CONSTRAINT "Certificacion_miemTripu_id_fkey" FOREIGN KEY ("miemTripu_id") REFERENCES "MiembroTripulacion"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mantenimiento" ADD CONSTRAINT "Mantenimiento_codigo_fkey" FOREIGN KEY ("codigo") REFERENCES "Base"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
