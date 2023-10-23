import { check } from "express-validator";




module.exports.DeviceValidation = [
  check('vDeviceName').trim().notEmpty().withMessage('DeviceNameRequired'),
  check('vDeviceName').trim().isLength({min:2}).withMessage('DeviceNameMinLengthRequired'),
  check('vDeviceName').trim().isLength({max:15}).withMessage('DeviceNameMaxLengthRequired'),
  check('vLabel').trim().isLength({max:15}).withMessage('DeviceLabelMaxLengthRequired'),
  check('vLabel').trim().isLength({max:15}).withMessage('DeviceLabelMaxLengthRequired'),
  check('vLabel').trim().isLength({max:15}).withMessage('DeviceLabelMaxLengthRequired'),
  check('vModel').trim().isLength({max:15}).withMessage('DeviceModelMaxLengthRequired'),
  check('vModel').trim().isLength({max:15}).withMessage('DeviceModelMaxLengthRequired'),
  check('vModel').trim().isLength({max:15}).withMessage('DeviceModelMaxLengthRequired')
];

