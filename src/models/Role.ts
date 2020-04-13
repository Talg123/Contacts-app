import { Model, Column, Table, BelongsToMany, Scopes,PrimaryKey } from "sequelize-typescript";
import { User } from './User';
import { UsersRoles } from './UsersRoles'


@Scopes(() => ({
    users: {
      include: [
        {
          model: User,
          through: {attributes: []},
        },
      ],
    },
  }))

@Table
export class Role extends Model<Role> {

    @PrimaryKey
    @Column
    role!:string;

    @BelongsToMany(() => User, ()=>UsersRoles)
    users?: User[]
  
}
