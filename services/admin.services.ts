"use strict";
const models = require("./../models/index");
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');

export default class AdminService {
  constructor() {
    this.CreateAdmin = this.CreateAdmin.bind(this);
    this.Login = this.Login.bind(this);
    this.GetAdmin = this.GetAdmin.bind(this);
    this.GetDepartment = this.GetDepartment.bind(this);
    this.GetAdminById = this.GetAdminById.bind(this);
    this.UpdateAdmin = this.UpdateAdmin.bind(this);
    this.DeleteAdmin = this.DeleteAdmin.bind(this);
    this.ForgotByToken = this.ForgotByToken.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this);
    this.GenerateResetToken = this.GenerateResetToken.bind(this);
  }


  async CreateAdmin(req, callback) {
    // const adminId = req.adminId.iAdminId
    // 
    const adminId  = req.adminId
    console.log(adminId,'111');
    const vAdminImage = req.file.filename  
     console.log(vAdminImage,'2');
    const {
          vAdminName,
          iDepartmentId,
          iStatus,
          vAdminType,
          vEmail,
          vPassword,
    } = req.body;
   
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(vPassword, salt);
      console.log(hashedPassword);
      let createAdmin = await models.Admin.build({
        vAdminName:vAdminName,
              vAdminType,
              iDepartmentId,
              iStatus,
              vAdminImage,
              vEmail,
              vPassword: hashedPassword,
              iCreatedAt: await getEpoch(),
             iCreatdBy :adminId
      });
      await createAdmin.save();
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "CreateAdmin",
        code: HttpCodes["CREATED"],
        data: createAdmin,
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
  // async CreateAdmin(req, callback) {


  //   // const adminId = req.adminId
  //   // console.log(adminId);
  //   // const vAdminImage = req.file.filename  
  //   // console.log(vAdminImage,'1');
  //   const {
  //     vAdminName,
  //     vAdminType,
  //     iDepartmentId,
  //     iStatus,
  //     vEmail,
  //     vPassword,
  //   } = req.body;
   
  //   try {
  //     //const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(vPassword, 10);
  //     console.log(hashedPassword);
  //     let createAdmin = await models.Admin.build({
  //       vAdminName:vAdminName,
  //       vAdminType:vAdminType,
  //       iDepartmentId:iDepartmentId,
  //       iStatus,
  //       //vAdminImage,
  //       vEmail,
  //       vPassword: hashedPassword,
  //       iCreatedAt: await getEpoch(),
  //      // iCreatdBy :adminId
  //     });
  //     await createAdmin.save();
  //     return callback(null, {
  //       status: HttpCodes["API_SUCCESS"],
  //       msg: "CreateAdmin",
  //       code: HttpCodes["CREATED"],
  //       data: {},
  //     });
  //   } catch (error) {
  //     console.log(error, "error.....");
  //     return callback(null, {
  //       status: HttpCodes["API_FAILURE"],
  //       msg: "ApiFailed",
  //       code: HttpCodes["BAD_REQUEST"],
  //       data: error,
  //     });
  //   }
  // }

  async Login(req, callback) {
    const { vEmail, vPassword } = req.body;
    console.log(vEmail, "45");
    console.log(vPassword, "46");
    try {
      let admin = await models.Admin.findOne({ where: { vEmail } });
      console.log(admin, "49");
      if (!admin) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "EmailNotRegistered",
          code: HttpCodes["UNAUTHORIZED"],
        });
      }
      const password = await ComparePassword(vPassword, admin.vPassword);
      console.log(password, "58");
      if (!password) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "IncorrectPassword",
          code: HttpCodes["UNAUTHORIZED"],
        });
      }
      let adminId = { iAdminId: admin.iAdminId };
      console.log(adminId);
      let adminLogin = await models.AdminLogin.findOne({
        where: { iAdminId: admin.iAdminId },
      });
      if (adminLogin) {
        const token = await CreateJwt(adminId);
        console.log(token);
        adminLogin.vAdminToken = token;
        adminLogin.iCreatedAt = await getEpoch();
        adminLogin.iLastLoginAt= await getEpoch();
        await adminLogin.save();
      } else {
        const token = await CreateJwt(adminId);
        console.log(token);
        const adminLogin = await models.AdminLogin.build({
          iAdminId: admin.iAdminId,
          vAdminToken: token,
          iCreatedAt: await getEpoch(),
          
        });
        adminLogin.iLastLoginAt= await getEpoch();
        await adminLogin.save();
      }
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "Login",
        code: HttpCodes["OK"],
        data: { vAToken: adminLogin.vAdminToken },
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
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: iData,
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

//   async GetAdmins(req, callback) {
//     try {
//       const { page, limit, search } = req.body;

//   // console.log(models.Admin.bIsDeleted ===);
//   const result = await models.Admin.findAll({
//     include: [
//       {
//         model: db.department,
//         as: "department",
//         attributes: ["vDepartment"],
//       },
//     ],
//     offset: (page - 1) * limit,
//     limit: limit,
//     where: {
//       ...(search && {
//         [Op.or]: [
//           { vName: { [Op.like]: `%${search}%` } },
//           { vEmail: { [Op.like]: `%${search}%` } },
//           { iDepartmentId: { [Op.like]: `%${search}%` } },
//         ],
//       }),
//       bIsDeleted: false,
//     },
//   });

