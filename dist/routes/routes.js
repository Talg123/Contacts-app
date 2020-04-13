"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("../controllers/controller");
exports.router = express.Router({
    strict: true
});
const contactController = new controller_1.ContactController();
exports.router.get('/get-contacts', (req, res) => {
    contactController.getContacts(req, res);
});
exports.router.post('/add-contact', (req, res) => {
    contactController.addContact(req, res);
});
exports.router.post('/delete-contact', (req, res) => {
    contactController.deleteContact(req, res);
});
exports.router.put('/set-contact', (req, res) => {
    contactController.setContact(req, res);
});
//# sourceMappingURL=routes.js.map