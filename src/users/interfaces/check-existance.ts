import { User } from '../entities/user.entity';

export interface CheckExistance {
  where: Partial<User>;
  message: string;
  expect: boolean;
}
