import express, {Application, Request, Response} from 'express'
import { config } from 'dotenv';
import { booksRoute } from './controllers/books.controller';
import { borrowRoute } from './controllers/borrow.controller';
import cors from 'cors';
const app: Application = express();
config();

app.use(express.json())
app.use(cors({ origin: "*" }));
app.use("/api",booksRoute)
app.use("/api",borrowRoute)


app.get('/',(req:Request,res:Response)=>{
    res.send('Library Management System')
})

export default app;