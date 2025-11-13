export default interface ICryptService {
  genSalt(rounds: number): Promise<string>;
  hash(password: string, salt: string | number): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
