"use strict";

import commonHelper from "../helpers/common";
import DepartmentService from "../services/department.services";
const { commonResponse } = new commonHelper();
export default class DepartmentController {
  common: DepartmentService;
  constructor() {
    this.common = new DepartmentService();
    this.CreateDepartment = this.CreateDepartment.bind(this);
    this.GetDepartment = this.GetDepartment.bind(this);
    this.GetDepartmentById = this.GetDepartmentById.bind(this);
    this.UpdateDepartment = this.UpdateDepartment.bind(this);
    this.DeleteDepartment = this.DeleteDepartment.bind(this);
  }

  CreateDepartment(req, res) {
    this.common.CreateDepartment(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }


  GetDepartment(req, res) {
    this.common.GetDepartment(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetDepartmentById(req, res) {
    this.common.GetDepartmentById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  UpdateDepartment(req, res) {
    this.common.UpdateDepartment(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  DeleteDepartment(req, res) {
    this.common.DeleteDepartment(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
