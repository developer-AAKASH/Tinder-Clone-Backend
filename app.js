import dotenv from "dotenv";
import express, { response } from "express";
import mongoose  from "mongoose";
import TinderPerson from "./TinderPerson.js";

// App Config
dotenv.config();

const app = express();
const PORT = 4000;

// Middlewares
app.use( express.json() );

// DB-Config
const DB_Connection_URI = process.env.MONGODB__URI;
mongoose.connect( DB_Connection_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// API-Endpoints
app.get("/", ( request, response )=>{
    response.status(200).send("Namaste !!");
});

app.post("/tinder/person", async( request, response )=>{
    const person = request.body;

    await TinderPerson.create( person, ( error, data )=>{
        if( error ){
            response.status(500).send(error);
        } else{
            response.status(201).send(data);
        }
    });
});

app.get("/tinder/persons", ( request, response )=>{
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
    TinderPerson.find(( error, persons )=>{
        if( error ){
            response.status(500).send( error );
        } else{
            response.status(200).send( persons );
        }
    });
});

// Listener
app.listen( PORT, ()=>{
    console.log(`App is running on Port ${PORT}....`);
});

// {
//     "personName": "Elon Musk",
//     "personImage": "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg"
// }
// {
//     "personName": "Jeff Bezoz",
//     "personImage": "https://www.wired.com/wp-content/uploads/2019/01/Culture_GeeksGuide_Bezos.jpg"
// }
// {
//     "personName": "Mark Zukerberg",
//     "personImage": "https://media.istockphoto.com/photos/mark-zuckerberg-at-g8-in-deauville-france-picture-id482954389?k=20&m=482954389&s=612x612&w=0&h=uozn7gacYP5C1SLgJDKASVJftrSilHj4FiV80oi-_Cs="
// }