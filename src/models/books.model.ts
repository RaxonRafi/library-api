import {model, Schema } from "mongoose";
import {BookStaticModel, IBooks } from "../interfaces/books.interface";


const bookSchema = new Schema<IBooks,BookStaticModel>({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        enum:["FICTION" , "NON_FICTION" ,"SCIENCE","HISTORY" ,"BIOGRAPHY", "FANTASY"],
        required: true
    },
    isbn:{
        type:String,
        required:true,
        unique:true,

    },
    description:{ 
        type: String 
    },
    copies:{
        type:Number,
        required:true,
        min:[0,"Copies must be a positive number"]
    },
    available:{
        type: Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false
})

bookSchema.static('handleBorrow', async function(bookId: string, quantity: number) {
    const book = await this.findById(bookId);

    if (!book){
        throw new Error("Book not found!");
    } 

    if (book.copies < quantity){
        throw new Error("Not enough copies available!");
    } 

    book.copies -= quantity;
    book.available = book.copies > 0;

    await book.save();
})

export const Books = model<IBooks,BookStaticModel>('Books',bookSchema);