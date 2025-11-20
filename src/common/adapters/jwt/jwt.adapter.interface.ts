export interface IJwtAdapter {
  signToken(payload: unknown): Promise<string>;
  verifyToken(tokenToVerify: string): Promise<string | unknown>;
}
