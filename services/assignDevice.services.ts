
"use strict";
const models = require('./../models/index');
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;

export default class AssignDeviceService {

  constructor() {
    this.GetAssignDevice = this.GetAssignDevice.bind(this);
    this.CreateAssignDevice = this.CreateAssignDevice.bind(this);
    this.DeleteAssignDevice = this.DeleteAssignDevice.bind(this);
  }



  async CreateAssignDevice(req, callback) {
   const userId  = req.iUserId
   console.log(userId);
   
    const {iUserId,iDeviceId} = req.body;
    try {
      let createAssignDevice = await models.AssignDevice.build({
        iUserId,iDeviceId,
        iAssignBy:userId,
        iCreatedAt: await getEpoch(),
        
      });
      await createAssignDevice.save();
      return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'CreateDepartment', code: HttpCodes['CREATED'], data: createAssignDevice });
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }


  async GetAssignDevice(req, callback) {
    try {
      
      const departmentData = await models.AssignDevice.findAll({
        attributes: ["iAssignDeviceId","iUserId","iDeviceId"],
        include: [{
            model: db.Device,
            attributes: ["vDeviceName"],
            include: [{
                model: db.DeviceType,
                attributes: ["vDeviceTypeName"],
              },],},
          {
            model: db.User,
            attributes: ["vUserName"],
            include: [{
                model: db.Department,
                attributes: ["vDepartmentName"],
              },],},
        ],
    });
      if (departmentData) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: departmentData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async DeleteAssignDevice(req, callback) {
    const { iAssignDeviceId } = req.params;
    try {
      const deleteAssignDevice = await models.AssignDevice.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch()
        },
        { where: { iAssignDeviceId } }
      );
      
      if (deleteAssignDevice[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'DeleteAssignDevice', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'DeleteAssignDeviceFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }
}
