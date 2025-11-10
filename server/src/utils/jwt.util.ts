const jwt: any = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const EXPIRES_IN = "1h";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const JwtUtil = {
  sign(payload: object) {
    if (!jwt || typeof jwt.sign !== "function")
      throw new Error("jsonwebtoken not available");
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
  },

  verify<T = any>(token: string): T {
    if (!jwt || typeof jwt.verify !== "function")
      throw new Error("jsonwebtoken not available");
    return jwt.verify(token, JWT_SECRET) as T;
  },
};
