import { v4 as uuidv4 } from 'uuid';

class Product {
    constructor(title, description, stock, price, category, fecharegistro, img, owner) {
        this.title = title;
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.pcode = uuidv4();
        this.category = category;
        this.fecharegistro = fecharegistro;
        this.img = img
        this.owner = owner
    }
}

export default Product
