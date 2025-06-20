import express, {Application, Request, Response} from 'express'
import { config } from 'dotenv';

const app: Application = express();
config();

app.use(express.json())
app.get('/',(req:Request,res:Response)=>{
    res.send('Library Management System')
})

export default app;