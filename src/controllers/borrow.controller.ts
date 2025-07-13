import express, { Request, Response } from "express";
import { Borrow } from "../models/borrows.model";
import { gotBorrowSummary } from "../services/borrow.service";
import { isBefore, startOfDay } from "date-fns";
export const borrowRoute = express.Router();

borrowRoute.post("/borrow", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const today = startOfDay(new Date());
    const dueDate = new Date(body.dueDate)
    if (isBefore(dueDate, today)) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "Due date cannot be in the past.",
      });
    }
    const borrowBook = await Borrow.create(body);

    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowBook,
    });

  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error.message,
    });
  }
});
borrowRoute.get("/borrow", async (req: Request, res: Response) => {
  try {
    const result = await gotBorrowSummary();
    if(result.length > 0){
        res.status(201).json({
          success: true,
          message: "Borrowed books summary retrieved successfully",
          data: result,
        });
    } else {
        res.status(404).json({
          success: true,
          message: "Borrowed books summary not available!",
          data: result,
        });
    }
  } catch (error: any) {
    
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error.message,
    });
  }
});
