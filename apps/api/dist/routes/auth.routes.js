import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
export const authRouter = Router();
const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
});
authRouter.post("/login", async (req, res, next) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                message: "Invalid request body",
                errors: parsed.error.flatten(),
            });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                email: parsed.data.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                organizationId: true,
                passwordHash: true,
            },
        });
        if (!user?.passwordHash) {
            res.status(401).json({
                message: "Invalid email or password.",
            });
            return;
        }
        const isValidPassword = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!isValidPassword) {
            res.status(401).json({
                message: "Invalid email or password.",
            });
            return;
        }
        res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    organizationId: user.organizationId,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
});
authRouter.get("/me", async (req, res, next) => {
    try {
        const userId = typeof req.query.userId === "string" ? req.query.userId : "";
        if (!userId) {
            res.status(401).json({
                message: "Missing userId.",
            });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                organizationId: true,
            },
        });
        if (!user) {
            res.status(404).json({
                message: "User not found.",
            });
            return;
        }
        res.status(200).json({
            data: {
                user,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
