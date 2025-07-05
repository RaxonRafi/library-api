import express, { Request, Response } from "express";
import { Books } from "../models/books.model";
export const booksRoute = express.Router();

booksRoute.post("/books", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Books.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
booksRoute.get("/books", async (req: Request, res: Response) => {
  try {
    const { filter, sort = "desc", page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const sortOrder = sort === "asc" ? 1 : -1;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const [books, total] = await Promise.all([
      Books.find(query)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(pageSize),
      Books.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: books.length > 0 ? "Books retrieved successfully" : "Books not available",
      data: books,
      meta: {
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: pageNumber,
        pageSize,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
});


booksRoute.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Books.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
booksRoute.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateData = req.body;
    const book = await Books.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

booksRoute.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Books.findByIdAndDelete({ _id: bookId });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
