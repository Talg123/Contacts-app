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
const User_1 = require("./User");
const UsersRoles_1 = require("./UsersRoles");
let Role = class Role extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Role.prototype, "role", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => User_1.User, () => UsersRoles_1.UsersRoles),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = __decorate([
    sequelize_typescript_1.Scopes(() => ({
        users: {
            include: [
                {
                    model: User_1.User,
                    through: { attributes: [] },
                },
            ],
        },
    })),
    sequelize_typescript_1.Table
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map