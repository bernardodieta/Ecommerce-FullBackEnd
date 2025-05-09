import { sendEmailConfirm } from "./email.controllers.js";
import { productService, cartService, ordersService, addressService } from '../services/services.js'
import { catchedAsync } from "../utils/catchedAsync.js";
import { response } from "../utils/response.js";
import { ClientError, NotFoundError, ValidationError } from "../utils/errors.js";
import userModel from "../services/dao/mongo/models/users.model.js";
import CartResponseDTO from "../services/dto/output/cartResponseDto.js";


const addToCart = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { productId, quantity } = req.body;
        const result = await productService.getProductById(productId, req.logger)
        if (result.owner === req.user.email) {
            throw new ValidationError('No puede comprar su propio producto.')
        }
        const cart = await cartService.addProductToCart(
            { user: _id },
            { items: { product: productId, quantity: quantity } },
            { new: true, upsert: true }, req.logger
        );
        response(res, 201, cart, 'Producto Agregado Correctamente.')
    } catch (error) {
        next(error)
    }
};

const removeProductFromCart = async (req, res, next) => {
    try {
        const { _id } = req.user
        const { productId, quantity } = req.params;
        const quantityToRemove = quantity
        const result = await cartService.removeProductFromCart(_id, productId, quantityToRemove, req.logger);
        response(res, 201, result, 'Cantidad modificada correctamente.')
    } catch (error) {
        next(error)
    }
}

