import mongoose, { Mongoose } from "mongoose";

const url: string | undefined = process.env.MONGODB_URL

if(!url){
    throw new Error("MongoDB URL not Found, Plese define url in .env.local")
}

let cached: {conn: Mongoose | null ; promise: Promise<Mongoose> | null } = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = { conn: null, promise: null};
}

const connetDB = async(): Promise<Mongoose> =>{
    if(cached.conn){
        return cached.conn
    }

let opts: mongoose.ConnectOptions | undefined;

if(!cached.promise){
    opts = {
        bufferCommands: false
    }
}

cached.promise = mongoose.connect(url, opts).then(()=>{
    return mongoose;
});

cached.conn = await cached.promise;
console.log("Database connected");
return cached.conn;

};

export default connetDB
