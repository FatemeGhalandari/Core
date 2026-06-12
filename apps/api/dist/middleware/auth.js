import { prisma } from "../lib/prisma.js";
export async function attachCurrentUser(req, _res, next) {
    try {
        const userId = req.header("x-user-id");
        if (!userId) {
            next();
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
        if (user) {
            req.currentUser = {
                ...user,
                role: user.role,
            };
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
export function requireUser(req, res, next) {
    if (!req.currentUser) {
        res.status(401).json({
            message: "Authentication required.",
        });
        return;
    }
    next();
}
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.currentUser) {
            res.status(401).json({
                message: "Authentication required.",
            });
            return;
        }
        if (!allowedRoles.includes(req.currentUser.role)) {
            res.status(403).json({
                message: "Insufficient permissions.",
            });
            return;
        }
        next();
    };
}
