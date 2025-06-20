import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Books } from "./books.model";


const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

borrowSchema.pre("save", async function (next) {
    await Books.handleBorrow(this.book.toString(),this.quantity);
    next()
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
