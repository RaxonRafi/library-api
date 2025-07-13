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
const date_fns_1 = require("date-fns");
exports.borrowRoute = express_1.default.Router();
exports.borrowRoute.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const today = (0, date_fns_1.startOfDay)(new Date());
        const dueDate = new Date(body.dueDate);
        if ((0, date_fns_1.isBefore)(dueDate, today)) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: "Due date cannot be in the past.",
            });
        }
        const borrowBook = yield borrows_model_1.Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.message,
        });
    }
}));
exports.borrowRoute.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, borrow_service_1.gotBorrowSummary)();
        if (result.length > 0) {
            res.status(201).json({
                success: true,
                message: "Borrowed books summary retrieved successfully",
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: true,
                message: "Borrowed books summary not available!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.message,
        });
    }
}));
