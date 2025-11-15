export default abstract class ICryptService {
  abstract genSalt(): Promise<string>;
  abstract hash(password: string, salt: string | number): Promise<string>;
  abstract compare(password: string, hash: string): Promise<boolean>;
}
