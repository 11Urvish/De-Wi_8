"use strict";

import commonHelper from "../helpers/common";
import AssignDeviceService from "../services/assignDevice.services";
const { commonResponse } = new commonHelper();
export default class AssignDeviceController {
  common: AssignDeviceService;
  constructor() {
    this.common = new AssignDeviceService();
    this.GetAssignDevice = this.GetAssignDevice.bind(this);
    this.CreateAssignDevice = this.CreateAssignDevice.bind(this);
    this.DeleteAssignDevice = this.DeleteAssignDevice.bind(this);
  }


  GetAssignDevice(req, res) {
    this.common.GetAssignDevice(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }


  CreateAssignDevice(req, res) {
    this.common.CreateAssignDevice(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  DeleteAssignDevice(req, res) {
    this.common.DeleteAssignDevice(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
