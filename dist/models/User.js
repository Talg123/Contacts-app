"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Role_1 = require("./Role");
const UsersRoles_1 = require("./UsersRoles");
const sequelize_1 = require("sequelize");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({ type: sequelize_1.UUIDV4, defaultValue: sequelize_1.UUIDV4 }),
    __metadata("design:type", String)
], User.prototype, "userID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Role_1.Role, () => UsersRoles_1.UsersRoles),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = __decorate([
    sequelize_typescript_1.Scopes(() => ({
        roles: {
            include: [
                {
                    model: Role_1.Role,
                    through: { attributes: [] },
                },
            ],
        },
    })),
    sequelize_typescript_1.Table
], User);
exports.User = User;
//# sourceMappingURL=User.js.map