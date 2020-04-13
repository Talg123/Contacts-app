import { Model, Column, Table, ForeignKey, PrimaryKey } from "sequelize-typescript";
import { Role } from './Role';
import { User } from './User'

@Table
export class UsersRoles extends Model<UsersRoles> {

    @ForeignKey(() => User)
    @Column
    userID!: string;


    @ForeignKey(() => Role)
    @Column
    role!: string;

}
