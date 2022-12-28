const models=require("../models")
const createAddress = async (payload) => {
    try {
        const existingAddress = await models.Address.findOne({
            where: { address_name: payload.addressName },
          });
          if (existingAddress) {
            throw new Error("Address already exists");
          }
        const address = await models.Address.create(payload);
        return "address has successfully created";
    } catch (error) {
        return { data: null, error: error };
    }
};

const getAddress = async (payload) => {
    const address = await models.Address.findAll({
      attributes: { exclude: ["deleted_at"] }
    });
    return address;
  }
  module.exports={
    createAddress,getAddress
  }