import { Model } from "mongoose";

export interface IBooks{
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description: string,
    copies: number,
    available: boolean,
    
}

export interface BookStaticModel extends Model<IBooks> {
  handleBorrow(bookId: string, quantity: number): Promise<void>;
}