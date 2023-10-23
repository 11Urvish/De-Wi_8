import { check } from "express-validator";

const models = require('./../../models/index');


module.exports.AdminValidation = [
  check('vAdminName').trim().notEmpty().withMessage('AdminNameRequired'),
  check('vEmail').trim().notEmpty().withMessage('AdminEmailRequired'),
  check('vEmail').trim().isEmail().withMessage('ValidEmailFormat'),
  check('vEmail').custom(async (value) => {
    const admin = await models.Admin.findOne({ where: { vEmail: value } });
    if (admin) {
      throw new Error('E-mail already Existing');
    }
  }),
  //check('vPassword').trim().notEmpty().matches(/\d/).withMessage('invalidpasswordformat'),

];

