import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter= express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.lenth === 0){
        res.status(400).send({message: "Cart is empty"});
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress : req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id, //Comes from middleware isAuth
        });
        const createdOrder = await order.save();
        res.status(201).send({message: "New Order Created", order: createdOrder});
    }
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {
    //Returns the orders of the user whom is currently signed in
    const orders = await Order.find({user: req.user._id});
    if(orders){
        res.send(orders);
    } else {
        res.status(404).send({message: "Orders not found"});
    }
}));

//API to get details for an order
orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    } else {
        res.status(404).send({message: "Order not found"});
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
       order.isPaid = true;
       order.paidAt = Date.now();
       order.paymentResult = {
           id: req.body.id,
           status: req.body.status,
           update_time: req.body.update_time,
           email_address: req.body.email_address,
       };
       const updatedOrder = await order.save();
       res.send({message:"Order paid", order: updatedOrder});
    } else {
        res.status(404).send({message: "Order not found"});
    }
}));

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    //Populate in this case gets the name of the user whom placed the order
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
}));

orderRouter.delete('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        const deletedOrder = await order.remove();
        res.send({message: "Order deleted", order: deletedOrder});
    } else {
        res.status(404).send({message: "Order not found"});
    }
}));

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
       order.isDelivered = true;
       order.deliveredAt = Date.now();
       const updatedOrder = await order.save();
       res.send({message:"Order delivered", order: updatedOrder});
    } else {
        res.status(404).send({message: "Order not found"});
    }
}));

export default orderRouter;