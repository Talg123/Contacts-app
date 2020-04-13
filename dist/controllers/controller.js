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
const joi = require('@hapi/joi');
const db_service_1 = require("../services/db.service");
class ContactController {
    constructor() {
    }
    getContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbService = new db_service_1.DBService();
                const contacts = yield dbService.getContacts();
                res.json(contacts);
            }
            catch (ex) {
                console.error(ex);
                res.status(500).json({ message: ex });
            }
        });
    }
    addContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = joi.object().keys({
                    name: joi.string().required(),
                    picture: joi.string().required(),
                    roles: joi.array().min(1).required(),
                    isActive: joi.boolean().required(),
                    telephone: joi.string().required()
                });
                const result = schema.validate(req.body);
                if (result.error) {
                    throw result.error.message;
                }
                const dbService = new db_service_1.DBService();
                const roles = this.setRoles(req.body.roles);
                yield dbService.addContact(req.body.picture, req.body.name, roles, req.body.isActive, req.body.telephone);
                res.status(201).json({ message: "OK" });
            }
            catch (ex) {
                console.error(ex);
                res.status(500).json({ message: ex });
            }
        });
    }
    deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = joi.object().keys({
                    id: joi.array().min(1)
                });
                const result = schema.validate(req.body);
                if (result.error) {
                    throw result.error.message;
                }
                const dbService = new db_service_1.DBService();
                for (const contact of req.body.id) {
                    yield dbService.deleteContact(contact);
                }
                res.status(200).json({ message: "OK" });
            }
            catch (ex) {
                console.error(ex);
                res.status(500).json({ message: ex });
            }
        });
    }
    setContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = joi.object().keys({
                    id: joi.string().required(),
                    picture: joi.string().required(),
                    name: joi.string().required(),
                    roles: joi.array().min(1).required(),
                    isActive: joi.boolean().required(),
                    telephone: joi.string().required()
                });
                const result = schema.validate(req.body);
                if (result.error) {
                    throw result.error.message;
                }
                const dbService = new db_service_1.DBService();
                const roles = this.setRoles(req.body.roles);
                yield dbService.setContact(req.body.id, req.body.picture, req.body.name, roles, req.body.isActive, req.body.telephone);
                res.status(200).json({ message: "OK" });
            }
            catch (ex) {
                console.error(ex);
                res.status(500).json({ message: ex });
            }
        });
    }
    setRoles(roles) {
        const rolesObj = [];
        for (const role of roles) {
            rolesObj.push({
                "role": role
            });
        }
        return rolesObj;
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=controller.js.map