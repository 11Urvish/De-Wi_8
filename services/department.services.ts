
"use strict";
const models = require('./../models/index');
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;

export default class DepartmentService {

  constructor() {
    this.CreateDepartment = this.CreateDepartment.bind(this);
    this.GetDepartment = this.GetDepartment.bind(this);
    this.GetDepartmentById = this.GetDepartmentById.bind(this);
    this.UpdateDepartment = this.UpdateDepartment.bind(this);
    this.DeleteDepartment = this.DeleteDepartment.bind(this);
  }

  async CreateDepartment(req, callback) {
    const {vDepartmentName} = req.body;
    try {
      let createDepartment = await models.Department.build({
        vDepartmentName,
        iCreatedAt: await getEpoch()
      });
      await createDepartment.save();
      return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'CreateDepartment', code: HttpCodes['CREATED'], data: {} });
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }


  async GetDepartment(req, callback) {
    try {
      
      const departmentData = await models.Department.findAll();
      if (departmentData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: departmentData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async GetDepartmentById(req, callback) {
    const { iDepartmentId } = req.params;
    try {
      const departmentData = await models.Department.findAll({where: { iDepartmentId }});
      if (departmentData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: departmentData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async UpdateDepartment(req, callback) {
    const { vDepartmentName } = req.body;
    const { iDepartmentId } = req.params;
    try {
      const updateDepartmentData = await models.Department.update(
        {
          vDepartmentName,
          iUpdatedAt: await getEpoch()
        },
        { where: { iDepartmentId } }
      )
      if (updateDepartmentData[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UpdateDepartment', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UpdateDepartmentFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async DeleteDepartment(req, callback) {
    const { iDepartmentId } = req.params;
    try {
      const deleteDepartment = await models.Department.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch()
        },
        { where: { iDepartmentId } }
      );
      
      if (deleteDepartment[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'DeleteDepartment', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'DeleteDepartmentFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }
}
