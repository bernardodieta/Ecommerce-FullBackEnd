export default class AddressRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getFullAddress = async (userId, logger) => {
    return this.dao.getFullAddress(userId, logger);
  };
  saveAddress = async (addressData, logger) => {
    return this.dao.saveAddress(addressData, logger);
  };
  updateAddress = async (addresId, addressUpdate, logger) => {
    return this.dao.updateAddress(addresId, addressUpdate, logger);
  };

  getByIdAddress = async (addressId, logger) => {
    return this.dao.getByIdAddress(addressId, logger);
  };

  delAddresById = async (addressId, logger) => {
    return this.dao.delAddresById(addressId, logger);
  };
}
