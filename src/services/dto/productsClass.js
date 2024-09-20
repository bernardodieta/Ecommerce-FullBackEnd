import { v4 as uuidv4 } from "uuid";

class Product {
  constructor(
    title,
    description,
    stock,
    price,
    category,
    brand,
    model,
    color,
    gamer,
    battery,
    garantia,
    botnes,
    iluminacion,
    bluetooth,
    recargable,
    conector,
    sistema,
    resolution,
    fecharegistro,
    img,
    owner,
    discount,
    startDate,
    endDate
  ) {
    this.title = title;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.category = category;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.gamer = gamer;
    this.battery = battery;
    this.garantia = garantia;
    this.botnes = botnes;
    this.bluetooth = bluetooth;
    this.iluminacion = iluminacion;
    this.recargable = recargable;

    this.conector = conector;
    this.resolution = resolution;
    this.sistema = sistema;

    this.fecharegistro = fecharegistro;
    this.img = img;
    this.owner = owner;
    this.discount = discount;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  validate() {
    if (typeof this.title !== 'string' || this.title.trim() === '') {
      throw new Error('Title must be a non-empty string');
    }
    if (typeof this.price !== 'number' || this.price < 0) {
      throw new Error('Price must be a non-negative number');
    }
    // Agregar más validaciones según sea necesario
  }
}

export default Product;
