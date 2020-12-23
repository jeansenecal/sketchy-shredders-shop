import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/sketchyshredders', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

app.get('/api/config/paypal', (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/', (req, res) => {
    res.send("server is running");
});
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Serve at http://localhost:" + port);
});