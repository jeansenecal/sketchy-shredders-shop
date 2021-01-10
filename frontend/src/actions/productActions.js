import Axios from "axios";
import { PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstant"

export const listProducts = ({seller = '', name = '', category = '', order = '', min = 0, max = 0, rating = 0, }) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get('http://localhost:5000/api/products?seller=' + seller + "&name=" + name + "&category=" + category + "&min=" + min + "&max=" + max + "&rating=" + rating + "&order=" + order); 
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error){
        dispatch({type: PRODUCT_LIST_FAIL, payload : error.message});
    }
};

export const detailsProduct = (productID) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, payload: productID
    });
    try{
        const {data} = await Axios.get('http://localhost:5000/api/products/' + productID);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload : 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message});
    }
}

export const createProduct = () => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_CREATE_REQUEST
    });

    try{
        const {
            userSignin: { userInfo },
          } = getState();
        const {data} = await Axios.post('http://localhost:5000/api/products', {}, {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
        });
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product});
    } catch (error){
        dispatch({type: PRODUCT_CREATE_FAIL, payload : 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message});
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_UPDATE_REQUEST
    });

    try{
        const {
            userSignin: { userInfo },
          } = getState();
        const {data} = await Axios.put('http://localhost:5000/api/products/' + product._id, product, {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
        });
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data});
    } catch (error){
        dispatch({type: PRODUCT_UPDATE_FAIL, payload : 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message});
    }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_DELETE_REQUEST,
        payload: productId
    });

    try{
        const {
            userSignin: { userInfo },
          } = getState();
        const {data} = await Axios.delete('http://localhost:5000/api/products/' + productId, {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
    } catch (error){
        dispatch({type: PRODUCT_DELETE_FAIL, payload : 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message});
    }
}

export const listProductCategories = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORY_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get('http://localhost:5000/api/products/categories');
        dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error){
        dispatch({type: PRODUCT_CATEGORY_LIST_FAIL, payload : error.message});
    }
};