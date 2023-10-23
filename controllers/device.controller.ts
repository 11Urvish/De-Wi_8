"use strict";

import commonHelper from "../helpers/common";
import DeviceService from "../services/divice.services";
const { commonResponse } = new commonHelper();
export default class DeviceController {
  common: DeviceService;
  constructor() {
    this.common = new DeviceService();
    this.CreateDevice = this.CreateDevice.bind(this);
    this.GetDevice = this.GetDevice.bind(this);
    this.GetDeviceById = this.GetDeviceById.bind(this);
    this.UpdateDevice = this.UpdateDevice.bind(this);
    this.DeleteDevice = this.DeleteDevice.bind(this);
  }

  CreateDevice(req, res) {
    this.common.CreateDevice(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetDevice(req, res) {
    this.common.GetDevice(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetDeviceById(req, res) {
    this.common.GetDeviceById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  UpdateDevice(req, res) {
    this.common.UpdateDevice(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  DeleteDevice(req, res) {
    this.common.DeleteDevice(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
