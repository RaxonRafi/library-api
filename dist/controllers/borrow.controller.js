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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const borrows_model_1 = require("../models/borrows.model");
const borrow_service_1 = require("../services/borrow.service");
exports.borrowRoute = express_1.default.Router();
exports.borrowRoute.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const borrowBook = yield borrows_model_1.Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.message
        });
    }
}));
exports.borrowRoute.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, borrow_service_1.gotBorrowSummary)();
        console.log((0, borrow_service_1.gotBorrowSummary)());
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.message
        });
    }
}));
