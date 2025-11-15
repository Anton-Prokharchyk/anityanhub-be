import { User } from 'generated/prisma/client';

export type RegistrationReturnType = User & { token: string };
