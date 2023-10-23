const path = require('path')
import DeviceController from "../../controllers/device.controller";
import commonHelper from "../../helpers/common";
import * as DeviceValidation from '../../helpers/validation/divice.validation';
const { CreateDevice, GetDevice,GetDeviceById, UpdateDevice, DeleteDevice } = new DeviceController();
const  uploadFile = require('../../helpers/Intercepter');
const { CheckValidationError ,VerifyToken} = new commonHelper();

module.exports = function (router) {
    //router.post('/v1/create-user',DeviceValidation['DeviceValidation'],CheckValidationError,CreateUser);
    //router.post('/v1/AddFile',uploadFile.single('file'),AddFile);
    router.post('/v1/create', VerifyToken,uploadFile.single('vDeviceImage'),DeviceValidation['DeviceValidation'],CheckValidationError,CreateDevice);
    router.get('/v1/get', VerifyToken,GetDevice);
    router.get('/v1/get/:iDeviceId',VerifyToken, GetDeviceById);
    router.patch('/v1/update/:iDeviceId', VerifyToken,UpdateDevice);
    router.patch('/v1/delete/:iDeviceId',VerifyToken, DeleteDevice);
}
