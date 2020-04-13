
import { Model, Column, Table, BelongsToMany, Scopes, PrimaryKey } from "sequelize-typescript";
import { Role } from './Role';
import { UsersRoles } from './UsersRoles'
import { UUIDV4 } from "sequelize";

@Scopes(() => ({
  roles: {
    include: [
      {
        model: Role,
        through: { attributes: [] },
      },
    ],
  },
}))

@Table
export class User extends Model<User> {

  @PrimaryKey
  @Column({ type: UUIDV4, defaultValue: UUIDV4 })
  userID!: string;

  @Column
  name!: string;

  @Column
  picture!: string;

  @Column
  isActive!: boolean;

  @Column
  telephone!: string;

  @BelongsToMany(() => Role, () => UsersRoles)
  roles?: Role[]

}
