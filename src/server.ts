import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';


let server: Server;
const port = process.env.PORT || 5000;
const db_uri = process.env.MONGODB_URI as string

async function main() {
    try {
       await mongoose.connect(db_uri)
       console.log("Connected to mongodb!");
       server = app.listen(port,()=>{
        console.log(`App is Listening to port ${port}`);
       })
    } catch (error) {
        console.log(error);
    }
}
main()