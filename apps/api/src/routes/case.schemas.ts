import { z } from "zod";
import { Priority } from "../generated/prisma/index.js";

export const createCaseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  customerName: z.string().min(2),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  priority: z.nativeEnum(Priority).default(Priority.normal),
  intakeData: z.record(z.string(), z.unknown()).optional(),
});

export type CreateCaseInput = z.infer<typeof createCaseSchema>;

export const createCommentSchema = z.object({
  body: z.string().min(2),
  visibility: z.enum(["public", "internal"]).default("internal"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export const updateCaseStatusSchema = z.object({
  statusSlug: z.string().min(1),
});

export const updateCaseAssigneeSchema = z.object({
  assignedUserId: z.string().min(1).nullable(),
});

export function isPriority(value: string): value is Priority {
  return Object.values(Priority).includes(value as Priority);
}

export function hasNonEmptyIntakeValue(value: unknown) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;

  return true;
}
