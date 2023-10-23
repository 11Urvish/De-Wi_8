const path = require('path')
import DepartmentController from "../../controllers/depaerment.controller";
import commonHelper from "../../helpers/common";
import * as DepartmentValidation from '../../helpers/validation/admin.validation';
const { CreateDepartment,GetDepartment, GetDepartmentById, UpdateDepartment, DeleteDepartment } = new DepartmentController();

const { CheckValidationError } = new commonHelper();

module.exports = function (router) {
    router.post('/v1/create', CreateDepartment);
    router.get('/v1/get', GetDepartment);
    router.get('/v1/get/:iDepartmentId', GetDepartmentById);
    router.patch('/v1/update/:iDepartmentId', UpdateDepartment);
    router.patch('/v1/delete/:iDepartmentId', DeleteDepartment);
}
