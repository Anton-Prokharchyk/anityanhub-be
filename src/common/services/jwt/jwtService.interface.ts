export abstract class IJwtService {
  abstract signToken(payload: unknown): Promise<string>;
  abstract verifyToken(tokenToVerify: string): Promise<string | unknown>;
}
