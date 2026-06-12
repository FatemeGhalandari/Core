import type { Prisma } from "../generated/prisma/index.js";
import { prisma } from "./prisma.js";

type CaseActivityClient = Pick<Prisma.TransactionClient, "caseActivityEvent">;

type CreateCaseActivityInput = {
  organizationId: string;
  caseId: string;
  eventType: string;
  metadata?: Prisma.InputJsonValue;
  actorUserId?: string | null;
  actorCustomerId?: string | null;
};

export async function createCaseActivityEvent(
  input: CreateCaseActivityInput,
  client: CaseActivityClient = prisma,
) {
  return client.caseActivityEvent.create({
    data: {
      organizationId: input.organizationId,
      caseId: input.caseId,
      actorUserId: input.actorUserId,
      actorCustomerId: input.actorCustomerId,
      eventType: input.eventType,
      metadata: input.metadata ?? {},
    },
  });
}
