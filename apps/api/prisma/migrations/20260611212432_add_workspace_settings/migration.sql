-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "appName" TEXT NOT NULL DEFAULT 'Core',
ADD COLUMN     "caseLabel" TEXT NOT NULL DEFAULT 'Case',
ADD COLUMN     "customerLabel" TEXT NOT NULL DEFAULT 'Customer';
