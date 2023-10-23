"use strict";

import commonHelper from "../helpers/common";
import AdminService from "../services/admin.services";
const { commonResponse } = new commonHelper();
export default class AdminController {
  common: AdminService;
  constructor() {
    this.common = new AdminService();
    this.CreateAdmin = this.CreateAdmin.bind(this);
    this.Login = this.Login.bind(this);
    this.GetAdmin = this.GetAdmin.bind(this);
    this.GetDepartment = this.GetDepartment.bind(this);
    this.GetAdminById = this.GetAdminById.bind(this);
    this.UpdateAdmin = this.UpdateAdmin.bind(this);
    this.DeleteAdmin = this.DeleteAdmin.bind(this);
    this.ForgotByToken = this.ForgotByToken.bind(this);
    this.GenerateResetToken = this.GenerateResetToken.bind(this);
     this.ResetPassword = this.ResetPassword.bind(this);
  }

  ForgotByToken(req, res) {
    this.common.ForgotByToken(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  ResetPassword(req, res) {
    this.common.ResetPassword(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GenerateResetToken(req, res) {
    this.common.ForgotByToken(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  CreateAdmin(req, res) {
    this.common.CreateAdmin(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  Login(req, res) {
    this.common.Login(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetAdmin(req, res) {
    this.common.GetAdmin(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetDepartment(req, res) {
    this.common.GetDepartment(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetAdminById(req, res) {
    this.common.GetAdminById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  UpdateAdmin(req, res) {
    this.common.UpdateAdmin(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  DeleteAdmin(req, res) {
    this.common.DeleteAdmin(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
