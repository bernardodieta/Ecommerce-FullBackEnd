import CustomRouter from "./customs.routes.js";
import { saveAddressController, updateAddressController, getAddressById,} from '../controllers/address.controllers.js'

export class AddressRoutes extends CustomRouter {
    init() {
        this.post('/save', ['USER', 'ADMIN', 'PREMIUM'], saveAddressController)

        this.get('/', ['USER', 'ADMIN', 'PREMIUM'], getAddressById)

        this.get('/:addressId', ['USER', 'ADMIN', 'PREMIUM'], getAddressById)

        this.put('/:id', ['USER', 'ADMIN', 'PREMIUM'], updateAddressController)
    }

} 