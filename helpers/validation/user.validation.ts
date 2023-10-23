import { check } from "express-validator";


const models = require('./../../models/index');


module.exports.UserValidation = [
  check('vUserName').trim().notEmpty().withMessage('UserNameRequired'),
  check('vUserName').trim().isLength({min:2}).withMessage('UserNameMinLengthRequired'),
  check('vUserName').trim().isLength({max:15}).withMessage('UserNameMaxLengthRequired'),
  check('vEmail').trim().notEmpty().withMessage('UserEmailRequired'),
  check('vEmail').trim().isEmail().withMessage('ValidEmailFormat'),
  check('vEmail').custom(async (value) => {
    const user = await models.User.findOne({ where: { vEmail: value } });
    if (user) {
      throw new Error('E-mail already Existing');
    }
  }),
  // check('vPassword').trim().notEmpty().matches(/\d/).withMessage('invalidpasswordformat'),
  // query('vEmail').trim().custom(async (value, { req }) => {
  //   return new Promise<void>((resolve, reject) => {
  //     return models.User.findOne({
  //       where:{
  //         vEmail: {[Op.eq]: value},
  //         bIsDeleted:false
  //       }
  //     }).then(user => {
  //       if (user && user !== null && user !== undefined) {
  //         return reject();
  //       } else {
  //         return resolve();
  //       }
  //     }).catch((err) => {
  //       return reject();
  //     });
  //   });
  // }).withMessage('ExistUser')
];

