import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const  cart = useSelector(state => state.cart);
    const { shippingAddress, cartItems } = cart;
    const dispatch = useDispatch();
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }

    const toPrice = (num) => Number(num.toFixed(2)); //5.1234 => 5.12

    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c) => a + c.qty *c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? 0.00 : 10.00;
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems })); //Sends all fields in cart but changes the name of cartItems to orderItems
        
    };
    useEffect(() => {
        if(success){
            props.history.push("/order/" + order._id);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [success, dispatch, props.history, order]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{shippingAddress.fullName} <br />
                                    <strong>Address:</strong>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{cart.paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                {cartItems.map((item) =>(
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img src={item.image} alt={item.name} className="small"></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={"/product/" + item.product}>{item.name}</Link>
                                            </div> 
                                            <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                        </div>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${cart.toalPrice}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={placeOrderHandler} 
                                    className="primary block" 
                                    disabled={cartItems.length === 0}
                                >Place Order</button>
                            </li>
                            {loading && <LoadingBox/>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
