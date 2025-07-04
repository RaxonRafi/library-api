import express, {Application, Request, Response} from 'express'
import { config } from 'dotenv';
import { booksRoute } from './controllers/books.controller';
import { borrowRoute } from './controllers/borrow.controller';
import cors from 'cors';
const app: Application = express();
config();

app.use(express.json())
app.use("/api",booksRoute)
app.use("/api",borrowRoute)
app.use(
  cors({
    origin:'https://library-app-red-gamma.vercel.app'
   })
);

app.get('/',(req:Request,res:Response)=>{
    res.send('Library Management System')
})

export default app;