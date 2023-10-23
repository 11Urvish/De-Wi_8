const path = require('path')
import AssignDeviceController from "../../controllers/assignDevice.controller";
import commonHelper from "../../helpers/common";
import * as AssignDeviceValidation from '../../helpers/validation/admin.validation';
const { GetAssignDevice, CreateAssignDevice, DeleteAssignDevice } = new AssignDeviceController();

const { CheckValidationError } = new commonHelper();

module.exports = function (router) {
    router.get('/v1/get', GetAssignDevice);
    router.post('/v1/create', CreateAssignDevice);
    router.patch('/v1/delete/:iAssignDeviceId', DeleteAssignDevice);
}
