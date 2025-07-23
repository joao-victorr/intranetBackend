import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../Domain/Errors/AppErrors";
import { EnvConfig } from "../../Infrastructure/Config/envConfig";

const secret = EnvConfig.JWT_SECRET;

// payload precisa ser um objeto que tenha, no mínimo, `sub`
export function signToken(payload: { sub: string }) {
  return jwt.sign(payload, secret, {expiresIn: "15m" });
}


export function verifyToken(token: string) {
  try {

    return jwt.verify(token, secret) as { sub: string; iat: number; exp: number };

  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      throw new UnauthorizedError("Token expirado");
    }
    throw new UnauthorizedError("Token inválido");
  }
}