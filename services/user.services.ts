
"use strict";
const models = require('./../models/index');
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;

export default class UserService {

  constructor() {
    this.CreateUser = this.CreateUser.bind(this);
    this.Login = this.Login.bind(this);
    this.GetUser = this.GetUser.bind(this);
    this.GetDepartment = this.GetDepartment.bind(this);
    this.GetUserById = this.GetUserById.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
  }

  async CreateUser(req, callback) {
    // const adminId = req.adminId
   const adminId  = req.adminId
    console.log(adminId,'111');
    const vUserImage = req.file.filename  
     console.log(vUserImage,'2');
    const {
      vUserName,
      iDepartmentId,
      vEmail,
      iStatus,
      vPassword,
    } = req.body;
   
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(vPassword, salt);
      console.log(hashedPassword);
      let createUser = await models.User.build({
        vUserName,
        vUserImage,
      iDepartmentId,
        iStatus,
        vEmail,
        iAdminId:adminId,
        vPassword: hashedPassword,
        iCreatedAt: await getEpoch(),
        iCreatedBy:adminId
       
      });
      await createUser.save();
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "CreateUser",
        code: HttpCodes["CREATED"],
        data: createUser,
      });
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }


  async Login(req, callback) {
    const { vEmail, vPassword } = req.body;
    console.log(vEmail,'45');
    console.log(vPassword,'46');
    try {
      let user = await models.User.findOne({ where: { vEmail } });
      console.log(user,'49');
      if (!user) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "LoginInvalidValue",
          code: HttpCodes["UNAUTHORIZED"],
        });
      }
      const password = await ComparePassword(vPassword, user.vPassword);
      console.log(password,'58');
      if (!password) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "LoginInvalidValue",
          code: HttpCodes["UNAUTHORIZED"],
        });
      }
      let userId = { iUserId: user.iUserId };
      console.log(userId);
      let userLogin = await models.UserLogin.findOne({
        where: { iUserId: user.iUserId },
      });
      if (userLogin) {
        const token = await CreateJwt(userId);
        console.log(token);
        userLogin.vUserToken = token;
        userLogin.iCreatedAt = await getEpoch();
        await userLogin.save();
      } else {
        const token = await CreateJwt(userId);
        console.log(token);
        const userLogin = await models.UserLogin.build({
          iUserId: user.iUserId,
          vUserToken: token,
          iCreatedAt: await getEpoch(),
        });
        await userLogin.save();
      }
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "Login",
        code: HttpCodes["OK"],
        data: {vUToken:userLogin.vUserToken} ,
      });
    } catch (error) {
      console.log(error.message, "Login");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "LoginFailed",
        code: HttpCodes["BAD_REQUEST"],
      });
    }
  }
  async GetDepartment(req, callback) {
    try {
      
      const iData = await models.Department.findAll();
      
      if (iData) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: iData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }



  async GetUser(req, callback) {
    try {
      const { page, limit, filter } = req.query;
      const offset = (page - 1) * limit;
  
      let whereCondition = {}; 
  
      if (filter) {
        whereCondition = {
          ...whereCondition,
          vUserName: { [Op.like]: `%${filter}%` }, 
          vUserType: { [Op.like]: `%${filter}%` }, 
          iDepartmentId: { [Op.like]: `%${filter}%` }, 
          vEmail: { [Op.like]: `%${filter}%` }, 
          iStatus: { [Op.like]: `%${filter}%` }, 
        };
      }
  
      const { count, rows } = await models.User.findAndCountAll({
        where: whereCondition,
        offset,
        limit,
      });
  
      if (rows.length > 0) {
        return callback(null, {
          status: HttpCodes['API_SUCCESS'],
          msg: 'GetDepartment',
          code: HttpCodes['OK'],
          data: { count, rows },
        });
      } else {
        return callback(null, {
          status: HttpCodes['API_FAILURE'],
          msg: 'ContentNotFound',
          code: HttpCodes['CONTENT_NOT_FOUND'],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, {
        status: HttpCodes['API_FAILURE'],
        msg: 'ApiFailed',
        code: HttpCodes['BAD_REQUEST'],
        data: error,
      });
    }
  }
  

  // async GetUser(req, callback) {
  //   try {
  //     const userData = await models.User.findAll( {
  //       include: [{
  //         model: db.Department,
  //         attributes: ["vDepartmentName"],
  //       }],
  //     });
  //     if (userData) {
  //       return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: userData });
  //     } else {
  //       return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }
  
  async GetUserById(req, callback) {
    const { iUserId } = req.params;
    try {
      const userData = await models.User.findAll({
        include: [{
          model: db.Department,
          attributes: ["vDepartmentName"],
        }],
      where: { iUserId }});
      if (userData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: userData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  // async UpdateUser(req, callback) {
  //   const { vUserName ,iDepartmentId,iStatus} = req.body;
  //   const { iUserId } = req.params;
  //   try {
  //     const updateUserData = await models.User.update(
  //       {
          
  //         vUserName : vUserName,
  //         iDepartmentId : iDepartmentId,
  //         iStatus : iStatus,
  //         iUpdatedAt: await getEpoch()
  //       },
  //       { where: { iUserId } }
  //     )
  //     if (updateUserData) {
  //       return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UpdateUser', code: HttpCodes['OK'], data: {} });
  //     } else {
  //       return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UpdateUserFailed', code: HttpCodes['NOT_FOUND'], data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }


async UpdateUser(req, callback) {
  const { vUserName, iDepartmentId, iStatus } = req.body;
  const { iUserId } = req.params;
  try {
    const user = await models.User.findOne({ where: { iUserId } });
    if (user) {
      const updateUserData = await user.update({
        vUserName: vUserName,
        iDepartmentId: iDepartmentId,
        iStatus: iStatus,
        iUpdatedAt: await getEpoch(),
      });
      return callback(null, {
        status: HttpCodes['API_SUCCESS'],
        msg: 'UpdateUser',
        code: HttpCodes['OK'],
        data: updateUserData,
      });
    } else {
      return callback(null, {
        status: HttpCodes['API_FAILURE'],
        msg: 'UserNotFound',
        code: HttpCodes['NOT_FOUND'],
        data: {},
      });
    }
  } catch (error) {
    console.log(error, 'error.....');
    return callback(null, {
      status: HttpCodes['API_FAILURE'],
      msg: 'ApiFailed',
      code: HttpCodes['BAD_REQUEST'],
      data: error,
    });
  }
}

  async DeleteUser(req, callback) {
    const { iUserId } = req.params;
    try {
      const deleteUser = await models.User.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch()
        },
        { where: { iUserId } }
      );const deleteDevice = await models.Device.destroy(
        { where: { iUserId } }
      );
      
      if (deleteDevice) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'DeleteUser', code: HttpCodes['OK'], data: deleteUser });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'DeleteUserFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }
}
