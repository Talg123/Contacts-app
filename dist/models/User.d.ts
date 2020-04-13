import { Model } from "sequelize-typescript";
import { Role } from './Role';
export declare class User extends Model<User> {
    userID: string;
    name: string;
    picture: string;
    isActive: boolean;
    telephone: string;
    roles?: Role[];
}
