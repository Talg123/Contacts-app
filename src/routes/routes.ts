import * as express from 'express';
import { Request, Response } from 'express'
import { ContactController } from '../controllers/controller';

export const router = express.Router({
    strict: true
});

const contactController = new ContactController()

router.get('/get-contacts', (req: Request, res: Response) => {
    contactController.getContacts(req, res);
});

router.post('/add-contact', (req: Request, res: Response) => {
    contactController.addContact(req, res);
});

router.post('/delete-contact', (req: Request, res: Response) => {
    contactController.deleteContact(req, res);
});

router.put('/set-contact', (req: Request, res: Response) => {
    contactController.setContact(req, res);
});


