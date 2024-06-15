import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  // check use exist or not
  isUserExistsByEmail(email: string): Promise<IUser>;

  // check password match or not
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}

export type TUserLogin = {
  email: string;
  password: string;
};
