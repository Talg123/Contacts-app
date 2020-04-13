"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("./../models/Role");
const User_1 = require("../models/User");
const UsersRoles_1 = require("../models/UsersRoles");
const connection_service_1 = require("../services/connection.service");
class DBService {
    constructor() {
        if (DBService.dbInstance) {
            return DBService.dbInstance;
        }
        DBService.dbInstance = this;
        this.sequelize = connection_service_1.ConnectionService.sequelize;
    }
    getContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield User_1.User.findAll({
                    include: [{
                            model: Role_1.Role,
                            attributes: ['role'],
                            as: 'roles',
                            through: { attributes: [] }
                        }]
                });
                return contacts;
            }
            catch (ex) {
                console.error(ex);
                throw 'Failed to get all contacts';
            }
        });
    }
    addContact(picture, name, roles, isActive, telephone) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                transaction = yield this.sequelize.transaction();
                const user = yield User_1.User.create({ picture: picture, name: name, isActive: isActive, telephone: telephone }, { transaction });
                yield this.handleRoles(user.userID, roles, transaction);
                yield transaction.commit();
            }
            catch (ex) {
                if (transaction) {
                    yield transaction.rollback();
                }
                console.error(ex);
                throw 'Failed to add contact';
            }
        });
    }
    deleteContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                transaction = yield this.sequelize.transaction();
                yield User_1.User.destroy({ where: { userID: id }, transaction });
                yield UsersRoles_1.UsersRoles.destroy({ where: { userID: id }, transaction });
                yield transaction.commit();
            }
            catch (ex) {
                if (transaction) {
                    yield transaction.rollback();
                }
                console.error(ex);
                throw 'Failed to delete contact';
            }
        });
    }
    setContact(id, picture, name, roles, isActive, telephone) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                transaction = yield this.sequelize.transaction();
                yield User_1.User.update({ picture: picture, name: name, isActive: isActive, telephone: telephone }, { where: { name: name }, transaction });
                yield UsersRoles_1.UsersRoles.destroy({ where: { userID: id }, transaction });
                yield this.handleRoles(id, roles, transaction);
                yield transaction.commit();
            }
            catch (ex) {
                if (transaction) {
                    yield transaction.rollback();
                }
                console.error(ex);
                throw 'Failed to set contact';
            }
        });
    }
    handleRoles(id, roles, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UserRoleObj = [];
                for (const role of roles) {
                    const existRole = yield Role_1.Role.findOne({ where: { role: role.role } });
                    if (existRole) {
                        UserRoleObj.push({ userID: id, role: existRole.role });
                    }
                    else {
                        yield Role_1.Role.create({ role: role.role }, { transaction });
                        UserRoleObj.push({ userID: id, role: role.role });
                    }
                }
                yield UsersRoles_1.UsersRoles.bulkCreate(UserRoleObj, { transaction });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.DBService = DBService;
//# sourceMappingURL=db.service.js.map