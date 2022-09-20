-- DropForeignKey
ALTER TABLE "deaes" DROP CONSTRAINT "deaes_classificationId_fkey";

-- DropForeignKey
ALTER TABLE "deaes" DROP CONSTRAINT "deaes_localId_fkey";

-- DropForeignKey
ALTER TABLE "deaes" DROP CONSTRAINT "deaes_statusId_fkey";

-- DropForeignKey
ALTER TABLE "deaes" DROP CONSTRAINT "deaes_userId_fkey";

-- AddForeignKey
ALTER TABLE "deaes" ADD CONSTRAINT "deaes_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deaes" ADD CONSTRAINT "deaes_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deaes" ADD CONSTRAINT "deaes_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deaes" ADD CONSTRAINT "deaes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
