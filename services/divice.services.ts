"use strict";
const models = require("./../models/index");
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;

export default class DeviceService {
  constructor() {
    this.CreateDevice = this.CreateDevice.bind(this);
    this.GetDevice = this.GetDevice.bind(this);
    this.GetDeviceById = this.GetDeviceById.bind(this);
    this.UpdateDevice = this.UpdateDevice.bind(this);
    this.DeleteDevice = this.DeleteDevice.bind(this);
  }
  

  async CreateDevice(req, callback) {
    const userId  = req.userId
    console.log(userId,'111');
    const vDeviceImage = req.file.filename  
    console.log(vDeviceImage,'1');
    const {
      vDeviceName,
      iDeviceTypeId,
      iStatus,vLabel,vModel,
    } = req.body;
   
    try {
      let createDevice = await models.Device.build({
        vDeviceName,
        iDeviceTypeId,
        iStatus,vLabel,vModel,
        vDeviceImage,iUserId:userId,
        iCreatedAt: await getEpoch(),
        iCreatedBy :userId
      });
      await createDevice.save();
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "CreateDevice",
        code: HttpCodes["CREATED"],
        data: {},
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


  async GetDevice(req, callback) {
    try {
      const { page, limit, filter } = req.query;
      console.log(page,'1');
      console.log(limit,'2');
      console.log(filter,'3');
      const offset = (page - 1) 
      console.log(offset,'4');

      let whereCondition = {};

      if (filter) {
        whereCondition = {
          [Op.or]: [
            { vDeviceName: { [Op.like]: `%${filter}%` } },
            { iDepartmentId: { [Op.like]: `%${filter}%` } },
            { vEmail: { [Op.like]: `%${filter}%` } },
          ],
        };
      }

      // const { count, rows } = await models.Device.findAndCountAll({
      //   where: whereCondition,
      //   offset,
      //   limit,
      // });

      const result = await models.Device.findAll({
        where: whereCondition,
        offset,
        limit,
      });
      console.log(result,'5');
      const { count, rows } = result;

      if (rows.length > 0) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetDepartment",
          code: HttpCodes["OK"],
          data: { count, rows },
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
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

  // async GetDevice(req, callback) {
  //   try {
  //     const deviceData = await models.Device.findAll( {
  //       include: [{
  //         model: db.Department,
  //         attributes: ["vDepartmentName"],
  //       }],
  //     });
  //     if (deviceData) {
  //       return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: deviceData });
  //     } else {
  //       return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }

  async GetDeviceById(req, callback) {
    const { iDeviceId } = req.params;
    try {
      const deviceData = await models.Device.findAll({
        include: [
          {
            model: db.Department,
            attributes: ["vDepartmentName"],
          },
        ],
        where: { iDeviceId },
      });
      if (deviceData.length > 0) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: deviceData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
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

  // async UpdateDevice(req, callback) {
  //   const { vDeviceName ,iDepartmentId,iStatus} = req.body;
  //   const { iDeviceId } = req.params;
  //   try {
  //     const updateDeviceData = await models.Device.update(
  //       {

  //         vDeviceName : vDeviceName,
  //         iDepartmentId : iDepartmentId,
  //         iStatus : iStatus,
  //         iUpdatedAt: await getEpoch()
  //       },
  //       { where: { iDeviceId } }
  //     )
  //     if (updateDeviceData) {
  //       return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UpdateDevice', code: HttpCodes['OK'], data: {} });
  //     } else {
  //       return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UpdateDeviceFailed', code: HttpCodes['NOT_FOUND'], data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }

  async UpdateDevice(req, callback) {
    const { vDeviceName,
      iDeviceTypeId,
      iStatus,vLabel,vModel, } = req.body;
    const { iDeviceId } = req.params;
    try {
      const device = await models.Device.findOne({ where: { iDeviceId } });
      if (device) {
        const updateDeviceData = await device.update({
          vDeviceName: vDeviceName,
          iDeviceTypeId: iDeviceTypeId,
          vLabel:vLabel,
          vModel:vModel,
          iStatus: iStatus,
          iUpdatedAt: await getEpoch(),
        });
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "UpdateDevice",
          code: HttpCodes["OK"],
          data: updateDeviceData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "DeviceNotFound",
          code: HttpCodes["NOT_FOUND"],
          data: {},
        });
      }
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

  async DeleteDevice(req, callback) {
    const { iDeviceId } = req.params;
    try {
      const deleteDevice = await models.Device.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch(),
        },
        { where: { iDeviceId } }
      );

      if (deleteDevice) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "DeleteDevice",
          code: HttpCodes["OK"],
          data: {},
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "DeleteDeviceFailed",
          code: HttpCodes["NOT_FOUND"],
          data: {},
        });
      }
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
}
