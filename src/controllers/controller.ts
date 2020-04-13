const joi = require('@hapi/joi');
import { Request, Response } from 'express';
import { DBService } from '../services/db.service';


export class ContactController {

    constructor() {

    }

    public async getContacts(req: Request, res: Response) {
        try {
            const dbService = new DBService();
            const contacts = await dbService.getContacts();
            res.json(contacts);

        } catch (ex) {
            console.error(ex)
            res.status(500).json({ message: ex })
        }

    }

    public async addContact(req: Request, res: Response) {
        try {
            const schema = joi.object().keys({
                name: joi.string().required(),
                picture: joi.string().required(),
                roles: joi.array().min(1).required(),
                isActive: joi.boolean().required(),
                telephone: joi.string().required()
            });
            const result = schema.validate(req.body)
            if (result.error) {
                throw result.error.message;
            }
            const dbService = new DBService();
            const roles = this.setRoles(req.body.roles);
            await dbService.addContact(req.body.picture, req.body.name, roles, req.body.isActive, req.body.telephone);
            res.status(201).json({ message: "OK" });

        } catch (ex) {
            console.error(ex)
            res.status(500).json({ message: ex })
        }

    }

    public async deleteContact(req: Request, res: Response) {
        try {
            const schema = joi.object().keys({
                id: joi.array().min(1)
            });
            const result = schema.validate(req.body)
            if (result.error) {
                throw result.error.message;
            }
            const dbService = new DBService();
            for (const contact of req.body.id) {
                await dbService.deleteContact(contact);
            }
            res.status(200).json({ message: "OK" });
        } catch (ex) {
            console.error(ex)
            res.status(500).json({ message: ex })
        }

    }

    public async setContact(req: Request, res: Response) {
        try {
            const schema = joi.object().keys({
                id: joi.string().required(),
                picture: joi.string().required(),
                name: joi.string().required(),
                roles: joi.array().min(1).required(),
                isActive: joi.boolean().required(),
                telephone: joi.string().required()
            });
            const result = schema.validate(req.body)
            if (result.error) {
                throw result.error.message;
            }
            const dbService = new DBService();
            const roles = this.setRoles(req.body.roles);
            await dbService.setContact(req.body.id, req.body.picture, req.body.name, roles, req.body.isActive, req.body.telephone);
            res.status(200).json({ message: "OK" });
        } catch (ex) {
            console.error(ex)
            res.status(500).json({ message: ex })
        }

    }
    
    private setRoles(roles, ): any {
        
            const rolesObj = []
            for (const role of roles) {
                rolesObj.push({
                    "role": role
                })
            }
            return rolesObj;
    }
}