import UserServiceDao from "./dao/mongo/users.serivces.js";
import ProductServicesDao from "./dao/mongo/products.services.js";
import CartServicesDao from "./dao/mongo/carts.services.js";
import AddressServicesDao from "./dao/mongo/address.services.js";
import OrderServicesDao from "./dao/mongo/order.services.js";
import QuestionProductDao from "./dao/mongo/questions.services.js";
import NotificationDao from "./dao/mongo/notification.services.js";
import CategoryServiceDao from "./dao/mongo/category.services.js";

import UsersRepository from "./Repository/users.repository.js";
import CartRepository from "./Repository/carts.repository.js";
import ProductRepository from "./Repository/products.repository.js";
import QuestionRepository from "./Repository/questions.repository.js";
import OrdersRepository from "./Repository/orders.repository.js";
import AdressRepository from "./Repository/addres.repository.js";
import NotificationRepository from "./Repository/notification.repository.js";
import CategoryRepository from "./Repository/category.repository.js";

const userDao = new UserServiceDao();
const productDao = new ProductServicesDao();
const cartDao = new CartServicesDao();
const orderDao = new OrderServicesDao();
const adressDao = new AddressServicesDao();
const questionDao = new QuestionProductDao();
const notificationDao = new NotificationDao();
const categoryDao = new CategoryServiceDao();

export const categoryService = new CategoryRepository(categoryDao);
export const notificationService = new NotificationRepository(notificationDao);
export const questionService = new QuestionRepository(questionDao);
export const userService = new UsersRepository(userDao);
export const productService = new ProductRepository(productDao);
export const cartService = new CartRepository(cartDao);
export const ordersService = new OrdersRepository(orderDao);
export const addressService = new AdressRepository(adressDao);
