import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt.util";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Token não informado" });
  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ error: "Token inválido" });
  const token = parts[1];
  try {
    const payload = JwtUtil.verify<{ sub: string }>(token);
    (req as any).userId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
