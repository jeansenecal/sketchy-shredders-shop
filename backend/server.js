import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/sketchyshredders', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);

app.use((errr, req, res, next) => {
    res.status(500).send({message: errr.message});
})


app.get('/', (req, res) => {
    res.send("server is running");
})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Serve at http://localhost:" + port);
})