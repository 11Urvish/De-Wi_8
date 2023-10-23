import crypto from "crypto";
import { validationResult } from "express-validator";
import { HttpCodes } from "./responseCodes";
const models = require("./../models/index");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const nodemailer = require("nodemailer");

export default class autorizationController {
  constructor() {
    this.getEpoch = this.getEpoch.bind(this);
    this.ComparePassword = this.ComparePassword.bind(this);
    this.CheckValidationError = this.CheckValidationError.bind(this);
    this.validateApiKey = this.validateApiKey.bind(this);
    this.CreateJwt = this.CreateJwt.bind(this);
    this.VerifyToken = this.VerifyToken.bind(this);
    this.commonResponse = this.commonResponse.bind(this);
    this.GetPagination = this.GetPagination.bind(this);
    //this.sendMail = this.sendMail.bind(this);
    
  }

  // async sendMail(to, subject, text) {
  //   try {
  //     const transporter = nodemailer.createTransport({
  //       service: "Gmail",
  //       auth: {
  //         user: "urvish.vaghela@teksun.com",
  //         pass: "mmmy oehv hdkb gaop",
  //       },
  //     });

  //     const mailOptions = {
  //       from: "urvish.vaghela@teksun.com",
  //       to: "urvishvaghela807@gmail.com",
  //       subject: "Mail Service",
  //       text: "Forget Password",
  //     };

  //     await transporter.sendMail(mailOptions);
  //   } catch (error) {
  //     console.log(error.message);
  //     throw new Error("Failed to send email.");
  //   }
  // }

  async getEpoch() {
    return Math.floor(Date.now() / 1000);
  }

  //ComparePassword
  async ComparePassword(newPassword, oldPassword) {
    const passwordCompare = await bcrypt.compare(newPassword, oldPassword);
    return passwordCompare;
  }

  async CreateJwt(data) {
    const newToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
    // const newToken = jwt.sign(data, process.env.JWTSECRET);
    return newToken;
  }

  async VerifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token, "show token");
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded, "Decoded");
    const adminId = decoded.iAdminId;
    const userId = decoded.iUserId;
  
    if (adminId) {
      const admin = await models.AdminLogin.findOne({
        where: { iAdminId: adminId, vAdminToken: token },
      });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.adminId = adminId;
    } else if (userId) {
      const user = await models.UserLogin.findOne({
        where: { iUserId: userId, vUserToken: token },
      });
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.userId = userId;
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    next();
    return decoded;
  }

  //   async VerifyToken(req, res, next) {
  //     const token = req.headers['authorization'];
  //     console.log(token,"show token")
  //     if (token) {
  //         try {
  //             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //             console.log(decoded, "Decoded");
  //             const adminId = decoded.iAdminId;
  //             req.adminId = adminId;
  //             next();
  //             return decoded;
  //         } catch (err) {
  //             console.error(err);
  //             return res.status(401).json({ message: 'Invalid token' });
  //         }
  //     } else {
  //         return res.status(401).json({ message: 'Token not Provided' });
  //     }
  // }


  async GetPagination(limitValue, skipValue) {
    let limit = limitValue ? parseInt(limitValue) : 10;
    let skip = 0;
    if (skipValue && skipValue != -1) {
      skip = parseInt(skipValue) * limit;
    } else if (skipValue == -1) {
      skip = -1;
    }
    return { limit, skip };
  }

  async commonResponse(res, error, result) {
    if (error) {
      res
        .status(200)
        .json({
          status: false,
          message: res.__("api.errors.SomethingWrong"),
          code: HttpCodes["BAD_REQUEST"],
          data: error,
          total: 0,
        });
    } else {
      if (result && result.status === "false") {
        res
          .status(200)
          .json({
            status: false,
            message: res.__(`api.errors.${result.msg}`),
            code: result.code,
            data: result.data,
            total: result?.total,
          });
      } else {
        res
          .status(200)
          .json({
            status: true,
            message: res.__(`api.msg.${result.msg}`),
            code: result.code,
            data: result.data,
            dropDownData: result?.dropDownData,
            total: result?.total,
          });
      }
    }
  }

  // API Authorization
  async validateApiKey(req, res, next) {
    let privateKey = process.env.APIPRIVATEKEY;
    let secretKey = process.env.APISECRETKEY;
    let haskKey = process.env.HASHKEY;

    let nonce = req.headers["nonce"];
    let timestamp = req.headers["timestamp"];
    let access_token = req.headers["token"];
    let hmac = crypto.createHmac(haskKey, privateKey);
    let signed = hmac.update(secretKey + timestamp + nonce).digest("hex");
    if (!access_token || !nonce || !timestamp) {
      return res
        .status(200)
        .json({
          message: res.__("api.errors.UnAuthorizedRequest"),
          code: HttpCodes["UNAUTHORIZED"],
        });
    } else if (access_token != signed) {
      return res
        .status(200)
        .json({
          message: res.__("api.errors.UnAuthorizedRequest"),
          code: HttpCodes["UNAUTHORIZED"],
        });
    } else {
      next();
    }
  }

  async CheckValidationError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({
          status: false,
          message: res.__(`api.errors.${errors.array()[0].msg}`),
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: errors,
        });
    } else {
      next();
    }
  }
}
