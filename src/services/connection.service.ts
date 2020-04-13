import { Sequelize } from 'sequelize-typescript';
import * as  path from 'path';

export class ConnectionService {

    static sequelizeInstance
    static sequelize

    private constructor() {

    }

    static async generateConnection(): Promise<void> {

        if (ConnectionService.sequelizeInstance) {
            return ConnectionService.sequelizeInstance
        }
        ConnectionService.sequelizeInstance = this;

        try {

            this.sequelize = new Sequelize({
                dialect: 'sqlite',
                database: 'contacts',
                storage: 'mystorage.sqlite',
                models: [path.join(__dirname, "..", "models")]
            });

            await this.sequelize.sync({ force: true });

        } catch (ex) {
            console.error(ex)

        }

    }


}