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
const allowedOrigins = [
    "https://library-app-red-gamma.vercel.app",
    "http://localhost:5173"
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use("/api", books_controller_1.booksRoute);
app.use("/api", borrow_controller_1.borrowRoute);
app.get("/", (req, res) => {
    res.send("Library Management System");
});
exports.default = app;
