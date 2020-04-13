import { DBService } from '../services/db.service'

export class Mock {

    private contacts: any

    constructor() {
        this.contacts =
            [
                {
                    "picture": "https://specials-images.forbesimg.com/imageserve/1144022172/960x0.jpg?fit=scale",
                    "name": "Jhon wick",
                    "roles": [
                        {
                            role: "Fullstack"
                        },
                        {
                            role: "Backend"
                        }
                    ],
                    "isActive": true,
                    "telephone": "054-1975432"
                },
                {
                    "picture": "data:image/jpeg;base64,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",
                    "name": "Will smith",
                    "roles": [
                        {
                            role: "Frontend"
                        }
                    ],
                    "isActive": true,
                    "telephone": "052-6713578"
                },
                {
                    "picture": "https://i.pinimg.com/originals/bf/10/31/bf10312c055ec9ccb89437dba398dd79.jpg",
                    "name": "Json Statham",
                    "roles": [
                        {
                            role: "Java"
                        },
                        {
                            role: ".Net"
                        }
                    ],
                    "isActive": false,
                    "telephone": "053-1972345"
                }
            ]
    }

    public async insertMockData(): Promise<any> {
        try {
            const db = new DBService()
            for (const contact of this.contacts) {
                await db.addContact(contact.picture, contact.name, contact.roles, contact.isActive, contact.telephone)
            }

        } catch (ex) {
            console.error(ex)
            throw 'Failed to insert mock data'
        }

    }
}