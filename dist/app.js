"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const books_controller_1 = require("./controllers/books.controller");
const borrow_controller_1 = require("./controllers/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use("/api", books_controller_1.booksRoute);
app.use("/api", borrow_controller_1.borrowRoute);
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.get('/', (req, res) => {
    res.send('Library Management System');
});
exports.default = app;
