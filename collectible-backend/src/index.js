import express from "express";
import { connect } from './db.js';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import collectibleRouter from "./routes/collectibleRoutes.js";
import { initializeFirebaseAdmin, authenticate } from "./firebase.js";
import testRouter from "./routes/testRoutes.js";
import cors from "cors";
const app = express();
app.use(cors());

// Load environment constants from .env file
dotenv.config(); 

const PORT = process.env.PORT || 3000;

// Use JSON middleware
app.use(express.json());
//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Mongoose
// Call the connect function from db.js
connect(); 
initializeFirebaseAdmin();
// Use user router
app.use('/api/user',  userRouter);
app.use('/api/user',  collectibleRouter);
app.use('/api/user',  testRouter);


app.get("/", (req, resp) =>
  resp.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));