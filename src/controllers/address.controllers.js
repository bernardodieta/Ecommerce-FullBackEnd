import AddressCreateDto from "../services/dto/input/addressCreateDto.js";
import { addressService } from "../services/services.js";
import { catchedAsync } from "../utils/catchedAsync.js";
import { NotFoundError } from "../utils/errors.js";
import { response } from "../utils/response.js";

const saveAddressController = async (req, res) => {
    const { _id } = req.user;
    const userId = _id
    const { country, state, city, zipcode, addressText, numext } = req.body;
    //console.log(country, state, city, zipcode, addressText, numext);
    const dtoAddress = new AddressCreateDto(userId, country, state, city, zipcode, addressText, numext)
    //console.log(dtoAddress);
    const result = await addressService.saveAddress(dtoAddress, req.logger);
    response(res, 200, result, 'Direccion guardada correctamente.');
};

const getAddressById = async (req, res) => {
    const { _id } = req.user;
    const result = await addressService.getFullAddress(_id, req.logger);
    if (!result) {
        req.logger.warning(`${req.method} en ${req.url} - Error: 'No se encontro una direccion para ese usuario' at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontro una direccion para ese usuario')
    }
    response(res, 200, result)
};

const getAddressByAddressId = async (req, res) => {
    const { addressId } = req.params
    const result = await addressService.getByIdAddress(addressId)
    if (!result) {
        req.logger.warning(`${req.method} en ${req.url} - Error: 'No se encontro una direccion con ese AddressId' at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontro una direccion con ese AddressId')
    }
    response(res, 200, result)
}

const updateAddressController = async (req, res) => {
    const { id } = req.params
    //console.log(req.body);
    const addressUpdate = req.body
    const result = await addressService.updateAddress(id, addressUpdate, req.logger)
    if (!result) {
        req.logger.warning(`${req.method} en ${req.url} - Error: 'No se encontro una direccion para actualizar' at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        throw new NotFoundError('No se encontro una direccion para ese usuario')
    }
    response(res, 200, result)
}
const TuningSaveAddressController = catchedAsync(saveAddressController);
const TuninggetAddressByAddressId = catchedAsync(getAddressByAddressId);

const TuningGetAddressById = catchedAsync(getAddressById);
const TuningupdateAddressController = catchedAsync(updateAddressController);

export { TuningSaveAddressController as saveAddressController, TuningGetAddressById as getAddressById, TuningupdateAddressController as updateAddressController, TuninggetAddressByAddressId as getAddressByAddressId };
