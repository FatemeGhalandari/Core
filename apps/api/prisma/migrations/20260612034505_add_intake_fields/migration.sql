-- CreateEnum
CREATE TYPE "IntakeFieldType" AS ENUM ('text', 'textarea', 'email', 'phone', 'number', 'date', 'select', 'multiselect', 'checkbox');

-- CreateTable
CREATE TABLE "intake_fields" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldType" "IntakeFieldType" NOT NULL,
    "placeholder" TEXT,
    "helpText" TEXT,
    "options" JSONB,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "intake_fields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "intake_fields_organizationId_idx" ON "intake_fields"("organizationId");

-- CreateIndex
CREATE INDEX "intake_fields_sortOrder_idx" ON "intake_fields"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "intake_fields_organizationId_key_key" ON "intake_fields"("organizationId", "key");

-- AddForeignKey
ALTER TABLE "intake_fields" ADD CONSTRAINT "intake_fields_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
