import moment from "moment";
import { createHash } from "../../../utils.js";
export default class UserCreateDto {
  constructor(first_name, last_name, date, tel, email, password, role) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.date = date;
    this.tel = tel;
    this.email = email;
    this.password = createHash(password);
    this.role = role;
    this.fecha_reg = moment().format();
  }
}