//   if (result.length === 0) {
//     return callback(null, {
//       msg: "No data found",
//     });
//   } else {
//     return callback(null, {
//       status: HttpCodes["API_SUCCESS"],
//       code: HttpCodes["OK"],
//       msg: "admins get successfully",
//       data: result,
//     });
//   }
// } catch (error) {
//   console.log(error.message);
//   return callback(error.message, null);
// }
//   }

  async GetAdmin(req, callback) {
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
            { vAdminName: { [Op.like]: `%${filter}%` } },
            { iDepartmentId: { [Op.like]: `%${filter}%` } },
            { vEmail: { [Op.like]: `%${filter}%` } },
          ],
        };
      }

      // const { count, rows } = await models.Admin.findAndCountAll({
      //   where: whereCondition,
      //   offset,
      //   limit,
      // });

      const result = await models.Admin.findAll({
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

  // async GetAdmin(req, callback) {
  //   try {
  //     const adminData = await models.Admin.findAll( {
  //       include: [{
  //         model: db.Department,
  //         attributes: ["vDepartmentName"],
  //       }],
  //     });
  //     if (adminData) {
  //       return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: adminData });
  //     } else {
  //       return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }

  async GetAdminById(req, callback) {
    const { iAdminId } = req.params;
    try {
      const adminData = await models.Admin.findAll({
        include: [
          {
            model: db.Department,
            attributes: ["vDepartmentName"],
          },
        ],
        where: { iAdminId },
      });
      if (adminData.length > 0) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: adminData,
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
 

  // async UpdateAdmin(req, callback) {
  //   const { vAdminName ,iDepartmentId,iStatus} = req.body;
  //   const { iAdminId } = req.params;
  //   try {
  //     const updateAdminData = await models.Admin.update(
  //       {

  //         vAdminName : vAdminName,
  //         iDepartmentId : iDepartmentId,
  //         iStatus : iStatus,
  //         iUpdatedAt: await getEpoch()
  //       },
  //       { where: { iAdminId } }
  //     )
  //     if (updateAdminData) {
  //       return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UpdateAdmin', code: HttpCodes['OK'], data: {} });
  //     } else {
  //       return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UpdateAdminFailed', code: HttpCodes['NOT_FOUND'], data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }

  async UpdateAdmin(req, callback) {
    const { vAdminName, iDepartmentId, iStatus } = req.body;
    const { iAdminId } = req.params;
    try {
      const admin = await models.Admin.findOne({ where: { iAdminId } });
      if (admin) {
        const updateAdminData = await admin.update({
          vAdminName: vAdminName,
          iDepartmentId: iDepartmentId,
          iStatus: iStatus,
          iUpdatedAt: await getEpoch(),
        });
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "UpdateAdmin",
          code: HttpCodes["OK"],
          data: updateAdminData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "AdminNotFound",
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

  async DeleteAdmin(req, callback) {
    const { iAdminId } = req.params;
    try {
      const deleteAdmin = await models.Admin.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch(),
        },
        { where: { iAdminId } }
      );

      if (deleteAdmin) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "DeleteAdmin",
          code: HttpCodes["OK"],
          data: {},
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "DeleteAdminFailed",
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

  async ForgotByToken(req, callback) {
    const { vEmail} = req.body;
    console.log(vEmail);
    try {
      let admin = await models.Admin.findOne({ where: { vEmail } });
      if (!admin) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "InvalidEmail",
          code: HttpCodes["NOT_FOUND"],
        });
      }
      const vResetToken = await this.GenerateResetToken(admin.iAdminId);
      admin.vResetToken = vResetToken; // Store vResetToken in the admin object
      await admin.save(); 

      //const vResetToken = await this.GenerateResetToken(admin.iAdminId);
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: "urvish.vaghela@teksun.com",
          pass: "mmmy oehv hdkb gaop",
        },
      });
      const mailOptions = {
        from: "urvish.vaghela@teksun.com",
        to: vEmail,
        subject: "Password Reset",
        text: `Hello, please use the following reset token to reset your password: localhost:9020/api/admin/v1/forgot?token=${vResetToken}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error.message, "ForgotPassword");
          return callback(error);
        } else {
          console.log('Email sent: ' + info.response);
          return callback(null, {
            status: HttpCodes["API_SUCCESS"],
            msg: "EmailSentSuccess",
           code: HttpCodes["OK"],
            data: { vResetToken: vResetToken, link:'localhost:9020/api/admin/v1/forgot' },
          });
        }
      });
    } catch (error) {
      console.log(error.message, "ForgotPassword");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

  async GenerateResetToken(iAdminId) { 
    const payload = { 
      iAdminId: iAdminId, 
      action: 'reset_password' 
    }; 
    const resetToken = await CreateJwt(payload); 
    return resetToken; 
  }


  // async GenerateResetToken(iAdminId) {
  //   const payload = {
  //     iAdminId: iAdminId,
  //     action: 'reset_password'
  //   };
  //   let adminId = { iAdminId: payload.iAdminId };
  //   console.log(adminId);
  //   const resetToken = await CreateJwt(adminId)
  //   return resetToken;
  // }
  
  async ResetPassword(req, callback) {
    const { vEmail,vResetToken, vPassword } = req.body;
    try {
      const admin = await models.Admin.findOne({ where: { vEmail: vEmail } });
      if (!admin) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "InvalidEmail",
          code: HttpCodes["NOT_FOUND"],
        });
      }
  
      if (admin.resetTokenExpiresAt < Date.now()) {
        return callback(null, {
          status: 401,
          message: 'Invalid',
        });
      }
      const hashedPassword = await bcrypt.hash(vPassword, 10);
      console.log(hashedPassword);
  
      admin.vPassword = hashedPassword;
      admin.vResetToken = vResetToken;
     // admin.resetTokenExpiresAt = null;
      await admin.save();
  
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "APISuccess",
       code: HttpCodes["OK"],
        data: { vPassword:hashedPassword,vResetToken: vResetToken },
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
}