const remProduct = async (req, res) => {
    try {
        const { _id } = req.user
        const { productId } = req.params
        const result = await cartService.removeProduct(_id, productId, req.logger);
        if (result.matchedCount === 0) {
            req.logger.warning(`${req.method} en ${req.url} - Error: "No se encontró el producto o el usuario no tiene ese producto en su carrito" at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError("No se encontró el producto o el usuario no tiene ese producto en su carrito");
        }
        response(res, 201, result, 'Producto eliminado del carrito correctamente.')
    } catch (error) {
        next()
    }
}

const remProductbuy = async (_id, productId, res, req, next) => {
    try {
        const result = await cartService.removeProduct(_id, productId, req.logger);
        console.log('dato eliminado', result);
        if (result.modifiedCount === 0) {
            req.logger.warning(`${req.method} en ${req.url} - Error: "No se encontró el producto o el usuario no tiene ese producto en su carrito" at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError("No se encontró el producto o el usuario no tiene ese producto en su carrito");
        }
        return ({ status: 'success' })
    } catch (error) {
        next(error)
    }
}

const getCartUser = async (req, res, next) => {
    try {
        const { _id } = req.user
        console.log(_id);
        const cart = await cartService.getCartByUserId(_id, req.logger);
        console.log(cart);
        if (!cart) {
            req.logger.warning(`${req.method} en ${req.url} - Error: "No se encontro un carrito para ese usuario" at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

            throw new NotFoundError('No se encontro un carrito para ese usuario')
        }
        const cartResponse = new CartResponseDTO(cart)
        response(res, 200, cartResponse)
    } catch (error) {
        next(error)
    }

}
const prePurchase = async (req, res, next) => {
    try {
        const { _id, email } = req.user;
        const cart = await cartService.getCartByUserId(_id, req.logger);
        if (!cart.items.length) {
            req.logger.warning(`${req.method} en ${req.url} - Error: 'No hay productos para comprar' at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError('No hay productos para comprar');
        }
        const { productosConStock, productosSinStock, totalPrice } = await processCartItems(cart.items, req);
        if (productosSinStock.length >= 0 && productosConStock.length === 0) {
            req.logger.warning(`${req.method} en ${req.url} - Error: No hay suficiente stock de productos para continuar con la compra.' at 
                ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new ClientError('No hay suficiente stock de productos para continuar con la compra.');
        }
        let sinStock = []
        let newOrder
        if (productosConStock.length >= 1) {
            if (productosSinStock.length >= 1) {
                sinStock = productosSinStock
            }
            newOrder = await createOrder(_id, email, productosConStock, productosSinStock, totalPrice);
        }
        response(res, 200, newOrder)
    } catch (error) {
        next(error)
    }
}

const purchase = async (orderId, req, res, next) => {
    const { _id } = req.user;
    const { addressId } = req.params
    const address = await addressService.getByIdAddress(addressId, req.logger)
    const order = await ordersService.getOrderById(orderId)
    console.log('order dede GEtORDE', order);
    const { products, productssinStock, total } = order
    await updateStockAndRemoveFromCart(products, _id, res, req, next);
    const purchasedProductsToAdd = products.map(product => ({
        product: {
            productId: product.product,
            status: false
        }
    }));
    await userModel.updateOne(
        { _id },
        {
            $push: {
                purchasedProducts: { $each: purchasedProductsToAdd }
            }
        }
    );

    sendEmailConfirm(order, res);
    if (productssinStock.length >= 1) {
        response(res, 201, order, `Algunas articulos sin stock no se incluyeron en su orden de compra.${sinStock}`);
    } else {
        //response(res, 201, order, 'Orden de compra generada correctamente.');
        return
    }

};

const processCartItems = async (items, req) => {
    let totalPrice = 0;
    let productosConStock = [];
    let productosSinStock = [];
    const productPromises = items.map(async item => {
        if (item.product && item.product._id) {
            return await productService.getProductById(item.product._id, req.logger);
        } else {
            return console.log('eas')
        }
    });
    const validProductPromises = productPromises.filter(promise => promise !== null);
    const products = await Promise.all(validProductPromises);
    products.forEach((product, index) => {
        const item = items[index];
        if (product && item.quantity <= product.stock) {
            let productPrice = product.price * item.quantity;
            totalPrice += productPrice;
            productosConStock.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                total: productPrice
            });
        } else {
            productosSinStock.push({
                product: item.product ? item.product.title : 'Producto no disponible'
            });
        }
    });
    return { productosConStock, productosSinStock, totalPrice };
};


const createOrder = async (userId, email, productosConStock, productosSinStock, totalPrice) => {
    let newOrder = {
        customer: userId,
        email,
        products: productosConStock,
        productssinStock: productosSinStock,
        total: totalPrice,
        date: new Date()
    }
    const order = await ordersService.saveOrder(newOrder);
    //console.log('respuesta de order', order);
    return order
};

const updateStockAndRemoveFromCart = async (products, userId, res, req, next) => {
    console.log('res desde update', req.user);
    console.log('productosConStock', products);
    const updatePromises = products.map(async (item) => {
        const productToUpdate = await productService.getProductById(item.product, req.logger);
        await productService.updateProductStock(item.product, productToUpdate.stock - item.quantity, req.logger, next);
        const remProductBuy = await remProductbuy(userId, item.product, res, req, next);
        if (remProductBuy.status === 'success') {
            await Promise.all(updatePromises)
        }
    });
    return ({ status: 'success' })
};

const TuningupdateStockAndRemoveFromCart = catchedAsync(updateStockAndRemoveFromCart)
const TuningprePurchase = catchedAsync(prePurchase)
const TuningprocessCartItems = catchedAsync(processCartItems)
const TuningaddToCart = catchedAsync(addToCart);
const TuningremoveProductFromCart = catchedAsync(removeProductFromCart);
const TuningremProduct = catchedAsync(remProduct);
const TuningremProductbuy = catchedAsync(remProductbuy);
const TuninggetCartUser = catchedAsync(getCartUser);
const Tuningpurchase = catchedAsync(purchase);
export {
    TuningupdateStockAndRemoveFromCart as updateStockAndRemoveFromCart,
    TuningprePurchase as prePurchase,
    TuningprocessCartItems as processCartItems,
    TuningaddToCart as addToCart,
    TuningremoveProductFromCart as removeProductFromCart,
    TuningremProduct as remProduct,
    TuningremProductbuy as remProductbuy,
    TuninggetCartUser as getCartUser,
    Tuningpurchase as purchase
};