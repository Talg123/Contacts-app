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
const sequelize_typescript_1 = require("sequelize-typescript");
const path = require("path");
class ConnectionService {
    constructor() {
    }
    static generateConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (ConnectionService.sequelizeInstance) {
                return ConnectionService.sequelizeInstance;
            }
            ConnectionService.sequelizeInstance = this;
            try {
                this.sequelize = new sequelize_typescript_1.Sequelize({
                    dialect: 'sqlite',
                    database: 'contacts',
                    storage: 'mystorage.sqlite',
                    models: [path.join(__dirname, "..", "models")]
                });
                yield this.sequelize.sync({ force: true });
            }
            catch (ex) {
                console.error(ex);
            }
        });
    }
}
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map