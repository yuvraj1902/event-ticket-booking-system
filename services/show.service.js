const models=require("../models")
const { sequelize } = require('../models');

const getShowType=async(payload)=>{
    try{
    const event = await models.Event.findOne({
        where: { id: payload.eventId },
      });
      if (!event) {
        throw new Error("Event does not exist ");
      }
      
      return ` event_type : ${event.eventType} `
    }catch (error) {
        return { data: null, error: error };
    }
}
const createShow = async (payload) => {
    try {
        const event = await models.Event.findOne({
            where: { id: payload.eventId },
          });
          if (!event) {
            throw new Error("Event does not exist ");
          }
          if(event.eventType == 'movie'){
            const movie = await models.Movie.create(payload);
            return "movie show has successfully created";
        }else if(event.eventType == 'concert'){
        const concert = await models.Concert.create(payload);
        return "concert show has successfully created";
        }else{
            return "Event Type is not correct"
        }
        
    } catch (error) {
        return { data: null, error: error };
    }
};

const getShowDetails = async (payload) => {
    const userPayload = JSON.parse(JSON.stringify(payload));
    userPayload.is_firsttime = true;
    userPayload.password = await bcrypt.hash(userPayload.password, 10)
    const trans = await sequelize.transaction();
    try {
      const existingUser = await models.User.findOne({
        where: { email: userPayload.email },
      });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const user = await models.User.create(userPayload,
        { transaction: trans }
      );
  
      const userId = user.dataValues.id;
      if (userPayload.designation_code) {
        const designation = await models.Designation.findOne({
          where: {
            designation_code: userPayload.designation_code,
          },
        },
          { transaction: trans }
        );
        if (!designation) {
          throw new Error("Invalid Designation");
        }
        const designation_user_mapping_designationID =
          await models.UserDesignationMapping.create({
            designation_id: designation.id,
            user_id: userId,
          },
            { transaction: trans }
          );
  
      }
      if (userPayload.role_key) {
        const role = await models.Role.findOne({
          where: {
            role_key: userPayload.role_key,
          },
        },
          { transaction: trans }
        );
  
        if (!role) {
          throw new Error("Invalid Role");
        }
        const user_role_mapping = await models.UserRoleMapping.create({
          user_id: userId,
          role_id: role.id
        },
          { transaction: trans }
        );
      }
      await trans.commit();
      return { data: user, error: null };
    } catch (error) {
      await trans.rollback();
      return { data: null, error: error };
    }
  };

module.exports={
    createShow,getShowType,getShowDetails
}