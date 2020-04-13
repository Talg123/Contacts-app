import { Sequelize } from 'sequelize-typescript';
import { Role } from './../models/Role';
import { User } from '../models/User';
import { UsersRoles } from '../models/UsersRoles';

import { ConnectionService } from '../services/connection.service'

export class DBService {

    private sequelize: Sequelize;
    static dbInstance

    constructor() {
        if (DBService.dbInstance) {
            return DBService.dbInstance
        }

        DBService.dbInstance = this;
       this.sequelize =  ConnectionService.sequelize;
    }

    public async getContacts(): Promise<any> {
        try {
            const contacts = await User.findAll({
                include: [{
                    model: Role,
                    attributes: ['role'],
                    as: 'roles',
                    through: { attributes: [] }
                }]
            })
            return contacts;

        } catch (ex) {
            console.error(ex)
            throw 'Failed to get all contacts'
        }

    }

    public async addContact(picture: string, name: string, roles: any, isActive: boolean, telephone: string): Promise<any> {
        
        let transaction
        try {
            transaction = await this.sequelize.transaction()
            const user = await User.create({ picture: picture, name: name, isActive: isActive, telephone: telephone }, { transaction })
            await this.handleRoles(user.userID, roles, transaction)
            await transaction.commit();

        } catch (ex) {
            if (transaction) {
                await transaction.rollback();
            }
            console.error(ex)
            throw 'Failed to add contact'
        }

    }

    public async deleteContact(id: string): Promise<any> {

        let transaction
        try {
            transaction = await this.sequelize.transaction()
            await User.destroy({ where: { userID: id }, transaction })
            await UsersRoles.destroy({ where: { userID: id }, transaction })
            await transaction.commit();

        } catch (ex) {
            if (transaction) {
                await transaction.rollback();
            }
            console.error(ex)
            throw 'Failed to delete contact'
        }
    }
    public async setContact(id: string, picture: string, name: string, roles: any, isActive: boolean, telephone: string): Promise<any> {
        let transaction
        try {
            transaction = await this.sequelize.transaction()
            await User.update({ picture: picture, name: name, isActive: isActive, telephone: telephone }, { where: { name: name }, transaction })
            await UsersRoles.destroy({ where: { userID: id }, transaction })
            await this.handleRoles(id, roles, transaction)
            await transaction.commit();

        } catch (ex) {
            if (transaction) {
                await transaction.rollback();
            }
            console.error(ex)
            throw 'Failed to set contact'
        }

    }

    private async handleRoles(id, roles, transaction): Promise<void> {
        try {
            const UserRoleObj = [];
            for (const role of roles) {
                const existRole = await Role.findOne({ where: { role: role.role } })
                if (existRole) {
                    UserRoleObj.push({ userID: id, role: existRole.role })
                }
                else {
                    await Role.create({ role: role.role }, { transaction })
                    UserRoleObj.push({ userID: id, role: role.role })
                }
            }

            await UsersRoles.bulkCreate(UserRoleObj, { transaction });

        } catch (ex) {
            throw ex
        }
    }

}