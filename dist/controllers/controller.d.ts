import { Request, Response } from 'express';
export declare class ContactController {
    constructor();
    getContacts(req: Request, res: Response): Promise<void>;
    addContact(req: Request, res: Response): Promise<void>;
    deleteContact(req: Request, res: Response): Promise<void>;
    setContact(req: Request, res: Response): Promise<void>;
    private setRoles;
}
