import { Borrow } from "../models/borrows.model"

export const gotBorrowSummary = async () =>{
    return Borrow.aggregate([
        {
            $group:{
                _id: '$book',
                totalQuantity:{
                    $sum: '$quantity'
                }
            }
        },
        {
            $lookup:{
                from: 'books',
                localField: '_id',
                foreignField:'_id',
                as: 'bookDetails'
            }
        },
        {
            $unwind:'$bookDetails'
        },
        {
            $project:{
                _id:0,
                totalQuantity: 1,
                book:{
                    title: '$bookDetails.title',
                    isbn: '$bookDetails.isbn'
                },
                
            }
        }
    ])
}