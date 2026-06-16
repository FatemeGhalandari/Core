import type { CurrentUser } from "../middleware/auth.js";

declare module "express-serve-static-core" {
  interface Request {
    currentUser?: CurrentUser;
  }
}
