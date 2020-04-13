import { Model } from "sequelize-typescript";
import { User } from './User';
export declare class Role extends Model<Role> {
    role: string;
    users?: User[];
}
