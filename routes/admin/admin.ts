const path = require("path");
import AdminController from "../../controllers/admin.controller";
import commonHelper from "./../../helpers/common";
import * as AdminValidation from "./../../helpers/validation/admin.validation";
const {
  CreateAdmin,
  Login,
  GetAdmin,
  ForgotByToken,
  GetDepartment,
  GetAdminById,
  UpdateAdmin,
  DeleteAdmin,ResetPassword
} = new AdminController();
const  uploadFile = require('../../helpers/Intercepter');
const { CheckValidationError, VerifyToken } = new commonHelper();

module.exports = function (router) {
  router.post('/v1/create',VerifyToken,uploadFile.single('vAdminImage'),AdminValidation['AdminValidation'],CheckValidationError,CreateAdmin);
  // router.post('/v1/create',VerifyToken,uploadFile.single('vAdminImage'),CreateAdmin);
  router.post("/v1/login", Login);
  router.post("/v1/forgot", ForgotByToken);
  router.post("/v1/reset", ResetPassword);
  router.get("/v1/get", VerifyToken, GetAdmin);
  router.get("/v1/get2", GetDepartment);
  router.get("/v1/get/:iAdminId", VerifyToken, GetAdminById);
  router.patch("/v1/update/:iAdminId", VerifyToken, UpdateAdmin);
  router.patch("/v1/delete/:iAdminId", VerifyToken, DeleteAdmin);
};
